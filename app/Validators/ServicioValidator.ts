import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
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
    costo: schema.number([rules.required(), rules.range(0, 99999999)]), // Ejemplo de rango
    prioridad: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
    tipoServicio: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
    fechaInicio: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [rules.required(),]), 
    fechaFin: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [rules.required(), rules.afterField('fechaInicio')]), 
    estado: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
    ubicacion: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
    historico: schema.string.optional({ trim: true }), // Opcional

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
    'costo.required': 'El costo es requerido',
    'costo.range': 'El costo debe estar entre 0 y 99999999',
    'prioridad.required': 'La prioridad es requerida',
    'prioridad.maxLength': 'La prioridad no puede exceder los 255 caracteres',
    'tipoServicio.required': 'El tipo de servicio es requerido',
    'tipoServicio.maxLength': 'El tipo de servicio no puede exceder los 255 caracteres',
    'fechaInicio.required': 'La fecha de inicio es requerida',
    'fechaInicio.date.format': 'La fecha de inicio debe tener el formato yyyy-MM-dd HH:mm:ss',
    'fechaFin.required': 'La fecha de fin es requerida',
    'fechaFin.date.format': 'La fecha de fin debe tener el formato yyyy-MM-dd HH:mm:ss',
    'fechaFin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'estado.required': 'El estado es requerido',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres',
    'ubicacion.required': 'La ubicación es requerida',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 255 caracteres',
    // Mensaje para el campo historico
    // Puedes agregar más mensajes personalizados aquí
  }
}
