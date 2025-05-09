import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({}, [
      rules.required()
    ]),

    tipo: schema.enum(['departamento', 'municipio'] as const),

    periodoInicio: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.required()
    ]),

    periodoFin: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.required()
    ]),

    territorio: schema.object.optional().members({
      departamento_id: schema.number.optional([
        rules.exists({ table: 'departamentos', column: 'id' })
      ])
      // municipio_id NO se valida aquí porque no se asigna en este punto
    }),
  })

  public messages: CustomMessages = {
    'user_id.required': 'El campo user_id es obligatorio',
    'tipo.required': 'El campo tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser "departamento" o "municipio"',
    'periodoInicio.required': 'La fecha de inicio es obligatoria',
    'periodoFin.required': 'La fecha de fin es obligatoria',
    'territorio.departamento_id.exists': 'El departamento indicado no existe',
  }
}
