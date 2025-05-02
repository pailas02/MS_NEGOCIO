import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio';

export default class ServiciosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theServicio = await Servicio.create(body)
        return theServicio
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theServicio = await Servicio.findOrFail(params.id)
            return theServicio
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Servicio.query().paginate(page, perPage)
            } else {
                return await Servicio.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theServicio = await Servicio.findOrFail(params.id)
        theServicio.costo = body.costo
        theServicio.prioridad = body.prioridad
        theServicio.tipoServicio = body.tipoServicio
        theServicio.fechaInicio = body.fechaInicio
        theServicio.fechaFin = body.fechaFin
        theServicio.estado = body.estado
        theServicio.ubicacion = body.ubicacion
        theServicio.historico = body.historico
        return await theServicio.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theServicio = await Servicio.findOrFail(params.id)
        response.status(204)
        return await theServicio.delete()
    }
}
