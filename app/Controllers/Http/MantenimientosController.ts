import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mantenimiento from 'App/Models/Mantenimiento'
import MantenimientoValidator from 'App/Validators/MantenimientoValidator'

export default class MantenimientosController {
  //create
  public async create({ request }: HttpContextContract) {
    const validatedData = await request.validate(MantenimientoValidator)
    const theMantenimiento = await Mantenimiento.create(validatedData)
    return theMantenimiento
  }

  //read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theMantenimiento = await Mantenimiento.findOrFail(params.id)
      return theMantenimiento
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Mantenimiento.query().paginate(page, perPage)
      } else {
        return await Mantenimiento.query()
      }
    }
  }

  //update    
  public async update({ params, request }: HttpContextContract) {
    const validatedData = await request.validate(MantenimientoValidator)
    const theMantenimiento = await Mantenimiento.findOrFail(params.id)
    theMantenimiento.fecha = validatedData.fecha
    theMantenimiento.estado = validatedData.estado
    theMantenimiento.maquinaId = validatedData.maquinaId
    return await theMantenimiento.save()
  }

  //delete
  public async delete({ params, response }: HttpContextContract) {
    const theMantenimiento = await Mantenimiento.findOrFail(params.id)
    await theMantenimiento.delete()
    response.status(204)
    return
  }
}
