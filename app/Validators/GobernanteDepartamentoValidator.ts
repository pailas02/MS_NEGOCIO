import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteDepartamentoValidator {
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
    departamento_id: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' }),
      rules.unsigned(),
    ]),
    gobernante_id: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
      rules.unsigned(),
    ]),
    fecha_inicio: schema.date({ format: 'yyyy-MM-dd' }, []),
    fecha_fin: schema.date({ format: 'yyyy-MM-dd' }, []),
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
    'departamento_id.required': 'El ID del departamento es obligatorio',
    'departamento_id.exists': 'El ID del departamento no existe',
    'departamento_id.unsigned': 'El ID del departamento debe ser un número positivo',
    'gobernante_id.required': 'El ID del gobernante es obligatorio',
    'gobernante_id.exists': 'El ID del gobernante no existe',
    'gobernante_id.unsigned': 'El ID del gobernante debe ser un número positivo',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'historico.boolean': 'El campo historico debe ser verdadero o falso',
  }
}
