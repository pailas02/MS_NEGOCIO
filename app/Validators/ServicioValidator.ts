import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServicioValidator {
  public schema = schema.create({
    costo: schema.number([
      rules.unsigned(),
    ]),
    prioridad: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    tipoServicio: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    fechaInicio: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    fechaFin: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    estado: schema.string({ trim: true }, [
      rules.maxLength(50),
    ]),
    ubicacion: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    historico: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    comboId: schema.number([
      rules.exists({ table: 'combos', column: 'id' }),
    ]),
  })

  public messages = {
    'costo.required': 'El costo es obligatorio',
    'prioridad.required': 'La prioridad es obligatoria',
    'tipoServicio.required': 'El tipo de servicio es obligatorio',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'estado.required': 'El estado es obligatorio',
    'ubicacion.required': 'La ubicación es obligatoria',
    'historico.required': 'El histórico es obligatorio',
    'comboId.exists': 'El combo especificado no existe',
  }
}
