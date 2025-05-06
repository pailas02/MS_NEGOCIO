import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PolizaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idOperario: schema.number([
       rules.exists({ table: 'operarios', column: 'id' }),
       rules.unsigned()
    ]),
    idMaquina: schema.number([
       rules.exists({ table: 'maquinas', column: 'id' }),
       rules.unsigned()
    ]),
    idSeguro: schema.number([
       rules.exists({ table: 'seguros', column: 'id' }),
       rules.unsigned()
    ]),
    fechaInicio: schema.date({
      format: 'yyyy-MM-dd',
    }, [
       rules.required()
    ]),
    fechaFin: schema.date({
      format: 'yyyy-MM-dd',
    }, [
       rules.required()
    ]),
    estado: schema.enum(['activo', 'inactivo'] as const, [
       rules.required(),
    ]),
  })

  
  public messages: CustomMessages = {
    'idOperario.required': 'El id del operario es obligatorio',
    'idOperario.exists': 'El id del operario no existe',
    'idOperario.unsigned': 'El id del operario debe ser un número positivo',
    'idMaquina.required': 'El id de la máquina es obligatorio',
    'idMaquina.exists': 'El id de la máquina no existe',
    'idMaquina.unsigned': 'El id de la máquina debe ser un número positivo',
    'idSeguro.required': 'El id del seguro es obligatorio',
    'idSeguro.exists': 'El id del seguro no existe',
    'idSeguro.unsigned': 'El id del seguro debe ser un número positivo',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'estado.required': 'El estado es obligatorio',
    'estado.enum': 'El estado debe ser "activo" o "inactivo"',
  }
}
