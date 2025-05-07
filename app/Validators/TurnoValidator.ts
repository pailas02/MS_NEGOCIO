import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    maquinaId: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
      rules.unsigned(),
    ]),

    operarioId: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
      rules.unsigned(),
    ]),

    estado: schema.enum(['activo', 'inactivo'] as const, [
      rules.required(),
    ]),

    fechaInicio: schema.date(
      { format: 'yyyy-MM-dd' },
      [rules.required()]
    ),

    fechaFin: schema.date(
      { format: 'yyyy-MM-dd' },
      [rules.required()]
    ),
  })

  public messages: CustomMessages = {
    'maquinaId.required': 'El id de la máquina es obligatorio',
    'maquinaId.exists': 'El id de la máquina no existe',
    'maquinaId.unsigned': 'El id de la máquina debe ser un número positivo',

    'operarioId.required': 'El id del operario es obligatorio',
    'operarioId.exists': 'El id del operario no existe',
    'operarioId.unsigned': 'El id del operario debe ser un número positivo',

    'estado.required': 'El estado es obligatorio',
    'estado.enum': 'El estado debe ser "activo" o "inactivo"',

    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
  }
}
