import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import CreateGobernanteValidator from 'App/Validators/GobernanteValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class GobernantesController {
  public async store({ request, response }: HttpContextContract) {
    const {
      user_id,
      tipo,
      periodoInicio,
      periodoFin,
      territorio,
    } = await request.validate(CreateGobernanteValidator)

    // Verificar existencia del usuario en ms-security
    try {
      await this.getUserById(user_id, request.header('Authorization'))
    } catch (error) {
      return response.status(404).send({
        message: 'El usuario no existe en ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Validar que el departamento_id esté presente si tipo === 'departamento'
    if (tipo === 'departamento' && !territorio?.departamento_id) {
      return response.badRequest({ message: 'Falta el ID del departamento' })
    }

    // Crear el gobernador
    const gobernante = await Gobernante.create({
      userId: user_id,
      tipo,
      periodoInicio,
      periodoFin,
      departamentoId: tipo === 'departamento' ? territorio?.departamento_id : null,
    })

    return response.created({
      message: 'Gobernante creado correctamente',
      data: gobernante,
    })
  }

  private async getUserById(userId: string, token?: string) {
    const { data } = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${userId}`, {
      headers: { Authorization: token || '' },
    })
    return data
  }
}
