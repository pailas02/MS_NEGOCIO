import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
  titulo: schema.string({ trim: true }, [
    rules.maxLength(255),
    rules.minLength(3),
    rules.regex(/^[a-zA-Z0-9\s]+$/),
  ]),
  tipo: schema.enum(['publico', 'privado'] as const, [
    rules.required(),
  ]),


  })

  public messages: CustomMessages = {
    'titulo.required': 'El título es obligatorio',
    'titulo.maxLength': 'El título no puede tener más de 255 caracteres',
    'titulo.minLength': 'El título debe tener al menos 3 caracteres',
    'titulo.regex': 'El título solo puede contener letras, números y espacios',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser "publico" o "privado"',
  }
}
