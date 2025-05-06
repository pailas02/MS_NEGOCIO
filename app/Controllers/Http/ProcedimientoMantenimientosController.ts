import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProcedimientoMantenimiento from 'App/Models/ProcedimientoMantenimiento';
import ProcedimientoMantenimientoValidator from 'App/Validators/ProcedimientoMantenimientoValidator';

export default class ProcedimientoMantenimientosController {
    // Crear un nuevo ProcedimientoMantenimiento
    //  GET /ProcedimientoMantenimientos
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await ProcedimientoMantenimiento.query().paginate(page, perPage)
    } else {
      return await ProcedimientoMantenimiento.query()
    }
  }

  // Listar ProcedimientoMantenimiento by ID
    // GET /ProcedimientoMantenimientos/:id
  public async show({ params }: HttpContextContract) {
    return await ProcedimientoMantenimiento.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(ProcedimientoMantenimientoValidator);
    const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.create(payload);
    return theProcedimientoMantenimiento;
  }

  // Actualizar an ProcedimientoMantenimiento
    // PUT /ProcedimientoMantenimientos/:id
  public async update({ params, request }: HttpContextContract) {
    const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
    const payload = await request.validate(ProcedimientoMantenimientoValidator);
    theProcedimientoMantenimiento.mantenimientoId = payload.mantenimientoId;
    theProcedimientoMantenimiento.procedimientoId = payload.procedimientoId;
    theProcedimientoMantenimiento.estado = payload.estado ?? '';
    theProcedimientoMantenimiento.observaciones = payload.observaciones ?? '';
    theProcedimientoMantenimiento.fecha = payload.fecha ?? theProcedimientoMantenimiento.fecha;

    return await theProcedimientoMantenimiento.save();
  }

  // Eliminar an ProcedimientoMantenimiento
    // DELETE /ProcedimientoMantenimientos/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theProcedimientoMantenimiento: ProcedimientoMantenimiento = await ProcedimientoMantenimiento.findOrFail(params.id);
    await theProcedimientoMantenimiento.delete();
    response.status(204);
    return;
  }
}
