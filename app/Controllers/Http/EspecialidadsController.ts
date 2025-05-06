import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Especialidad from 'App/Models/Especialidad';
import EspecialidadValidator from 'App/Validators/EspecialidadValidator';

export default class EspecialidadsController {
  /**
   * Lista todos los Especialidads, con opción de paginación.
   *
   * @route GET /Especialidads
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @returns {Promise<Especialidad[] | PaginateContract<Especialidad>>} - Una promesa que resuelve a un array de Especialidads o a un objeto de paginación.
   */
  public async index({ request }: HttpContextContract) {
    const data = request.all();

    // Verifica si se solicitó paginación mediante los parámetros 'page' y 'per_page'.
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1); // Obtiene el número de página, por defecto es 1.
      const perPage = request.input('per_page', 20); // Obtiene la cantidad de items por página, por defecto es 20.
      return await Especialidad.query().paginate(page, perPage); // Realiza la consulta paginada.
    } else {
      return await Especialidad.query(); // Si no hay parámetros de paginación, devuelve todos los Especialidads.
    }
  }

  /**
   * Muestra los detalles de un Especialidad específico por su ID.
   *
   * @route GET /Especialidads/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del Especialidad a buscar.
   * @returns {Promise<Especialidad>} - Una promesa que resuelve al Especialidad encontrado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún Especialidad con el ID proporcionado.
   */
  public async show({ params }: HttpContextContract) {
    return await Especialidad.findOrFail(params.id); // Busca un Especialidad por su ID o lanza una excepción si no existe.
  }

  /**
   * Crea un nuevo Especialidad.
   *
   * @route POST /Especialidads
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {AdonisRequest} ctx.request - El objeto de la petición HTTP.
   * @returns {Promise<Especialidad>} - Una promesa que resuelve al Especialidad recién creado.
   */
  public async store({ request }: HttpContextContract) {
    // Valida los datos de la petición utilizando el validador EspecialidadValidator.
    const payload = await request.validate(EspecialidadValidator);

    // Crea un nuevo Especialidad en la base de datos con los datos validados.
    const theEspecialidad: Especialidad = await Especialidad.create(payload);

    return theEspecialidad; // Devuelve el Especialidad recién creado.
  }

  /**
   * Actualiza la información de un Especialidad existente por su ID.
   *
   * @route PUT /Especialidads/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del Especialidad a actualizar.
   * @param {AdonisRequest} ctx.request - El objeto de la petición HTTP.
   * @returns {Promise<Especialidad>} - Una promesa que resuelve al Especialidad actualizado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún Especialidad con el ID proporcionado.
   */
  public async update({ params, request }: HttpContextContract) {
    // Busca el Especialidad existente por su ID o lanza una excepción si no existe.
    const theEspecialidad: Especialidad = await Especialidad.findOrFail(params.id);

    // Valida los datos de la petición para la actualización.
    const payload = await request.validate(EspecialidadValidator);

    // Actualiza los campos del Especialidad con los datos validados.
    theEspecialidad.nombre = payload.nombre;
    theEspecialidad.descripcion = payload.descripcion ?? '';
    
    // Guarda las modificaciones en la base de datos.
    return await theEspecialidad.save();
  }

  /**
   * Elimina un Especialidad existente por su ID.
   *
   * @route DELETE /Especialidads/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del Especialidad a eliminar.
   * @param {AdonisResponse} ctx.response - El objeto de la respuesta HTTP.
   * @returns {Promise<void>} - Una promesa que resuelve cuando el Especialidad ha sido eliminado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún Especialidad con el ID proporcionado.
   */
  public async destroy({ params, response }: HttpContextContract) {
    // Busca el Especialidad a eliminar por su ID o lanza una excepción si no existe.
    const theEspecialidad: Especialidad = await Especialidad.findOrFail(params.id);

    // Elimina el Especialidad de la base de datos.
    await theEspecialidad.delete();

    // Envía una respuesta con código de estado 204 (No Content), indicando que la eliminación fue exitosa pero no hay contenido para devolver.
    response.status(204);
    return;
  }
}