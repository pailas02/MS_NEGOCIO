import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factura from 'App/Models/Factura'
import FacturaValidator from 'App/Validators/FacturaValidator'

export default class FacturasController {
  //create
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(FacturaValidator)
    const theFactura = await Factura.create(payload)
    return theFactura
  }

  //read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theFactura = await Factura.findOrFail(params.id)
      return theFactura
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Factura.query().paginate(page, perPage)
      } else {
        return await Factura.query()
      }
    }
  }

  //update    
  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(FacturaValidator)
    const theFactura = await Factura.findOrFail(params.id)
    theFactura.merge(payload)
    return await theFactura.save()
  }

  //delete
  public async delete({ params, response }: HttpContextContract) {
    const theFactura = await Factura.findOrFail(params.id)
    await theFactura.delete()
    response.status(204)
  }
}
