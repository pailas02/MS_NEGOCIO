import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obra from 'App/Models/Obra';

export default class ObrasController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theObra = await Obra.create(body)
        return theObra
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObra = await Obra.findOrFail(params.id)
            return theObra
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Obra.query().paginate(page, perPage)
            } else {
                return await Obra.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theObra = await Obra.findOrFail(params.id)
        theObra.nombre = body.nombre
        theObra.descripcion = body.descripcion
        theObra.municipios = body.municipios
        return await theObra.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theObra = await Obra.findOrFail(params.id)
        response.status(204)
        return await theObra.delete()
    }
}
