import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operario from 'App/Models/Operario'
import OperarioValidator from 'App/Validators/OperarioValidator'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

interface User {
  _id: string
  name: string
  email: string
}

export default class OperariosController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const perPage = request.input('per_page')

    if (page && perPage) {
      return Operario.query().paginate(page, perPage)
    }

    return Operario.all()
  }

  public async show({ params, request, response }: HttpContextContract) {
    const operario = await Operario.findOrFail(params.id)
    const token = request.header('Authorization')

    try {
      const { data: user } = await axios.get<User>(
        `${Env.get('MS_SECURITY')}/api/users/${operario.user_id}`,
        { headers: { Authorization: token } }
      )

      return {
        id: operario.id,
        name: user.name,
        email: user.email,
        experiencia: operario.experiencia,
      }
    } catch {
      return response.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado en microservicio de seguridad',
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(OperarioValidator)
      const { user_id, experiencia } = payload
      const token = request.header('Authorization')

      // Verificar existencia del usuario en ms-security
      const { data: user } = await axios.get<User>(
        `${Env.get('MS_SECURITY')}/api/users/${user_id}`,
        { headers: { Authorization: token } }
      )

      if (!user || !user._id) {
        return response.status(400).json({
          status: 'error',
          message: 'Usuario inválido o incompleto en ms-security',
        })
      }

      const exists = await Operario.query().where('user_id', user_id).first()
      if (exists) {
        return response.status(409).json({
          status: 'error',
          message: 'Este usuario ya está registrado como operario',
        })
      }

      const operario = await Operario.create({ user_id, experiencia })

      return response.created({
        status: 'success',
        message: 'Operario creado',
        data: {
          id: operario.id,
          name: user.name,
          email: user.email,
          experiencia: operario.experiencia,
        },
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Error de validación o servicio externo',
        errors: error.messages || error.response?.data || error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const operario = await Operario.findOrFail(params.id)
      const payload = await request.validate(OperarioValidator)

      operario.merge(payload)
      await operario.save()

      return {
        status: 'success',
        message: 'Operario actualizado',
        data: operario,
      }
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Error al actualizar el operario',
        errors: error.messages || error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const operario = await Operario.findOrFail(params.id)
    await operario.delete()
    return response.noContent()
  }
}
