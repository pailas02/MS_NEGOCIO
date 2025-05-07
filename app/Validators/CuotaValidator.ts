import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({ 
    servicio_id: schema.number([
      rules.required(),
      rules.range(1, 99999999)
    ]),
    monto: schema.number([
      rules.required(),
      rules.range(0, 99999999)
    ]),
    estado: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
  })
  

  public messages: CustomMessages = { 
    'servicio_id.required': 'El servicio es obligatorio',
    'servicio_id.number': 'El servicio debe ser un número',
    'servicio_id.range': 'El ID de servicio debe estar entre 1 y 99999999',
    'monto.required': 'El monto es obligatorio',
    'monto.number': 'El monto debe ser un número',
    'monto.range': 'El monto debe estar entre 0 y 99999999',
    'estado.required': 'El estado es obligatorio',
    'estado.string': 'El estado debe ser una cadena de texto',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres',
  }
}
