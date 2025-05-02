import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.regex(/^[a-zA-Z\s]+$/),
    ]),
    departamentoId: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' }),
    ]),
  })


  public messages: CustomMessages = {
    'nombre.required': 'El nombre del municipio es obligatorio',
    'nombre.minLength': 'El nombre del municipio debe tener al menos 3 caracteres',
    'nombre.maxLength': 'El nombre del municipio no puede exceder los 50 caracteres',
    'nombre.regex': 'El nombre del municipio solo puede contener letras y espacios',
    'departamentoId.required': 'El ID del departamento es obligatorio',
    'departamentoId.exists': 'El departamento seleccionado no existe',
    'departamentoId.number': 'El ID del departamento debe ser un número',
    'departamentoId.unsigned': 'El ID del departamento debe ser un número positivo',
  }
}
