import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraMunicipalValidator {
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
    obraId: schema.number([
      rules.exists({ table: 'obras', column: 'id' }),
    ]),
    municipioId: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
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
    'obraId.required': 'El ID de la obra es obligatorio',
    'obraId.exists': 'La obra seleccionada no existe',
    'obraId.number': 'El ID de la obra debe ser un número',
    'obraId.unsigned': 'El ID de la obra debe ser un número positivo',
    'municipioId.required': 'El ID del municipio es obligatorio',
    'municipioId.exists': 'El municipio seleccionado no existe',
    'municipioId.number': 'El ID del municipio debe ser un número',
    'municipioId.unsigned': 'El ID del municipio debe ser un número positivo',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'fechaInicio.date': 'La fecha de inicio debe ser una fecha válida',
    'fechaFin.date': 'La fecha de fin debe ser una fecha válida',
  }
}
