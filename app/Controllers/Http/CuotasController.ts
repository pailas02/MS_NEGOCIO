import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota'
import CuotaValidator from 'App/Validators/CuotaValidator'

export default class CuotasController {
  // create
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CuotaValidator)
    const theCuota = await Cuota.create(payload)
    return theCuota
  }

  // read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theCuota = await Cuota.findOrFail(params.id)
      return theCuota
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Cuota.query().paginate(page, perPage)
      } else {
        return await Cuota.query()
      }
    }
  }

  // update    
  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(CuotaValidator)
    const theCuota = await Cuota.findOrFail(params.id)
    theCuota.merge(payload)
    return await theCuota.save()
  }

  // delete
  public async delete({ params, response }: HttpContextContract) {
    const theCuota = await Cuota.findOrFail(params.id)
    await theCuota.delete()
    response.status(204)
  }
}
