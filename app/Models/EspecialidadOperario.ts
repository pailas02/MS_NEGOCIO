import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EspecialidadOperario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column ()
  public especialidadId:number

  @column ()
  public operarioId:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
