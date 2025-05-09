import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class FacturaValidator {
  public schema = schema.create({
    detalle: schema.string({}, [
      rules.maxLength(255)
    ]),

    id_cuota: schema.number([
      rules.exists({ table: 'cuotas', column: 'id' })
    ]),

    fechaPago: schema.date.optional({
      format: 'yyyy-MM-dd'
    }),
  })

  public messages: CustomMessages = {
    'detalle.required': 'El detalle es obligatorio',
    'detalle.maxLength': 'El detalle no puede superar los 255 caracteres',
    'id_cuota.required': 'La cuota es obligatoria',
    'id_cuota.exists': 'La cuota no existe',
    'fechaPago.date': 'La fecha de pago debe ser una fecha válida con formato yyyy-MM-dd',
  }
}
