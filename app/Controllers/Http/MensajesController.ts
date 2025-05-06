import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'
import Chat from 'App/Models/Chat'
import Usuario from 'App/Models/Usuario'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MensajesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    return await Mensaje.query().paginate(page, perPage)
  }

  public async find({ params, response }: HttpContextContract) {
    const mensaje = await Mensaje.findOrFail(params.id)

    // Verificar que el usuario exista en ms-security
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${mensaje.usuarioId}`)
      userData = userResponse.data
    } catch (error) {
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Verificar que el chat exista
    try {
      await Chat.findOrFail(mensaje.chatsId)
    } catch (error) {
      return response.status(404).json({
        message: 'El chat no existe.',
        error: error.message,
      })
    }

    // Incluir el nombre del usuario en la respuesta
    return response.json({
      id: mensaje.id,
      mensaje: mensaje.mensaje,
      fecha: mensaje.fecha.toFormat('yyyy-MM-dd HH:mm:ss'), // Formatea la fecha para la respuesta
      chats_id: mensaje.chatsId,
      usuario_id: mensaje.usuarioId,
      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: mensaje.createdAt,
      updated_at: mensaje.updatedAt,
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(MensajeValidator)

    // Verificar que el chat exista
    try {
      await Chat.findOrFail(payload.idChat)
    } catch (error) {
      return response.status(404).json({ message: 'El chat no existe.' })
    }

    // Verificar que el usuario exista en ms-security y obtener su información
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.idUsuario}`)
      userData = userResponse.data
    } catch (error) {
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    if (!userData || !userData._id || !userData.name || !userData.email) {
      return response.status(400).json({
        message: 'Los datos del usuario no son válidos.',
      })
    }

    const mensaje = await Mensaje.create({
      mensaje: payload.mensaje,
      fecha: payload.fecha,
      chat : payload.idChat,
      Usuario: payload.idUsuario,
    })

    return response.status(201).json({
      id: mensaje.id,
      mensaje: mensaje.mensaje,
      fecha: mensaje.fecha.toFormat('yyyy-MM-dd HH:mm:ss'),
      chats_id: mensaje.chats,
      usuario_id: mensaje.usuario,
      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: mensaje.createdAt,
      updated_at: mensaje.updatedAt,
    })
  }

  public async update({ params, request }: HttpContextContract) {
    const theMensaje = await Mensaje.findOrFail(params.id)
    const payload = await request.validate(MensajeValidator)

    // Verificar que el chat exista
    try {
      await Chat.findOrFail(payload.idChat)
    } catch (error) {
      return { message: 'El chat no existe.' }
    }

    // Verificar que el usuario exista en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.idUsuario}`)
    } catch (error) {
      return {
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      }
    }

    theMensaje.merge({
      mensaje: payload.mensaje,
      fecha: payload.fecha,
      : payload.idChat,
      usuarioId: payload.idUsuario,
    })
    await theMensaje.save()

    return {
      id: theMensaje.id,
      mensaje: theMensaje.mensaje,
      fecha: theMensaje.fecha.toFormat('yyyy-MM-dd HH:mm:ss'),
      chats_id: theMensaje.chatsId,
      usuario_id: theMensaje.usuarioId,
      created_at: theMensaje.createdAt,
      updated_at: theMensaje.updatedAt,
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const theMensaje = await Mensaje.findOrFail(params.id)
    await theMensaje.delete()
    response.status(204)
  }
}