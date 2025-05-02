import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteDepartamento
from 'App/Models/GobernanteDepartameto';

export default class GobernanteDepartamentosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGobernanteDepartamento

 = await GobernanteDepartamento

.create(body)
        return theGobernanteDepartamento


    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernanteDepartamento

 = await GobernanteDepartamento

.findOrFail(params.id)
            return theGobernanteDepartamento


        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await GobernanteDepartamento

.query().paginate(page, perPage)
            } else {
                return await GobernanteDepartamento

.query()
            }
        }
    } 
    //update    
        public async update({ params, request }: HttpContextContract) {
            const body = request.body()
            const theGps = await GobernanteDepartamento
.findOrFail(params.id)
            theGps.gobernanteId = body.gobernanteId
            theGps.departamentoId = body.municipioId
            theGps.fechaInicio = body.fechaInicio
            theGps.fechaFin = body.fechaFin
            return await theGps.save()
        }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteDepartamento

 = await GobernanteDepartamento

.findOrFail(params.id)
        response.status(204)
        return await theGobernanteDepartamento

.delete()
    }
}
