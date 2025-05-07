import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento'
import { DateTime } from 'luxon'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import CreateGobernanteValidator from 'App/Validators/GobernanteValidator'

export default class GobernantesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateGobernanteValidator)
    const { user_id, periodoInicio, periodoFin, tipo, territorio } = payload

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

    const gobernante = await Gobernante.create({ user_id, periodoInicio, periodoFin, tipo })

    if (tipo === 'departamento') {
      const tieneMunicipios = await GobernanteMunicipio.query()
        .where('gobernanteId', gobernante.id)
        .where('fechaFin', '>=', DateTime.now().toSQL())
        .first()

      if (tieneMunicipios) {
        return response.badRequest({
          message: 'Ya tiene asignado un municipio activo. No puede ser asignado a un departamento.',
        })
      }

      await GobernanteDepartamento.create({
        gobernanteId: gobernante.id,
        departamentoId: territorio.departamento_id,
        fechaInicio: periodoInicio,
        fechaFin: periodoFin,
      })
    } else if (tipo === 'municipio') {
      const tieneDepartamentos = await GobernanteDepartamento.query()
        .where('gobernanteId', gobernante.id)
        .where('fechaFin', '>=', DateTime.now().toSQL())
        .first()

      if (tieneDepartamentos) {
        return response.badRequest({
          message: 'Ya tiene asignado un departamento activo. No puede ser asignado a un municipio.',
        })
      }

      await GobernanteMunicipio.create({
        gobernanteId: gobernante.id,
        municipioId: territorio.municipio_id,
        fechaInicio: periodoInicio,
        fechaFin: periodoFin,
      })
    } else {
      return response.badRequest({ message: 'Tipo de territorio inválido' })
    }

    return response.created({ message: 'Gobernante creado y asignado correctamente' })
  }

  public async index({ response }: HttpContextContract) {
    const gobernantes = await Gobernante.query()
      .preload('departamentos', (q) => q.pivotColumns(['fecha_inicio', 'fecha_fin']))
      .preload('municipios', (q) => q.pivotColumns(['fecha_inicio', 'fecha_fin']))

    const gobernantesConUsuario = await Promise.all(
      gobernantes.map(async (g) => {
        let user = null
        try {
          const res = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${g.user_id}`)
          const { _id, name, email } = res.data
          user = { id: _id, name, email }
        } catch {
          user = { id: g.user_id, name: 'Usuario no disponible', email: '' }
        }

        return {
          id: g.id,
          user,
          periodo_inicio: g.periodoInicio,
          periodo_fin: g.periodoFin,
          tipo: g.tipo,
          departamentos: g.departamentos,
          municipios: g.municipios,
        }
      })
    )

    return response.ok(gobernantesConUsuario)
  }

  public async show({ params, response }: HttpContextContract) {
    const gobernante = await Gobernante.query()
      .where('id', params.id)
      .preload('departamentos', (q) => q.pivotColumns(['fecha_inicio', 'fecha_fin']))
      .preload('municipios', (q) => q.pivotColumns(['fecha_inicio', 'fecha_fin']))
      .firstOrFail()

    let user = null
    try {
      const res = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`)
      const { _id, name, email } = res.data
      user = { id: _id, name, email }
    } catch {
      user = { id: gobernante.user_id, name: 'Usuario no disponible', email: '' }
    }

    return response.ok({
      id: gobernante.id,
      user,
      periodo_inicio: gobernante.periodoInicio,
      periodo_fin: gobernante.periodoFin,
      tipo: gobernante.tipo,
      departamentos: gobernante.departamentos,
      municipios: gobernante.municipios,
    })
  }
}
