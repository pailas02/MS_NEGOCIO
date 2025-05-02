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
    Municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
      rules.unsigned(),
    ]),
    Gobernante_id: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
      rules.unsigned(),
    ]),
    fecha_inicio: schema.date({ format: 'yyyy-MM-dd' }, [
    ]),
    fecha_fin: schema.date({ format: 'yyyy-MM-dd' }, [
    ]),
    historico: schema.boolean.optional(),
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
    'Municipio_id.required': 'El ID del municipio es obligatorio',
    'Municipio_id.exists': 'El ID del municipio no existe',
    'Gobernante_id.required': 'El ID del gobernante es obligatorio',
    'Gobernante_id.exists': 'El ID del gobernante no existe',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'historico.boolean': 'El campo historico debe ser verdadero o falso',
    'Gobernante_id.unsigned': 'El ID del gobernante debe ser un número positivo',
    'Municipio_id.unsigned': 'El ID del municipio debe ser un número positivo',
  }
}
