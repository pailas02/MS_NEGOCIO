import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MaquinaCombo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idMaquina: number

  @column()
  public idCombo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
