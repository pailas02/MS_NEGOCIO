import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obra from 'App/Models/Obra';
import ObraValidator from 'App/Validators/ObraValidator';

export default class ObrasController {

    // Create a new Obra
    // POST /obras 
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ObraValidator);
        const theObra: Obra = await Obra.create({
            nombre: payload.nombre,
            descripcion : payload.descripcion,
            comboId : payload.comboId
        });

        if (request.input('municipios')) {
            await theObra.related('municipios').sync(request.input('municipios'))
        }

        await theObra.load('municipios')
        return theObra;
    }

    // Listar Obras or a specific Obra by ID
    // GET /obras
    // GET /obras/:id
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theObra: Obra = await Obra.query()
                .where('id', params.id)
                .preload('municipios')
                .firstOrFail()
            return theObra;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Obra.query()
                    .preload('municipios')
                    .paginate(page, perPage)
            } else {
                return await Obra.query().preload('municipios')
            }
        }
    }

    // Actualizar an Obra
    // PUT /obras/:id
    public async update({ params, request }: HttpContextContract) {
        const theObra: Obra = await Obra.findOrFail(params.id);
        const payload = await request.validate(ObraValidator);
        theObra.nombre = payload.nombre;
        theObra.descripcion = payload.descripcion;
        theObra.comboId = payload.comboId;
        await theObra.save();

        if (request.input('municipios')) {
            await theObra.related('municipios').sync(request.input('municipios'))
        }

        await theObra.refresh()
        await theObra.load('municipios')
        return theObra;
    }

    // Eliminar an Obra
    // DELETE /obras/:id
    public async delete({ params, response }: HttpContextContract) {
        const theObra: Obra = await Obra.findOrFail(params.id);
        // Las relaciones con municipios se eliminarán automáticamente por la configuración onDelete: CASCADE
        response.status(204);
        return await theObra.delete();
    }
}