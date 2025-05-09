import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({ trim: true }, [
      rules.required(),
    ]),
    experiencia: schema.string({ trim: true }, [
      rules.required(),
      rules.regex(/^[a-zA-Z0-9\s.,-]*$/),
    ]),
  })

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio',
    'experiencia.required': 'El campo experiencia es obligatorio',
    'experiencia.regex': 'Solo se permiten letras, números, espacios, puntos, comas y guiones en experiencia',
  }
}
