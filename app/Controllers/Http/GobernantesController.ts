import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante';

export default class GobernantesController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theGobernante = await Gobernante.create(body)
        return theGobernante
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGobernante = await Gobernante.findOrFail(params.id)
            return theGobernante
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Gobernante.query().paginate(page, perPage)
            } else {
                return await Gobernante.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theGobernante = await Gobernante.findOrFail(params.id)
        theGobernante.nombre = body.nombre
        theGobernante.cargo = body.cargo
        theGobernante.periodoInicio = body.periodoInicio
        theGobernante.periodoFin = body.periodoFin
        theGobernante.departamento = body.departamentoId
        theGobernante.municipios = body.municipios
        theGobernante.obras = body.obras


        return await theGobernante.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theGobernante = await Gobernante.findOrFail(params.id)
        response.status(204)
        return await theGobernante.delete()
    }
}
