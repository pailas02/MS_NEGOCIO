import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RepuestoProcedimientoMantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public repuestoId: number

  @column()
  public procedimientoMantenimientoId: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
