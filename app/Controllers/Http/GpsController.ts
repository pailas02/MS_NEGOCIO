import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gps from 'App/Models/Gps';

export default class GpssController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGps = await Gps.create(body)
        return theGps
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGps = await Gps.findOrFail(params.id)
            return theGps
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Gps.query().paginate(page, perPage)
            } else {
                return await Gps.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theGps = await Gps.findOrFail(params.id)
        theGps.latitud = body.latitud
        theGps.longitud = body.longitud
        theGps.maquina_id = body.maquinaId

        return await theGps.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theGps = await Gps.findOrFail(params.id)
        response.status(204)
        return await theGps.delete()
    }
}
