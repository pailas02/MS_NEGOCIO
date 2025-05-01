import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';

export default class MunicipiosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theMunicipio = await Municipio.create(body)
        return theMunicipio
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipio = await Municipio.findOrFail(params.id)
            return theMunicipio
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Municipio.query().paginate(page, perPage)
            } else {
                return await Municipio.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theMunicipio = await Municipio.findOrFail(params.id)
        theMunicipio.nombre = body.nombre
        theMunicipio.ubicacion = body.ubicacion
        theMunicipio.historico = body.historico
        theMunicipio.departamento = body.departamentoId
        theMunicipio.gobernantes = body.gobernantes                 
        return await theMunicipio.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio = await Municipio.findOrFail(params.id)
        response.status(204)
        return await theMunicipio.delete()
    }
}
