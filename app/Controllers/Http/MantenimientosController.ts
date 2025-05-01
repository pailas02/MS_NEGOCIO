import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mantenimiento from 'App/Models/Mantenimiento';

export default class MantenimientosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theMantenimiento = await Mantenimiento.create(body)
        return theMantenimiento
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMantenimiento = await Mantenimiento.findOrFail(params.id)
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
        const body = request.body()
        const theMantenimiento = await Mantenimiento.findOrFail(params.id)
        theMantenimiento.estado = body.estado
        theMantenimiento.fecha = body.fecha
        theMantenimiento.maquina = body.maquinaId
        return await theMantenimiento.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theMantenimiento = await Mantenimiento.findOrFail(params.id)
        response.status(204)
        return await theMantenimiento.delete()
    }
}
