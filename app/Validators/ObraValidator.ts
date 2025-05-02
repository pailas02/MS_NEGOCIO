import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObraValidator {
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
    nombre: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-zA-Z\s]+$/),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
    gobernanteId: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
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
    'nombre.required': 'El nombre de la obra es obligatorio',
    'nombre.minLength': 'El nombre de la obra debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre de la obra no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre de la obra solo puede contener letras y espacios',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
  }
}
