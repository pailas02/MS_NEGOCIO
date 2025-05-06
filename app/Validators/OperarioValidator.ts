import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioValidator {
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
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z0-9\s]+$/),
    ]),
    experiencia: schema.string([
      rules.unsigned(),
      rules.range(0, 100),
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
    'email.required': 'El email es obligatorio',
    'email.email': 'El email debe ser una dirección de correo electrónico válida',
    'email.maxLength': 'El email no puede tener más de 255 caracteres',
    'email.minLength': 'El email debe tener al menos 3 caracteres',
    'email.regex': 'El email no tiene un formato válido',
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres',
    'nombre.minLength': 'El nombre debe tener al menos 3 caracteres',
    'nombre.regex': 'El nombre solo puede contener letras, números y espacios',
    'experiencia.required': 'La experiencia es obligatoria',
    'experiencia.unsigned': 'La experiencia debe ser un número positivo',
    'experiencia.range': 'La experiencia debe estar entre 0 y 100',
    'experiencia.number': 'La experiencia debe ser un número',
  }
}
