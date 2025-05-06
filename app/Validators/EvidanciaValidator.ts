import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidanciaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    contenido: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    tipo: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    //ServicioId OBIGATORIO
    servicioId: schema.number([
      rules.required(),
      rules.range(1, 99999999),
      rules.exists({ table: 'servicios', column: 'id' }),
    ]),
    novedad_id: schema.number([
      rules.exists({ table: 'novedades', column: 'id' })
    ])



  })

  public messages: CustomMessages = {
    'contenido.required': 'El contenido es obligatorio',
    'contenido.string': 'El contenido debe ser una cadena de texto',
    'contenido.maxLength': 'El contenido no puede exceder los 255 caracteres',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.string': 'El tipo debe ser una cadena de texto',
    'tipo.maxLength': 'El tipo no puede exceder los 255 caracteres',
    'servicioId.required': 'El servicio es obligatorio',
    'servicioId.number': 'El servicio debe ser un número',
    'servicioId.range': 'El servicio debe estar entre 1 y 99999999',
    'NovedadId.required': 'La novedad es obligatoria',
    'NovedadId.number': 'La novedad debe ser un número',
    'NovedadId.range': 'La novedad debe estar entre 1 y 99999999',
    'NovedadId.exists': 'La novedad seleccionada no existe',
  }
}
