import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class ProcedimientoMantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mantenimientoId: number
  @column()
  public procedimientoId: number
  @column()
  public estado: string
  @column()
  public observaciones: string
  @column.date()
 public fecha: DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
