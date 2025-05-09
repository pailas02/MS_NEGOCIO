import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class PolizaValidator {
  public schema = schema.create({
    idOperario: schema.number.optional([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    idMaquina: schema.number.optional([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    idSeguro: schema.number([
      rules.exists({ table: 'seguros', column: 'id' }),
    ]),
    fechaInicio: schema.date(),
    fechaFin: schema.date(),
    estado: schema.string(),
  })

  public messages: CustomMessages = {
    'idOperario.exists': 'El operario no existe',
    'idMaquina.exists': 'La máquina no existe',
    'idSeguro.exists': 'El seguro no existe',
    'estado.required': 'El estado es obligatorio',
  }
}
