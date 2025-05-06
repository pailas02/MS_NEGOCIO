import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno';
import TurnoValidator from 'App/Validators/TurnoValidator';

export default class TurnosController {
    // Crear un nuevo Turno
    //  GET /Turnos
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await Turno.query().paginate(page, perPage)
    } else {
      return await Turno.query()
    }
  }

  // Listar Turno by ID
    // GET /Turnos/:id
  public async show({ params }: HttpContextContract) {
    return await Turno.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(TurnoValidator);
    const theTurno: Turno = await Turno.create(payload);
    return theTurno;
  }

  // Actualizar an Turno
    // PUT /Turnos/:id
  public async update({ params, request }: HttpContextContract) {
    const theTurno: Turno = await Turno.findOrFail(params.id);
    const payload = await request.validate(TurnoValidator);
    theTurno.maquinaId = payload.maquinaId;
    theTurno.operarioId = payload.operarioId;
    theTurno.estado = payload.estado ?? '';
    theTurno.fechaInicio = payload.fechaInicio ?? theTurno.fechaInicio;
    theTurno.fechaFin = payload.fechaFin ?? theTurno.fechaFin;
    return await theTurno.save();
  }

  // Eliminar an Turno
    // DELETE /Turnos/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theTurno: Turno = await Turno.findOrFail(params.id);
    await theTurno.delete();
    response.status(204);
    return;
  }
}
