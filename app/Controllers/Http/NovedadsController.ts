import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novedad from 'App/Models/Novedad';
import NovedadValidator from 'App/Validators/NovedadValidator';

export default class NovedadsController {
    // Crear un nuevo Novedad
    //  GET /Novedads
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Novedad.query().paginate(page, perPage)
    } else {
      return await Novedad.query()
    }
  }

  // Listar Novedad by ID
    // GET /Novedads/:id
  public async show({ params }: HttpContextContract) {
    return await Novedad.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(NovedadValidator);
    const theNovedad: Novedad = await Novedad.create(payload);
    return theNovedad;
  }

  // Actualizar an Novedad
    // PUT /Novedads/:id
  public async update({ params, request }: HttpContextContract) {
    const theNovedad: Novedad = await Novedad.findOrFail(params.id);
    const payload = await request.validate(NovedadValidator);
    theNovedad.turnoId = payload.turnoId;
    theNovedad.tipo = payload.tipo;
    theNovedad.descripcion = payload.descripcion ?? theNovedad.descripcion;
    theNovedad.evidencia = payload.evidencia ?? theNovedad.evidencia;
    theNovedad.estado = payload.estado ?? theNovedad.estado;
    theNovedad.fecha = payload.fecha ?? theNovedad.fecha;
    theNovedad.gravedad = payload.gravedad ?? theNovedad.gravedad;

    return await theNovedad.save();
  }

  // Eliminar an Novedad
    // DELETE /Novedads/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theNovedad: Novedad = await Novedad.findOrFail(params.id);
    await theNovedad.delete();
    response.status(204);
    return;
  }
}
