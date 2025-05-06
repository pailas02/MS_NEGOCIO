import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class TurnoValidator {
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
    maquinaId: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
      rules.unsigned(),
    ]),
    operarioId: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
      rules.unsigned(),
    ]),
    estado: schema.enum(['activo', 'inactivo'] as const, [
      rules.required(),
    ]),
    fechaInicio: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.required(),
    ]),
    fechaFin: schema.date({
      format: 'yyyy-MM-dd',
    }, [
      rules.required(),
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
    'MaquinaId.required': 'El id de la máquina es obligatorio',
    'MaquinaId.exists': 'El id de la máquina no existe',
    'MaquinaId.unsigned': 'El id de la máquina debe ser un número positivo',
    'operarioId.required': 'El id del operario es obligatorio',
    'operarioId.exists': 'El id del operario no existe',
    'operarioId.unsigned': 'El id del operario debe ser un número positivo',
    'estado.required': 'El estado es obligatorio',
    'estado.enum': 'El estado debe ser "activo" o "inactivo"',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
  }
}
