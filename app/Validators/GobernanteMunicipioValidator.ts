import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteMunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    gobernanteId: schema.number([
      rules.exists({ table: 'gobernantes', column: 'id' }),
      rules.unsigned(),
    ]),

    municipioId: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }),
      rules.unsigned(),
    ]),

    fechaInicio: schema.date({ format: 'yyyy-MM-dd' }),

    fechaFin: schema.date({ format: 'yyyy-MM-dd' }, [
      rules.afterField('fechaInicio'),
    ]),
  })

  public messages = {
    'gobernanteId.required': 'El ID del gobernante es obligatorio',
    'gobernanteId.exists': 'El gobernante no existe',
    'municipioId.required': 'El ID del municipio es obligatorio',
    'municipioId.exists': 'El municipio no existe',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'fechaFin.afterField': 'La fecha de fin debe ser posterior a la de inicio',
  }
}
