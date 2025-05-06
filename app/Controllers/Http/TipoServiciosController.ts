import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoServicio from 'App/Models/TipoServicio';
import TipoServicioValidator from 'App/Validators/TipoServicioValidator';

export default class TipoServiciosController {
    // Crear un nuevo TipoServicio
    //  GET /TipoServicios
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await TipoServicio.query().paginate(page, perPage)
    } else {
      return await TipoServicio.query()
    }
  }

  // Listar TipoServicio by ID
    // GET /TipoServicios/:id
  public async show({ params }: HttpContextContract) {
    return await TipoServicio.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(TipoServicioValidator);
    const theTipoServicio: TipoServicio = await TipoServicio.create(payload);
    return theTipoServicio;
  }

  // Actualizar an TipoServicio
    // PUT /TipoServicios/:id
  public async update({ params, request }: HttpContextContract) {
    const theTipoServicio: TipoServicio = await TipoServicio.findOrFail(params.id);
    const payload = await request.validate(TipoServicioValidator);
    theTipoServicio.nombre = payload.nombre;
    theTipoServicio.descripcion = payload.descripcion ?? theTipoServicio.descripcion;
    return await theTipoServicio.save();
  }

  // Eliminar an TipoServicio
    // DELETE /TipoServicios/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theTipoServicio: TipoServicio = await TipoServicio.findOrFail(params.id);
    await theTipoServicio.delete();
    response.status(204);
    return;
  }
}
