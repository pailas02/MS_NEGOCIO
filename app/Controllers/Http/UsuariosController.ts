import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuarioValidator from 'App/Validators/UsuarioValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class UsuariosController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const perPage = request.input('per_page')

    if (page && perPage) {
      return Usuario.query().paginate(page, perPage)
    }

    return Usuario.all()
  }

  public async show({ params, request, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    const token = request.header('Authorization')

    try {
      const { data } = await axios.get(`${Env.get('MS_SECURITY')}/api/users/by-email/${usuario.email}`, {
        headers: { Authorization: token },
      })

      return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        seguridad: data, // respuesta del microservicio
      }
    } catch (error) {
      return response.status(404).json({
        status: 'warning',
        message: 'Usuario local encontrado, pero no existe en ms-security',
        data: usuario,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UsuarioValidator)
      const usuario = await Usuario.create(payload)

      return response.created({
        status: 'success',
        message: 'Usuario creado',
        data: usuario,
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Error de validación',
        errors: error.messages,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      const payload = await request.validate(UsuarioValidator)

      usuario.merge(payload)
      await usuario.save()

      return {
        status: 'success',
        message: 'Usuario actualizado',
        data: usuario,
      }
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Error al actualizar',
        errors: error.messages,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.noContent()
  }
}
