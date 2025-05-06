import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ObraMunicipio from 'App/Models/ObraMunicipio';
import ObraMunicipioValidator from 'App/Validators/ObraMunicipioValidator';

export default class ObraMunicipiosController {
    // Crear un nuevo ObraMunicipio
    //  GET /ObraMunicipios
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await ObraMunicipio.query().paginate(page, perPage)
    } else {
      return await ObraMunicipio.query()
    }
  }

  // Listar ObraMunicipio by ID
    // GET /ObraMunicipios/:id
  public async show({ params }: HttpContextContract) {
    return await ObraMunicipio.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(ObraMunicipioValidator);
    const theObraMunicipio: ObraMunicipio = await ObraMunicipio.create(payload);
    return theObraMunicipio;
  }

  // Actualizar an ObraMunicipio
    // PUT /ObraMunicipios/:id
  public async update({ params, request }: HttpContextContract) {
    const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
    const payload = await request.validate(ObraMunicipioValidator);
    theObraMunicipio.obraId = payload.obraId;
    theObraMunicipio.municipioId = payload.municipioId;

    return await theObraMunicipio.save();
  }

  // Eliminar an ObraMunicipio
    // DELETE /ObraMunicipios/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
    await theObraMunicipio.delete();
    response.status(204);
    return;
  }
}
