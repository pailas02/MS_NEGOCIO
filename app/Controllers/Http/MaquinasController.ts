import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maquina from 'App/Models/Maquina';
import Operario from 'App/Models/Operario';

export default class MaquinasController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theMaquina = await Maquina.create(body)
        return theMaquina
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaquina = await Maquina.findOrFail(params.id)
            return theMaquina
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Maquina.query().paginate(page, perPage)
            } else {
                return await Maquina.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theMaquina = await Maquina.findOrFail(params.id)
        theMaquina.marca = body.marca
        theMaquina.modelo = body.modelo
        theMaquina.estado = body.estado
        return await theMaquina.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theMaquina = await Maquina.findOrFail(params.id)
        response.status(204)
        return await theMaquina.delete()
    }
}
