import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteMnunicipio from 'App/Models/GobernanteMunicipio';

export default class GobernanteMnunicipiosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGobernanteMnunicipio = await GobernanteMnunicipio.create(body)
        return theGobernanteMnunicipio
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernanteMnunicipio = await GobernanteMnunicipio.findOrFail(params.id)
            return theGobernanteMnunicipio
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await GobernanteMnunicipio.query().paginate(page, perPage)
            } else {
                return await GobernanteMnunicipio.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theGobernanteMnunicipio = await GobernanteMnunicipio.findOrFail(params.id)
        theGobernanteMnunicipio.gobernanteId = body.gobernanteId
        theGobernanteMnunicipio.municipioId = body.municipioId
        return await theGobernanteMnunicipio.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theGobernanteMnunicipio = await GobernanteMnunicipio.findOrFail(params.id)
        response.status(204)
        return await theGobernanteMnunicipio.delete()
    }
}
