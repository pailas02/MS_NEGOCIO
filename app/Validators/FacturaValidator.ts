import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
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
    monto: schema.number([
      rules.required(),
      rules.range(0, 99999999),
    ]),
    estado: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    fechaPago: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
      rules.required()
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
    'monto.required': 'El monto es obligatorio',
    'monto.number': 'El monto debe ser un número',
    'monto.range': 'El monto debe estar entre 0 y 99999999',
    'estado.required': 'El estado es obligatorio',
    'estado.string': 'El estado debe ser una cadena de texto',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres',
    'fechaPago.required': 'La fecha de pago es obligatoria',
    'fechaPago.date': 'La fecha de pago debe ser una fecha válida',
    'fechaPago.format': 'El formato de la fecha de pago no es válido. Debe ser "yyyy-MM-dd HH:mm:ss"',
  }
}
