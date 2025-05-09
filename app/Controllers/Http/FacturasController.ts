import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factura from 'App/Models/Factura'
import FacturaValidator from 'App/Validators/FacturaValidator'

export default class FacturasController {
  // Listar facturas (paginadas o todas)
  public async index({ request }: HttpContextContract) {
    const { page, per_page } = request.qs()

    if (page && per_page) {
      return await Factura.query().paginate(Number(page), Number(per_page))
    }

    return await Factura.all()
  }

  // Obtener una factura por ID
  public async show({ params }: HttpContextContract) {
    return await Factura.findOrFail(params.id)
  }

  // Crear una factura
  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(FacturaValidator)
    const factura = await Factura.create(payload)
    return factura
  }

  // Actualizar una factura
  public async update({ params, request }: HttpContextContract) {
    const factura = await Factura.findOrFail(params.id)
    const payload = await request.validate(FacturaValidator)

    factura.detalle = payload.detalle
    factura.id_cuota = payload.id_cuota
    factura.fechaPago = payload.fechaPago ?? null

    await factura.save()
    return factura
  }

  // Eliminar una factura
  public async destroy({ params, response }: HttpContextContract) {
    const factura = await Factura.findOrFail(params.id)
    await factura.delete()
    return response.noContent()
  }
}
