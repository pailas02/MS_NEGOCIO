import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento'
import { DateTime } from 'luxon'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class GobernantesController {
  /**
   * POST /gobernantes
   * Crea un nuevo gobernante y lo asigna a un territorio (municipio o departamento).
   * Se asegura que no tenga asignaciones activas duplicadas (XOR entre municipio y departamento).
   */
  public async create({ request, response }: HttpContextContract) {
    // Extrae los campos del cuerpo de la petición
    const { user_id, periodoInicio, periodoFin, territorio, tipo } = request.only([
      'user_id',
      'periodoInicio',
      'periodoFin',
      'territorio',
      'tipo',
    ])

    // Verifica que el usuario exista en el microservicio de seguridad
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
        headers: { Authorization: request.header('Authorization') },
      })
    } catch (error) {
      return response.status(404).send({
        message: 'El usuario no existe en ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Crea el registro del gobernante
    const gobernante = await Gobernante.create({ user_id, periodoInicio, periodoFin })

    // Asignación a departamento
    if (tipo === 'departamento') {
      // Evita asignación si ya tiene municipios activos
      const municipiosActivos = await GobernanteMunicipio.query()
        .where('gobernante_id', gobernante.id)
        .where('fecha_fin', '>=', DateTime.now().toSQL())
        .first()

      if (municipiosActivos) {
        return response.badRequest({
          message: 'El gobernante ya está asignado a un municipio. No puede ser asignado a un departamento simultáneamente.',
        })
      }

      // Crea la relación con el departamento
      await GobernanteDepartamento.create({
        gobernanteId: gobernante.id,
        departamentoId: territorio.departamento_id,
        fechaInicio: periodoInicio,
        fechaFin: periodoFin,
      })

    // Asignación a municipio
    } else if (tipo === 'municipio') {
      // Evita asignación si ya tiene departamentos activos
      const departamentosActivos = await GobernanteDepartamento.query()
        .where('gobernante_id', gobernante.id)
        .where('fecha_fin', '>=', DateTime.now().toSQL())
        .first()

      if (departamentosActivos) {
        return response.badRequest({
          message: 'El gobernante ya está asignado a un departamento. No puede ser asignado a un municipio simultáneamente.',
        })
      }

      // Crea la relación con el municipio
      await GobernanteMunicipio.create({
        gobernanteId: gobernante.id,
        municipioId: territorio.municipio_id,
        fechaInicio: periodoInicio,
        fechaFin: periodoFin,
      })
    } else {
      return response.badRequest({ message: 'Tipo de territorio inválido' })
    }

    return response.status(201).send({ message: 'Gobernante creado y territorio asignado' })
  }

  /**
   * GET /gobernantes o /gobernantes/:id
   * Lista uno o todos los gobernantes con su información de usuario y relaciones activas.
   */
  public async find({ params, response }: HttpContextContract) {
    try {
      if (params.id) {
        // Obtiene gobernante específico
        const gobernante = await Gobernante.query()
          .where('id', params.id)
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin'])
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin'])
          })
          .firstOrFail()

        // Consulta datos del usuario desde ms-security
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`)
        const { _id, name, email } = userResponse.data

        return response.ok({
          id: gobernante.id,
          user: { id: _id, name, email },
          periodo_init: gobernante.periodoInicio,
          periodo_end: gobernante.periodoFin,
          departamentos: gobernante.departamentos,
          municipios: gobernante.municipios,
        })

      } else {
        // Obtiene todos los gobernantes
        const gobernantes = await Gobernante.query()
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin'])
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin'])
          })

        // Mapea y agrega datos de usuario a cada gobernante
        const gobernantesWithUserData = await Promise.all(
          gobernantes.map(async (gobernante) => {
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`)
            const { _id, name, email } = userResponse.data

            return {
              id: gobernante.id,
              user: { id: _id, name, email },
              periodo_init: gobernante.periodoInicio,
              periodo_end: gobernante.periodoFin,
              departamentos: gobernante.departamentos,
              municipios: gobernante.municipios,
            }
          })
        )

        return response.ok(gobernantesWithUserData)
      }
    } catch (error) {
      console.error('Error al listar gobernantes:', error.message)
      return response.internalServerError({
        message: 'Error al listar gobernantes.',
        error: error.message,
      })
    }
  }
}
