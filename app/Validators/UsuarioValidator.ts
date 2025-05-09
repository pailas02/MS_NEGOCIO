import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({ trim: true }, [
      rules.required()
    ]),
    nombre: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(100)
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.maxLength(255)
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(50)
    ]),
  })

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio',
    'nombre.required': 'El nombre es obligatorio',
    'nombre.minLength': 'El nombre debe tener mínimo 3 caracteres',
    'email.required': 'El correo es obligatorio',
    'email.email': 'Debe proporcionar un correo válido',
    'password.required': 'La contraseña es obligatoria',
    'password.minLength': 'La contraseña debe tener mínimo 6 caracteres',
  }
}
