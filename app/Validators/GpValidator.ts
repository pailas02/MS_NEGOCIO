import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpValidator {
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
    latitud: schema.string([
      rules.required(),
      rules.regex(/^\d+(\.\d+)?$/), // Validar que sea un número decimal
      rules.minLength(1),
      rules.maxLength(20),
    ]),
    longitud: schema.string([
      rules.required(),
      rules.regex(/^\d+(\.\d+)?$/), // Validar que sea un número decimal
      rules.minLength(1),
      rules.maxLength(20),
    ]),
    maquinaId: schema.number([
      rules.required(),
      rules.exists({ table: 'maquinas', column: 'id' }), // Validar que la máquina exista
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
    'nombre.required': 'El nombre del GP es obligatorio',
    'nombre.minLength': 'El nombre del GP debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre del GP no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre del GP solo puede contener letras y espacios',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fechaa de fin es obligatoria',
  }
}
