import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProcedimientoMantenimientoValidator {
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
    /**
     * Define the schema for the data you want to validate.
     */

    repuestos: schema.array().members(
      schema.object().members({
        id: schema.number(),
        cantidad: schema.number(),
      })
    ),

    operario_id: schema.number([
      // rules.exists({ table: 'operarios', column: 'id' }),
      rules.exists({
        table: 'operarios',
        column: 'id',
        where: {
          estado: 'activo',
        },
      }),
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
    'nombre.string': 'El nombre del procedimiento debe ser una cadena de texto.',
    'repuestos.*.number': 'Cada ID de repuesto debe ser un número.',
    'repuestos.*.greaterThan': 'Cada ID de repuesto debe ser mayor que cero.',
  }
}
