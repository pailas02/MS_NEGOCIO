import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GobernanteMunicipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gobernanteId: number
  @column()
  public municipioId: number
  @column()
  public fechaInicio: DateTime
  @column()
  public fechaFin: DateTime
  @column()
  public historico: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
