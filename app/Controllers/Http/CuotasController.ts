import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'
import CuotaValidator from 'App/Validators/CuotaValidator'

export default class CuotasController {
  // Listar cuotas (todas o paginadas)
  public async index({ request }: HttpContextContract) {
    const { page, per_page } = request.qs()

    if (page && per_page) {
      return await Cuota.query().paginate(Number(page), Number(per_page))
    }

    return await Cuota.all()
  }

  // Obtener una cuota por ID
  public async show({ params }: HttpContextContract) {
    return await Cuota.findOrFail(params.id)
  }

  // Crear una cuota
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CuotaValidator)
    return await Cuota.create(payload)
  }

  // Actualizar una cuota
  public async update({ params, request }: HttpContextContract) {
    const cuota = await Cuota.findOrFail(params.id)
    const payload = await request.validate(CuotaValidator)

    cuota.monto = payload.monto
    cuota.estado = payload.estado
    cuota.servicio_id = payload.servicio_id

    await cuota.save()
    return cuota
  }

  // Eliminar una cuota
  public async destroy({ params, response }: HttpContextContract) {
    const cuota = await Cuota.findOrFail(params.id)
    await cuota.delete()
    return response.noContent()
  }
}
