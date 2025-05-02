import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteMunicipio
 from 'App/Models/GobernanteMunicipio';

export default class GobernanteMunicipiosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGobernanteMunicipio
 = await GobernanteMunicipio
.create(body)
        return theGobernanteMunicipio

    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernanteMunicipio
 = await GobernanteMunicipio
.findOrFail(params.id)
            return theGobernanteMunicipio

        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await GobernanteMunicipio
.query().paginate(page, perPage)
            } else {
                return await GobernanteMunicipio
.query()
            }
        }
    } 
    //update    
        public async update({ params, request }: HttpContextContract) {
            const body = request.body()
            const theGps = await GobernanteMunicipio.findOrFail(params.id)
            theGps.gobernanteId = body.gobernanteId
            theGps.municipioId = body.municipioId
            theGps.fechaInicio = body.fechaInicio
            theGps.fechaFin = body.fechaFin
            theGps.historico = body.historial
            return await theGps.save()
        }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteMunicipio
 = await GobernanteMunicipio
.findOrFail(params.id)
        response.status(204)
        return await theGobernanteMunicipio
.delete()
    }
}
