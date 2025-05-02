import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';

export default class CuotasController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theCuota = await Cuota.create(body)
        return theCuota
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCuota = await Cuota.findOrFail(params.id)
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

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCuota = await Cuota.findOrFail(params.id)
        theCuota.monto = body.monto
        theCuota.estado = body.estado
        
        return await theCuota.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theCuota = await Cuota.findOrFail(params.id)
        response.status(204)
        return await theCuota.delete()
    }
}
