import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaValidator {
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
    marca: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),
    modelo: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),
    estado: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
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
    'nombre.required': 'El nombre de la máquina es obligatorio',
    'nombre.minLength': 'El nombre de la máquina debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre de la máquina no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre de la máquina solo puede contener letras y espacios',
    'tipo.required': 'El tipo de máquina es obligatorio',
    'tipo.minLength': 'El tipo de máquina debe tener al menos 3 caracteres',
    'tipo.maxLength': 'El tipo de máquina no puede exceder los 50 caracteres',
    'marca.minLength': 'La marca debe tener al menos 3 caracteres',
    'marca.maxLength': 'La marca no puede exceder los 50 caracteres',
    'modelo.minLength': 'El modelo debe tener al menos 3 caracteres',
    'modelo.maxLength': 'El modelo no puede exceder los 50 caracteres',
  }
}
