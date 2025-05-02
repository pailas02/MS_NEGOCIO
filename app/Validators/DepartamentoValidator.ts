import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-zA-Z\s]+$/),
    ]),
})

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del departamento es obligatorio',
    'nombre.minLength': 'El nombre del departamento debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre del departamento no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre del departamento solo puede contener letras y espacios',
  }
}
