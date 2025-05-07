import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenciaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contenido: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    tipo: schema.enum(['imagen', 'video', 'documento'] as const),
  })

  public messages = {
    'contenido.required': 'El contenido es obligatorio',
    'contenido.minLength': 'El contenido debe tener mínimo 3 caracteres',
    'contenido.maxLength': 'El contenido debe tener máximo 255 caracteres',

    'tipo.required': 'El tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser "imagen", "video" o "documento"',
  }
}
