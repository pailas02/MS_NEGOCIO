import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MensajeValidator {
  public schema = schema.create({
    contenido: schema.string({ trim: true }, [
      rules.maxLength(1000)
    ]),
    fecha: schema.date.optional({ format: 'yyyy-MM-dd HH:mm:ss' }),

    // Acepta IDs como "1", "12", "abc123", etc.
    usuarioId: schema.string({}, [
      rules.trim()
    ]),

    chatId: schema.string({}, [
      rules.trim()
    ])
  })

  public messages = {
    'contenido.required': 'El contenido es obligatorio',
    'contenido.maxLength': 'El contenido no puede superar los 1000 caracteres',
    'usuarioId.required': 'El ID del usuario es obligatorio',
    'chatId.required': 'El ID del chat es obligatorio',
  }
}
