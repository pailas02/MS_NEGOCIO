import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';
import SeguroValidator from 'App/Validators/SeguroValidator';

export default class SegurosController {
    // Crear un nuevo Seguro
    //  GET /Seguros
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Seguro.query().paginate(page, perPage)
    } else {
      return await Seguro.query()
    }
  }

  // Listar Seguro by ID
    // GET /Seguros/:id
  public async show({ params }: HttpContextContract) {
    return await Seguro.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(SeguroValidator);
    const theSeguro: Seguro = await Seguro.create(payload);
    return theSeguro;
  }

  // Actualizar an Seguro
    // PUT /Seguros/:id
  public async update({ params, request }: HttpContextContract) {
    const theSeguro: Seguro = await Seguro.findOrFail(params.id);
    const payload = await request.validate(SeguroValidator);
    theSeguro.nombre = payload.nombre;
    theSeguro.descripcion = payload.descripcion ?? theSeguro.descripcion;
    theSeguro.costo = payload.costo ?? theSeguro.costo;
    return await theSeguro.save();
  }

  // Eliminar an Seguro
    // DELETE /Seguros/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theSeguro: Seguro = await Seguro.findOrFail(params.id);
    await theSeguro.delete();
    response.status(204);
    return;
  }
}
