import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Combo from 'App/Models/Combo';

export default class CombosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theCombo = await Combo.create(body)
        return theCombo
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCombo = await Combo.findOrFail(params.id)
            return theCombo
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Combo.query().paginate(page, perPage)
            } else {
                return await Combo.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theCombo = await Combo.findOrFail(params.id)
        theCombo.descripcion = body.descripcion
        return await theCombo.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theCombo = await Combo.findOrFail(params.id)
        response.status(204)
        return await theCombo.delete()
    }
}
