import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EspecialidadOperario from 'App/Models/EspecialidadOperario';
import EspecialidadOperarioValidator from 'App/Validators/EspecialidadOperariValidator';

export default class EspecialidadOperariosController {
    // Crear un nuevo EspecialidadOperario
    //  GET /EspecialidadOperarios
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await EspecialidadOperario.query().paginate(page, perPage)
    } else {
      return await EspecialidadOperario.query()
    }
  }

  // Listar EspecialidadOperario by ID
    // GET /EspecialidadOperarios/:id
  public async show({ params }: HttpContextContract) {
    return await EspecialidadOperario.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(EspecialidadOperarioValidator);
    const theEspecialidadOperario: EspecialidadOperario = await EspecialidadOperario.create({
      especialidadId: payload.EspecialidadId,
      operarioId: payload.OperarioId,
    });
    return theEspecialidadOperario;
  }

  // Actualizar an EspecialidadOperario
    // PUT /EspecialidadOperarios/:id
  public async update({ params, request }: HttpContextContract) {
    const theEspecialidadOperario: EspecialidadOperario = await EspecialidadOperario.findOrFail(params.id);
    const payload = await request.validate(EspecialidadOperarioValidator);
    theEspecialidadOperario.especialidadId = payload.EspecialidadId;
    theEspecialidadOperario.operarioId = payload.OperarioId;
      return await theEspecialidadOperario.save();
  }

  // Eliminar an EspecialidadOperario
    // DELETE /EspecialidadOperarios/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theEspecialidadOperario: EspecialidadOperario = await EspecialidadOperario.findOrFail(params.id);
    await theEspecialidadOperario.delete();
    response.status(204);
    return;
  }
}
