import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poliza from 'App/Models/Poliza';
import PolizaValidator from 'App/Validators/PolizaValidator';

export default class PolizasController {
    // Crear un nuevo Poliza
    //  GET /Polizas
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Poliza.query().paginate(page, perPage)
    } else {
      return await Poliza.query()
    }
  }

  // Listar Poliza by ID
    // GET /Polizas/:id
  public async show({ params }: HttpContextContract) {
    return await Poliza.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(PolizaValidator);
    const thePoliza: Poliza = await Poliza.create(payload);
    return thePoliza;
  }

  // Actualizar an Poliza
    // PUT /Polizas/:id
  public async update({ params, request }: HttpContextContract) {
    const thePoliza: Poliza = await Poliza.findOrFail(params.id);
    const payload = await request.validate(PolizaValidator);
    thePoliza.idOperario = payload.idOperario;
    thePoliza.idMaquina = payload.idMaquina;
    thePoliza.idSeguro = payload.idSeguro;
    thePoliza.fechaInicio = payload.fechaInicio;
    thePoliza.fechaFin = payload.fechaFin;
    thePoliza.estado = payload.estado ?? '';
    return await thePoliza.save();
  }

  // Eliminar an Poliza
    // DELETE /Polizas/:id
  public async destroy({ params, response }: HttpContextContract) {
    const thePoliza: Poliza = await Poliza.findOrFail(params.id);
    await thePoliza.delete();
    response.status(204);
    return;
  }
}
