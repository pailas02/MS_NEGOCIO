import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    user_id: schema.string({ trim: true }),
    experiencia: schema.string({ trim: true }, [
      rules.regex(/^[a-zA-Z0-9\s.,-]*$/)
    ]),
  })

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio',
    'user_id.unique': 'El campo user_id debe ser único',
    'experiencia.required': 'El campo experiencia es obligatorio',
    'experiencia.regex': 'El campo experiencia solo puede contener letras, números, espacio, punto, coma y guion',
  }
  
}
