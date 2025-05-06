import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidancia from 'App/Models/Evidancia'
import EvidanciaValidator from 'App/Validators/EvidanciaValidator'

export default class EvidanciasController {
  // create
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(EvidanciaValidator)
    const theEvidancia = await Evidancia.create(payload)
    return theEvidancia
  }

  // read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theEvidancia = await Evidancia.query()
        .where('id', params.id)
        .preload('servicio')
        .preload('novedad')
        .firstOrFail()
      return theEvidancia
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Evidancia.query()
          .preload('servicio')
          .preload('novedad')
          .paginate(page, perPage)
      } else {
        return await Evidancia.query().preload('servicio').preload('novedad')
      }
    }
  }

  // update
  public async update({ params, request }: HttpContextContract) {
    const theEvidancia = await Evidancia.findOrFail(params.id)
    const payload = await request.validate(EvidanciaValidator)

    theEvidancia.merge(payload)
    return await theEvidancia.save()
  }

  // delete
  public async delete({ params, response }: HttpContextContract) {
    const theEvidancia = await Evidancia.findOrFail(params.id)
    await theEvidancia.delete()
    response.status(204)
  }
}
