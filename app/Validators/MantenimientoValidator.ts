import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MantenimientoValidator {
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
    maquinaId: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    fechaMantenimiento: schema.date(),
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
    'obraId.required': 'El ID de la obra es obligatorio',
    'obraId.exists': 'La obra seleccionada no existe',
    'obraId.number': 'El ID de la obra debe ser un número',
    'obraId.unsigned': 'El ID de la obra debe ser un número positivo',
    'maquinaId.required': 'El ID de la máquina es obligatorio',
    'maquinaId.exists': 'La máquina seleccionada no existe',
    'maquinaId.number': 'El ID de la máquina debe ser un número',
    'maquinaId.unsigned': 'El ID de la máquina debe ser un número positivo',
    'fechaMantenimiento.required': 'La fecha de mantenimiento es obligatoria',
    'fechaMantenimiento.date': 'La fecha de mantenimiento debe ser una fecha válida',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 255 caracteres',
  }
}
