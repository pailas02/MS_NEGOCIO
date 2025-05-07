import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateGobernanteValidator {
  public schema = schema.create({
    user_id: schema.string({}, []),

    periodoInicio: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Formato YYYY-MM-DD
    ]),

    periodoFin: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/),
    ]),

    tipo: schema.enum(['municipio', 'departamento'] as const),

    territorio: schema.object().members({
      municipio_id: schema.number.optional(),
      departamento_id: schema.number.optional(),
    }),
  })

  public messages = {
    'user_id.required': 'El ID de usuario es obligatorio',
    'user_id.uuid': 'El ID de usuario debe ser un UUID válido',
    'periodoInicio.required': 'El periodo de inicio es obligatorio',
    'periodoInicio.regex': 'El periodo de inicio debe estar en formato YYYY-MM-DD',
    'periodoFin.required': 'El periodo de fin es obligatorio',
    'periodoFin.regex': 'El periodo de fin debe estar en formato YYYY-MM-DD',
    'tipo.enum': 'El tipo debe ser "municipio" o "departamento"',
  }
}
