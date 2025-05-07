import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidancia from 'App/Models/Evidancia'
import EvidenciaValidator from 'App/Validators/EvidenciaValidator'

export default class EvidenciasController {
  // Listar todas
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await Evidancia.query().paginate(page, perPage)
    } else {
      return await Evidancia.all()
    }
  }

  // Obtener una por ID
  public async show({ params }: HttpContextContract) {
    return await Evidancia.findOrFail(params.id)
  }

  // Crear
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(EvidenciaValidator)
    const evidencia = await Evidancia.create(payload)
    return evidencia
  }

  // Actualizar
  public async update({ params, request }: HttpContextContract) {
    const evidencia = await Evidancia.findOrFail(params.id)
    const payload = await request.validate(EvidenciaValidator)
    evidencia.contenido = payload.contenido
    evidencia.tipo = payload.tipo
    return await evidencia.save()
  }

  // Eliminar
  public async destroy({ params, response }: HttpContextContract) {
    const evidencia = await Evidancia.findOrFail(params.id)
    await evidencia.delete()
    response.status(204)
    return
  }
}
