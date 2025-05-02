import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Poliza extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idOperario: number
  @column()
  public idMaquina: number
  @column()
  public idSeguro: number
  @column.dateTime()
  public fechaInicio: DateTime
  @column.dateTime()
  public fechaFin: DateTime
  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
