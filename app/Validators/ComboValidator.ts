import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboValidator {
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
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.string': 'La descripción debe ser una cadena de texto',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
    'maquinas.required': 'Las máquinas son obligatorias',
    'maquinas.array': 'Las máquinas deben ser un arreglo',
    'maquinas.*.number': 'Cada máquina debe ser un número',
    'maquinas.*.exists': 'Una o más máquinas seleccionadas no existen',
  }
}
