import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno'

export default class NovedadValidator {
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
    turnoId: schema.number([
      rules.exists({ table: 'turnos', column: 'id' }),
      rules.unsigned(),
    ]),
    tipo: schema.enum(['mantenimiento', 'reparacion'] as const, [
      rules.required(),
    ]),
    descripcion: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.regex(/^[a-zA-Z0-9\s]+$/),
    ]),
    evidencia: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.regex(/^[a-zA-Z0-9\s]+$/),
    ]),
    estado: schema.enum(['pendiente', 'en_progreso', 'completada'] as const, [
      rules.required(),
    ]),
    fecha: schema.date.optional( { format: 'yyyy-MM-dd' }, [
      rules.required(),
    ]),
    gravedad: schema.enum(['baja', 'media', 'alta'] as const, [
      rules.required(),
    ]),
    Turno: schema.object().members({
      id: schema.number([
        rules.exists({ table: 'turnos', column: 'id' }),
        rules.unsigned(),
      ]),
  })
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
    'turnoId.required': 'El id del turno es obligatorio',
    'turnoId.exists': 'El id del turno no existe',
    'turnoId.unsigned': 'El id del turno debe ser un número positivo',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser "mantenimiento" o "reparacion"',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede tener más de 255 caracteres',
    'descripcion.regex': 'La descripción solo puede contener letras, números y espacios,',
    'evidencia.minLength': 'La evidencia debe tener al menos 3 caracteres',
  } 
}
