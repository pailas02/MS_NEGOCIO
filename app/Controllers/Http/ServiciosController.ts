import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'
import ServicioValidator from 'App/Validators/ServicioValidator'

export default class ServiciosController {
  // Crear servicio
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(ServicioValidator)
    const theServicio = await Servicio.create(payload)
    return theServicio
  }

  // Consultar uno o varios
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theServicio = await Servicio.findOrFail(params.id)
      return theServicio
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Servicio.query().paginate(page, perPage)
      } else {
        return await Servicio.query()
      }
    }
  }

  // Actualizar servicio
  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(ServicioValidator)
    const theServicio = await Servicio.findOrFail(params.id)
    theServicio.merge(payload)
    return await theServicio.save()
  }

  // Eliminar servicio
  public async delete({ params, response }: HttpContextContract) {
    const theServicio = await Servicio.findOrFail(params.id)
    await theServicio.delete()
    response.status(204)
  }
}
