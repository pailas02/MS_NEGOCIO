import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProcedimientoMantenimiento from 'App/Models/ProcedimientoMantenimiento';

export default class ProcedimientoMantenimientosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theProcedimientoMantenimiento = await ProcedimientoMantenimiento.create(body)
        return theProcedimientoMantenimiento
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id)
            return theProcedimientoMantenimiento
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await ProcedimientoMantenimiento.query().paginate(page, perPage)
            } else {
                return await ProcedimientoMantenimiento.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id)
        theProcedimientoMantenimiento.
        return await theProcedimientoMantenimiento.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id)
        response.status(204)
        return await theProcedimientoMantenimiento.delete()
    }
}
