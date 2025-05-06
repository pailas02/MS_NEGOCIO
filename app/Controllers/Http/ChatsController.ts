import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    // Crear un nuevo Chat
    //  GET /Chats
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Chat.query().paginate(page, perPage)
    } else {
      return await Chat.query()
    }
  }

  // Listar Chat by ID
    // GET /Chats/:id
  public async show({ params }: HttpContextContract) {
    return await Chat.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(ChatValidator);
    const theChat: Chat = await Chat.create(payload);
    return theChat;
  }

  // Actualizar an Chat
    // PUT /Chats/:id
  public async update({ params, request }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id);
    const payload = await request.validate(ChatValidator);
    theChat.titulo = payload.titulo;
    theChat.tipo = payload.tipo;
    return await theChat.save();
  }

  // Eliminar an Chat
    // DELETE /Chats/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theChat: Chat = await Chat.findOrFail(params.id);
    await theChat.delete();
    response.status(204);
    return;
  }
}
