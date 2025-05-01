import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';

export default class ChatsController {
    //create
    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theChat = await Chat.create(body)
        return theChat
    }

    //read
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theChat = await Chat.findOrFail(params.id)
            return theChat
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Chat.query().paginate(page, perPage)
            } else {
                return await Chat.query()
            }
        }
    }

    //update    
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theChat = await Chat.findOrFail(params.id)
        theChat.titulo = body.titulo
        theChat.tipo = body.tipo
        theChat.mensajes = body.mensajes
        return await theChat.save()
    }
    //delete
    public async delete({ params, response }: HttpContextContract) {
        const theChat = await Chat.findOrFail(params.id)
        response.status(204)
        return await theChat.delete()
    }
}
