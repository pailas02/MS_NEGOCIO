import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Procedimiento from 'App/Models/Procedimiento';
import ProcedimientoValidator from 'App/Validators/ProcedimientoValidator';

export default class ProcedimientosController {
    // Crear un nuevo Procedimiento
    //  GET /procedimientos
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Procedimiento.query().paginate(page, perPage)
    } else {
      return await Procedimiento.query()
    }
  }

  // Listar Procedimiento by ID
    // GET /procedimientos/:id
  public async show({ params }: HttpContextContract) {
    return await Procedimiento.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(ProcedimientoValidator);
    const theProcedimiento: Procedimiento = await Procedimiento.create(payload);
    return theProcedimiento;
  }

  // Actualizar an Procedimiento
    // PUT /procedimientos/:id
  public async update({ params, request }: HttpContextContract) {
    const theProcedimiento: Procedimiento = await Procedimiento.findOrFail(params.id);
    const payload = await request.validate(ProcedimientoValidator);
    theProcedimiento.nombre = payload.nombre;
    theProcedimiento.descripcion = payload.descripcion ?? theProcedimiento.descripcion;
    return await theProcedimiento.save();
  }

  // Eliminar an Procedimiento
    // DELETE /procedimientos/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theProcedimiento: Procedimiento = await Procedimiento.findOrFail(params.id);
    await theProcedimiento.delete();
    response.status(204);
    return;
  }
}
