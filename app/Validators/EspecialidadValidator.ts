import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadValidator {
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
      rules.maxLength(255),
      rules.minLength(3),
      rules.regex(/^[a-zA-Z0-9\s]+$/),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
      rules.minLength(3),
    ]),
    OperarioId: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
      rules.unsigned(),
    ]),
  })

  

  public messages: CustomMessages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres',
    'nombre.minLength': 'El nombre debe tener al menos 3 caracteres',
    'nombre.regex': 'El nombre solo puede contener letras y espacios',
    'descripcion.maxLength': 'La descripción no puede tener más de 500 caracteres',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'OperarioId.required': 'El id del operario es obligatorio',
    'OperarioId.exists': 'El id del operario no existe',
    'OperarioId.unsigned': 'El id del operario debe ser un número positivo',
  }
}


