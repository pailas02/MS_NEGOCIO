import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteDepartameto from 'App/Models/GobernanteDepartamento';
import GobernanteDepartametoValidator from 'App/Validators/GobernanteDepartametoValidator';

export default class GobernanteDepartametosController {
    // Crear un nuevo GobernanteDepartameto
    //  GET /GobernanteDepartametos
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await GobernanteDepartameto.query().paginate(page, perPage)
    } else {
      return await GobernanteDepartameto.query()
    }
  }

  // Listar GobernanteDepartameto by ID
    // GET /GobernanteDepartametos/:id
  public async show({ params }: HttpContextContract) {
    return await GobernanteDepartameto.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(GobernanteDepartametoValidator);
    const theGobernanteDepartameto: GobernanteDepartameto = await GobernanteDepartameto.create(payload);
    return theGobernanteDepartameto;
  }

  // Actualizar an GobernanteDepartameto
    // PUT /GobernanteDepartametos/:id
  public async update({ params, request }: HttpContextContract) {
    const theGobernanteDepartameto: GobernanteDepartameto = await GobernanteDepartameto.findOrFail(params.id);
    const payload = await request.validate(GobernanteDepartametoValidator);
    theGobernanteDepartameto.departamentoId = payload.departamento_id;
    theGobernanteDepartameto.gobernanteId = payload.gobernante_id ;
    theGobernanteDepartameto.fechaInicio = payload.fecha_inicio;
    theGobernanteDepartameto.fechaFin = payload.fecha_fin;


    return await theGobernanteDepartameto.save();
  }

  // Eliminar an GobernanteDepartameto
    // DELETE /GobernanteDepartametos/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theGobernanteDepartameto: GobernanteDepartameto = await GobernanteDepartameto.findOrFail(params.id);
    await theGobernanteDepartameto.delete();
    response.status(204);
    return;
  }
}
