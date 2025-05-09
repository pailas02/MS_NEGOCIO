import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'
import ServicioValidator from 'App/Validators/ServicioValidator'

export default class ServiciosController {
  // Crear servicio
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(ServicioValidator)
    const servicio = await Servicio.create(payload)
    return servicio
  }

  // Obtener uno o todos
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return await Servicio.query()
        .where('id', params.id)
        .preload('combo') // si deseas incluir el combo asociado
        .firstOrFail()
    }

    const page = request.input('page')
    const perPage = request.input('per_page')

    const query = Servicio.query().preload('combo')

    if (page && perPage) {
      return await query.paginate(page, perPage)
    }

    return await query
  }

  // Actualizar servicio
  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(ServicioValidator)
    const servicio = await Servicio.findOrFail(params.id)
    servicio.merge(payload)
    await servicio.save()
    return servicio
  }

  // Eliminar servicio
  public async delete({ params, response }: HttpContextContract) {
    const servicio = await Servicio.findOrFail(params.id)
    await servicio.delete()
    return response.status(204)
  }
}
