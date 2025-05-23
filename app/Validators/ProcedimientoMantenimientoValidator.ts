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
    mantenimientoId: schema.number([
      rules.exists({ table: 'mantenimientos', column: 'id' }),
      rules.unsigned(),
    ]),
    procedimientoId: schema.number([
      rules.exists({ table: 'procedimientos', column: 'id' }),
      rules.unsigned(),
    ]),
    estado: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),
    observaciones: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    fecha: schema.date.optional({ format: 'yyyy-MM-dd' }, [
      rules.required(),
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
    'mantenimientoId.required': 'El id del mantenimiento es obligatorio',
    'procedimientoId.required': 'El id del procedimiento es obligatorio',
    'estado.minLength': 'El estado debe tener al menos 3 caracteres',
    'estado.maxLength': 'El estado no puede tener más de 50 caracteres',
    'observaciones.minLength': 'Las observaciones deben tener al menos 3 caracteres',
    'observaciones.maxLength': 'Las observaciones no pueden tener más de 255 caracteres',
    'mantenimientoId.exists': 'El id del mantenimiento no existe',
    'procedimientoId.exists': 'El id del procedimiento no existe',
    'mantenimientoId.unsigned': 'El id del mantenimiento debe ser un número positivo',
    'procedimientoId.unsigned': 'El id del procedimiento debe ser un número positivo',
   }
}
