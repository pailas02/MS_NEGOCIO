import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProcedimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-zA-Z\s]+$/),
    ]),
    descripcion: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ])
  })


  public messages: CustomMessages = {
    'nombre.required': 'El nombre es obligatorio',
    'nombre.minLength': 'El nombre debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre no puede tener más de 50 caracteres',
    'nombre.regex': 'El nombre solo puede contener letras y espacios',
    'descripcion.minLength': 'La descripción debe tener al menos 3 caracteres',
    'descripcion.maxLength': 'La descripción no puede tener más de 255 caracteres',
    'descripcion.required': 'La descripción es obligatoria'
  }
}
