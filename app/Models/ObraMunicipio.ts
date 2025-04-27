import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ObraMunicipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public obraId: number

  @column()
  public municipioId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
