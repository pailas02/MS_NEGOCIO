import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Operario from 'App/Models/Operario';
import OperarioValidator from 'App/Validators/OperarioValidator';

export default class OperariosController {
  /**
   * Lista todos los operarios, con opción de paginación.
   *
   * @route GET /operarios
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @returns {Promise<Operario[] | PaginateContract<Operario>>} - Una promesa que resuelve a un array de operarios o a un objeto de paginación.
   */
  public async index({ request }: HttpContextContract) {
    const data = request.all();

    // Verifica si se solicitó paginación mediante los parámetros 'page' y 'per_page'.
    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1); // Obtiene el número de página, por defecto es 1.
      const perPage = request.input('per_page', 20); // Obtiene la cantidad de items por página, por defecto es 20.
      return await Operario.query().paginate(page, perPage); // Realiza la consulta paginada.
    } else {
      return await Operario.query(); // Si no hay parámetros de paginación, devuelve todos los operarios.
    }
  }

  /**
   * Muestra los detalles de un operario específico por su ID.
   *
   * @route GET /operarios/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del operario a buscar.
   * @returns {Promise<Operario>} - Una promesa que resuelve al operario encontrado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún operario con el ID proporcionado.
   */
  public async show({ params }: HttpContextContract) {
    return await Operario.findOrFail(params.id); // Busca un operario por su ID o lanza una excepción si no existe.
  }

  /**
   * Crea un nuevo operario.
   *
   * @route POST /operarios
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {AdonisRequest} ctx.request - El objeto de la petición HTTP.
   * @returns {Promise<Operario>} - Una promesa que resuelve al operario recién creado.
   */
  public async store({ request }: HttpContextContract) {
    // Valida los datos de la petición utilizando el validador OperarioValidator.
    const payload = await request.validate(OperarioValidator);

    // Crea un nuevo operario en la base de datos con los datos validados.
    const theOperario: Operario = await Operario.create(payload);

    return theOperario; // Devuelve el operario recién creado.
  }

  /**
   * Actualiza la información de un operario existente por su ID.
   *
   * @route PUT /operarios/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del operario a actualizar.
   * @param {AdonisRequest} ctx.request - El objeto de la petición HTTP.
   * @returns {Promise<Operario>} - Una promesa que resuelve al operario actualizado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún operario con el ID proporcionado.
   */
  public async update({ params, request }: HttpContextContract) {
    // Busca el operario existente por su ID o lanza una excepción si no existe.
    const theOperario: Operario = await Operario.findOrFail(params.id);

    // Valida los datos de la petición para la actualización.
    const payload = await request.validate(OperarioValidator);

    // Actualiza los campos del operario con los datos validados.
    theOperario.email = payload.email;
    theOperario.nombre = payload.nombre;
    theOperario.experiencia = payload.experiencia ?? theOperario.experiencia; // Usa el nuevo valor si se proporciona, sino mantiene el existente.

    // Guarda las modificaciones en la base de datos.
    return await theOperario.save();
  }

  /**
   * Elimina un operario existente por su ID.
   *
   * @route DELETE /operarios/:id
   * @param {HttpContextContract} ctx - El contexto HTTP de AdonisJS.
   * @param {object} ctx.params - Objeto que contiene los parámetros de la ruta.
   * @param {number} ctx.params.id - El ID del operario a eliminar.
   * @param {AdonisResponse} ctx.response - El objeto de la respuesta HTTP.
   * @returns {Promise<void>} - Una promesa que resuelve cuando el operario ha sido eliminado.
   * @throws {ModelNotFoundException} - Si no se encuentra ningún operario con el ID proporcionado.
   */
  public async destroy({ params, response }: HttpContextContract) {
    // Busca el operario a eliminar por su ID o lanza una excepción si no existe.
    const theOperario: Operario = await Operario.findOrFail(params.id);

    // Elimina el operario de la base de datos.
    await theOperario.delete();

    // Envía una respuesta con código de estado 204 (No Content), indicando que la eliminación fue exitosa pero no hay contenido para devolver.
    response.status(204);
    return;
  }
}