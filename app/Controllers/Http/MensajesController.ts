import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'
import { DateTime } from 'luxon'

export default class MensajesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const chatId = request.input('chatId')

      const query = Mensaje.query()
        .preload('usuario')
        .preload('chat')
        .orderBy('created_at', 'desc')

      if (chatId) {
        query.where('idChat', chatId)
      }

      const mensajes = await query.paginate(page, limit)

      return response.ok({
        status: 'success',
        data: mensajes
      })
    } catch (error) {
      return response.internalServerError({
        status: 'error',
        message: 'Error al obtener los mensajes',
        error: error.message
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const mensaje = await Mensaje.query()
        .where('id', params.id)
        .preload('usuario')
        .preload('chat')
        .firstOrFail()

      return response.ok({
        status: 'success',
        data: mensaje
      })
    } catch {
      return response.notFound({
        status: 'error',
        message: 'Mensaje no encontrado'
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(MensajeValidator)

      const mensaje = await Mensaje.create({
        contenido: payload.contenido,
        fecha: payload.fecha || DateTime.now(),
        idUsuario: payload.usuarioId,
        idChat: payload.chatId
      })
      

      await mensaje.load('usuario')
      await mensaje.load('chat')

      return response.created({
        status: 'success',
        message: 'Mensaje creado correctamente',
        data: mensaje
      })
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest({
          status: 'error',
          message: 'Error de validación',
          errors: error.messages
        })
      }

      return response.internalServerError({
        status: 'error',
        message: 'Error al crear el mensaje',
        error: error.message
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const mensaje = await Mensaje.findOrFail(params.id)
      const payload = await request.validate(MensajeValidator)

      mensaje.merge({
        contenido: payload.contenido,
        fecha: payload.fecha || mensaje.fecha
      })

      await mensaje.save()
      await mensaje.load('usuario')
      await mensaje.load('chat')

      return response.ok({
        status: 'success',
        message: 'Mensaje actualizado correctamente',
        data: mensaje
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          status: 'error',
          message: 'Mensaje no encontrado'
        })
      }

      return response.internalServerError({
        status: 'error',
        message: 'Error al actualizar el mensaje',
        error: error.message
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const mensaje = await Mensaje.findOrFail(params.id)

      await mensaje.delete()

      return response.ok({
        status: 'success',
        message: 'Mensaje eliminado correctamente'
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          status: 'error',
          message: 'Mensaje no encontrado'
        })
      }

      return response.internalServerError({
        status: 'error',
        message: 'Error al eliminar el mensaje',
        error: error.message
      })
    }
  }
}
