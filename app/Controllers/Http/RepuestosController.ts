 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repuesto from 'App/Models/Repuesto'

export default class RepuestosController {
    //create
    public async create({ request, response }: HttpContextContract) {
        const body = request.body()
        const theRepuesto = await Repuesto.create(body)
        return response.status(201).json(theRepuesto)
    }
    //find
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRepuesto = await Repuesto.findOrFail(params.id)
            return theRepuesto
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await Repuesto.query().paginate(page, perPage)
            } else {
                return await Repuesto.query()
            }
        }
    }
    //update
    public async update({ params, request }: HttpContextContract) {
        const theRepuesto = await Repuesto.findOrFail(params.id)
        const body = request.body()
        theRepuesto.merge(body)
        return await theRepuesto.save() 
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theRepuesto = await Repuesto.findOrFail(params.id)
        response.status(204)
        return await theRepuesto.delete()
    }

}
