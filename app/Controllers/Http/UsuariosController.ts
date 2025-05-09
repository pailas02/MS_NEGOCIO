import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UsuarioValidator from 'App/Validators/UsuarioValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

interface User {
  _id: string
  name: string
  email: string
}

export default class UsuariosController {
  // Listar usuarios (con o sin paginación)
  public async index({ request }: HttpContextContract) {
    const page = request.input('page')
    const perPage = request.input('per_page')
    if (page && perPage) {
      return Usuario.query().paginate(page, perPage)
    }
    return Usuario.all()
  }

  // Mostrar usuario con info externa de ms-security
  public async show({ params, request, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    const token = request.header('Authorization')

    try {
      const user = await this.getUserById(usuario.userId, token)
      return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        seguridad: user,
      }
    } catch {
      return response.status(404).json({
        status: 'warning',
        message: 'Usuario local encontrado, pero no existe en ms-security',
        data: usuario,
      })
    }
  }

  // Crear usuario después de validar que exista en ms-security
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UsuarioValidator)
      const { user_id, nombre, email, password } = payload
      const token = request.header('Authorization')

      const user = await this.getUserById(user_id, token)

      const exists = await Usuario.query().where('userId', user_id).first()
      if (exists) {
        return response.status(409).json({
          status: 'error',
          message: 'Este usuario ya está registrado localmente',
        })
      }

      const usuario = await Usuario.create({
        userId: user_id,
        nombre,
        email,
        password,
      })

      return response.created({
        status: 'success',
        message: 'Usuario creado correctamente',
        data: {
          id: usuario.id,
          name: user.name,
          email: user.email,
          nombre: usuario.nombre,
        },
      })
    } catch (error) {
      return response.status(422).json({
        status: 'error',
        message: 'Error al crear usuario',
        errors: error.messages || error.response?.data || error.message,
      })
    }
  }

  // Actualizar usuario local
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
        message: 'Error al actualizar usuario',
        errors: error.messages,
      })
    }
  }

  // Eliminar usuario
  public async destroy({ params, response }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.noContent()
  }

  // Consulta privada al microservicio de seguridad
  private async getUserById(userId: string, token?: string): Promise<User> {
    const { data } = await axios.get<User>(
      `${Env.get('MS_SECURITY')}/api/users/${userId}`,
      { headers: { Authorization: token || '' } }
    )
    return data
  }
}
