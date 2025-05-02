import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteValidator {
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
    user_id: schema.string({}, [
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    periodoInicio: schema.date({format : 'yyyy-MM-dd'}, [ rules.after('today')]),
    periodoFin: schema.date({format : 'yyyy-MM-dd'}, [ rules.after('today')]),
  
    tipo: schema.enum(['departamento', 'municipio'] as const),
    departamento_id: schema.number.optional([
        rules.exists({ table: 'departamentos', column: 'id' }),
      ]),
    municipio_id: schema.number.optional([
        rules.exists({ table: 'municipios', column: 'id' }),
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
    'user_id.required': 'El ID del usuario es obligatorio',
    'user_id.exists': 'El ID del usuario no existe',
    'periodoInicio.required': 'El periodo de inicio es obligatorio',
    'periodoFin.required': 'El periodo de fin es obligatorio',
    'periodoInicio.after': 'El periodo de inicio debe ser una fecha futura',
    'periodoFin.after': 'El periodo de fin debe ser una fecha futura',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser "departamento" o "municipio"',
    'departamento_id.exists': 'El ID del departamento no existe',
    'municipio_id.exists': 'El ID del municipio no existe',
  }
}
