import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreProcedimientoMantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operario_id: schema.number([
      // rules.exists({ table: 'operarios', column: 'id' }),
      rules.exists({
        table: 'operarios',
        column: 'id',
        where: {
          estado: 'activo',
        },
      }),
    ]),
    repuestos: schema.array().members(
      schema.object().members({
        id: schema.number([
          rules.exists({ table: 'repuestos', column: 'id' }),
          rules.exists({
            table: 'repuestos',
            column: 'id',
            where: {
              estado: 'activo',
            },
          }),
        ]),
        cantidad: schema.number(),
      })
    ),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del procedimiento es requerido.',
    'nombre.string': 'El nombre del procedimiento debe ser una cadena de texto.',
    'operario_id.required': 'El campo operario_id es requerido',
    'operario_id.exists': 'El operario no existe o no está activo',
    'repuestos.required': 'El campo repuestos es requerido',
    'repuestos.*.id.required': 'El campo id es requerido',
    'repuestos.*.id.exists': 'El repuesto no existe o no está activo',
    'repuestos.*.cantidad.required': 'El campo cantidad es requerido',
    'repuestos.*.cantidad.number': 'La cantidad debe ser un número',
  }
     
}
