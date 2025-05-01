import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ObraMunicipio from 'App/Models/ObraMunicipio';

export default class ObraMunicipiosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theObraMunicipio = await ObraMunicipio.create(body)
        return theObraMunicipio
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObraMunicipio = await ObraMunicipio.findOrFail(params.id)
            return theObraMunicipio
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await ObraMunicipio.query().paginate(page, perPage)
            } else {
                return await ObraMunicipio.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theObraMunicipio = await ObraMunicipio.findOrFail(params.id)
        theObraMunicipio.obraId = body.obraId
        theObraMunicipio.municipioId = body.municipioId
        return await theObraMunicipio.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theObraMunicipio = await ObraMunicipio.findOrFail(params.id)
        response.status(204)
        return await theObraMunicipio.delete()
    }
}
