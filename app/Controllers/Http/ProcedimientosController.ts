import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Procedimiento from 'App/Models/Procedimiento';

export default class ProcedimientosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theProcedimiento = await Procedimiento.create(body)
        return theProcedimiento
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProcedimiento = await Procedimiento.findOrFail(params.id)
            return theProcedimiento
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Procedimiento.query().paginate(page, perPage)
            } else {
                return await Procedimiento.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theProcedimiento = await Procedimiento.findOrFail(params.id)
        theProcedimiento.nombre = body.nombre
        theProcedimiento.descripcion = body.descripcion
        theProcedimiento.mantenimientos = body.mantenimientos
        return await theProcedimiento.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theProcedimiento = await Procedimiento.findOrFail(params.id)
        response.status(204)
        return await theProcedimiento.delete()
    }
}
