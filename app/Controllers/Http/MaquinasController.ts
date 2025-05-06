import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maquina from 'App/Models/Maquina'
import MaquinaValidator from 'App/Validators/MaquinaValidator'

export default class MaquinasController {
  //create
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(MaquinaValidator)
    const theMaquina = await Maquina.create(payload)
    return theMaquina
  }

  //read
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theMaquina = (await Maquina.findOrFail(params.id)).preload('gps')
      return theMaquina
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Maquina.query().paginate(page, perPage)
      } else {
        return await Maquina.query()
      }
    }
  }

  //update    
  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(MaquinaValidator)
    const theMaquina = await Maquina.findOrFail(params.id)
    theMaquina.merge(payload)
    return await theMaquina.save()
  }

  //delete
  public async delete({ params, response }: HttpContextContract) {
    const theMaquina = await Maquina.findOrFail(params.id)
    await theMaquina.delete()
    response.status(204)
  }
}
