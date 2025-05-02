import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProcedimientoMantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    procedimientoId: schema.number([
      rules.exists({ table: 'procedimientos_mantenimientos', column: 'id' }),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'procedimientoId.required': 'El ID del procedimiento es obligatorio',
    'procedimientoId.exists': 'El procedimiento seleccionado no existe',
    'procedimientoId.number': 'El ID del procedimiento debe ser un número',
    'procedimientoId.unsigned': 'El ID del procedimiento debe ser un número positivo',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
  }
}
