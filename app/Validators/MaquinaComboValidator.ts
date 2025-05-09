import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaComboValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idMaquina: schema.number([rules.exists({ table: 'maquinas', column: 'id' })]),
    idCombo: schema.number([rules.exists({ table: 'combos', column: 'id' })]),
  })

  public messages: CustomMessages = {
    'idMaquina.required': 'El campo idMaquina es obligatorio',
    'idMaquina.exists': 'La máquina no existe',
    'idCombo.required': 'El campo idCombo es obligatorio',
    'idCombo.exists': 'El combo no existe',
  }
}
