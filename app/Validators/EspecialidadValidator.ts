import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.minLength(3),
      rules.regex(/^[a-zA-ZÀ-ÿñÑ0-9\s\-]+$/), // permite letras con tilde, ñ, números, espacios y guiones
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
      rules.minLength(3),
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede tener más de 255 caracteres',
    'nombre.minLength': 'El nombre debe tener al menos 3 caracteres',
    'nombre.regex': 'El nombre solo puede contener letras, números, espacios y guiones',
    'descripcion.maxLength': 'La descripción no puede tener más de 500 caracteres',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
  }
}
