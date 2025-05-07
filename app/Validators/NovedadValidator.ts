import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NovedadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    turnoId: schema.number([
      rules.exists({ table: 'turnos', column: 'id' }),
    ]),

    tipo: schema.enum(['mantenimiento', 'reparacion'] as const),

    descripcion: schema.string({}, [
      rules.regex(/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ.,-]+$/),
    ]),

    evidencia: schema.string.optional({}, [
      rules.regex(/^[\w\-./]+$/),
    ]),

    estado: schema.string(),

    fecha: schema.date({
      format: 'yyyy-MM-dd',
    }),

    gravedad: schema.enum(['baja', 'media', 'alta'] as const),
  })

  public messages = {
    'turnoId.required': 'El id del turno es obligatorio',
    'turnoId.exists': 'El turno no existe',

    'tipo.enum': 'El tipo debe ser "mantenimiento" o "reparacion"',

    'descripcion.regex': 'La descripción solo puede contener letras, números y espacios',

    'evidencia.regex': 'La evidencia debe ser una ruta o nombre de archivo válido',

    'estado.required': 'El estado es obligatorio',

    'fecha.required': 'La fecha es obligatoria',
    'fecha.date': 'La fecha debe tener formato YYYY-MM-DD',

    'gravedad.enum': 'La gravedad debe ser "baja", "media" o "alta"',
  }
}
