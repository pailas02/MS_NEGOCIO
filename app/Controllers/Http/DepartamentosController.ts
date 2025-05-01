 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departameto';

export default class DepartamentosController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theDepartamento = await Departamento.create(body)
        return theDepartamento
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartamento = await Departamento.findOrFail(params.id)
            return theDepartamento
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Departamento.query().paginate(page, perPage)
            } else {
                return await Departamento.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theDepartamento = await Departamento.findOrFail(params.id)
        theDepartamento.nombre = body.nombre
        theDepartamento.ubicacio = body.ubicacio
        return await theDepartamento.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theDepartamento = await Departamento.findOrFail(params.id)
        response.status(204)
        return await theDepartamento.delete()
    }
}
