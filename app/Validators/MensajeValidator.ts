import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MensajeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // Define el esquema de validación
    // para el campo "fecha" como una fecha
    // y aplica las reglas de validación
    fecha: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.required()
    ]),
    idChat: schema.number([
      rules.exists({ table: 'chats', column: 'id' }),
      rules.unsigned()
    ]),
    idUsuario: schema.string([
      rules.exists({ table: 'usuarios', column: 'id' }),
      rules.unsigned()]
    ),
    mensaje: schema.string({ trim: true }, [
       rules.maxLength(999),
       rules.minLength(1),
    ]),

  })

  public messages: CustomMessages = {
    'fecha.required': 'La fecha es obligatoria',
    'idChat.required': 'El id del chat es obligatorio',
    'idUsuario.required': 'El id del usuario es obligatorio',
    'mensaje.required': 'El mensaje es obligatorio',
    'mensaje.maxLength': 'El mensaje no puede tener más de 999 caracteres',
    'mensaje.minLength': 'El mensaje no puede estar vacío',
    'idChat.exists': 'El id del chat no existe',
    'idUsuario.exists': 'El id del usuario no existe',
    'idChat.unsigned': 'El id del chat debe ser un número positivo',
    'idUsuario.unsigned': 'El id del usuario debe ser un número positivo'
  }
}
