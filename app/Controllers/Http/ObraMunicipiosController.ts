import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import ObraMunicipio from 'App/Models/ObraMunicipio';
import ObraMunicipioValidator from 'App/Validators/ObraMunicipioValidator';

export default class ObraMunicipiosController {

    // Create a new ObraMunicipio
    // POST /ObraMunicipios 
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ObraMunicipioValidator);
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.create({
            obraId: payload.obraid,
            municipioId: payload.municipioid,
        });
        return theObraMunicipio;
        }

    // Listar ObraMunicipios or a specific ObraMunicipio by ID
    // GET /ObraMunicipios
    // GET /ObraMunicipios/:id
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObraMunicipio: ObraMunicipio = await ObraMunicipio.query()
                .where('id', params.id)
                .preload('Obra')
                .preload('Municipio')
                .firstOrFail()
            return theObraMunicipio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ObraMunicipio.query()
                    .preload('municipios')
                    .paginate(page, perPage)
            } else {
                return await ObraMunicipio.query().preload('municipios')
            }
        }
    }

    // Actualizar an ObraMunicipio
    // PUT /ObraMunicipios/:id
    public async update({ params, request }: HttpContextContract) {
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
        const payload = await request.validate(ObraMunicipioValidator);
        theObraMunicipio.nombre = payload.nombre;
        theObraMunicipio.descripcion = payload.descripcion;
        theObraMunicipio.comboId = payload.comboId;
        await theObraMunicipio.save();

        if (request.input('municipios')) {
            await theObraMunicipio.related('municipios').sync(request.input('municipios'))
        }

        await theObraMunicipio.refresh()
        await theObraMunicipio.load('municipios')
        return theObraMunicipio;
    }

    // Eliminar an ObraMunicipio
    // DELETE /ObraMunicipios/:id
    public async delete({ params, response }: HttpContextContract) {
        const theObraMunicipio: ObraMunicipio = await ObraMunicipio.findOrFail(params.id);
        // Las relaciones con municipios se eliminarán automáticamente por la configuración onDelete: CASCADE
        response.status(204);
        return await theObraMunicipio.delete();
    }
}