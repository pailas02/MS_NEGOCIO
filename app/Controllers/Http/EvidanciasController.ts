import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidancia from 'App/Models/Evidancia';
import Novedad from 'App/Models/Novedad';
import EvidanciaValidator from 'App/Validators/EvidanciaValidator';

export default class EvidanciasController {
    //create
    public async create({ request }: HttpContextContract) {
        const Validator = await request.validate(EvidanciaValidator)
        const theEvidancia = await Evidancia.create(Validator)
        return theEvidancia
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEvidancia = await Evidancia.findOrFail(params.id)
            return theEvidancia
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Evidancia.query().paginate(page, perPage)
            } else {
                return await Evidancia.query()
            }
        }
    }

    //update
    public async update({ params, request }: HttpContextContract) {
        const theEvidancia: Evidancia = await Evidancia.findOrFail(params.id);
        const payload = await request.validate(EvidanciaValidator);
        theEvidancia.tipo = payload.tipo;
        theEvidancia.contenido = payload.contenido;
        theEvidancia.servicio = payload.servicioId;
        theEvidancia.novedad_id = payload.novedad_id;

        return await theEvidancia.save();
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theEvidancia = await Evidancia.findOrFail(params.id)
        response.status(204)
        return await theEvidancia.delete()
    }
}
