import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio';
import GobernanteMunicipioValidator from 'App/Validators/GobernanteMunicipioValidator';

export default class GobernanteMunicipiosController {
    // Crear un nuevo GobernanteMunicipio
    //  GET /GobernanteMunicipios
  public async index({ request }: HttpContextContract) {
    const data = request.all()
    if ("page" in data && "per_page" in data) {
      const page = request.input('page', 1);
      const perPage = request.input("per_page", 20);
      return await GobernanteMunicipio.query().paginate(page, perPage)
    } else {
      return await GobernanteMunicipio.query()
    }
  }

  // Listar GobernanteMunicipio by ID
    // GET /GobernanteMunicipios/:id
  public async show({ params }: HttpContextContract) {
    return await GobernanteMunicipio.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(GobernanteMunicipioValidator);
    const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.create(payload);
    return theGobernanteMunicipio;
  }

  // Actualizar an GobernanteMunicipio
    // PUT /GobernanteMunicipios/:id
  public async update({ params, request }: HttpContextContract) {
    const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
    const payload = await request.validate(GobernanteMunicipioValidator);
    theGobernanteMunicipio.gobernanteId = payload.GobernanteId;
    theGobernanteMunicipio.municipioId = payload.municipioId;
    theGobernanteMunicipio.fechaInicio = payload.fechaInicio;
    theGobernanteMunicipio.fechaFin = payload.fechaFin;
    theGobernanteMunicipio.historico = payload.historico ?? ''

    return await theGobernanteMunicipio.save();
  }

  // Eliminar an GobernanteMunicipio
    // DELETE /GobernanteMunicipios/:id
  public async destroy({ params, response }: HttpContextContract) {
    const theGobernanteMunicipio: GobernanteMunicipio = await GobernanteMunicipio.findOrFail(params.id);
    await theGobernanteMunicipio.delete();
    response.status(204);
    return;
  }
}
