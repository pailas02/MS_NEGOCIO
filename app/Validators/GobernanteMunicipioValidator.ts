import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class GobernanteMunicipioValidator {
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
    GobernanteId: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
    ]),
    municipioId: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    fechaInicio: schema.date({
      format: 'yyyy-MM-dd',
    }),
    fechaFin: schema.date({
      format: 'yyyy-MM-dd',
    }),
    fechafin: schema.date({
      format: 'yyyy-MM-dd',
    }),
    historico: schema.string.optional([
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
    'GobernanteId.required': 'El ID del gobernante es obligatorio',
    'GobernanteId.exists': 'El ID del gobernante no existe',
    'municipioId.required': 'El ID del municipio es obligatorio',
    'municipioId.exists': 'El ID del municipio no existe',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaInicio.dateFormat': 'La fecha de inicio debe tener el formato YYYY-MM-DD',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'fechaFin.dateFormat': 'La fecha de fin debe tener el formato YYYY-MM-DD',
    'historico.string': 'El campo historico debe ser una cadena de texto',
    // Agrega más mensajes personalizados según sea necesario
   }
}
