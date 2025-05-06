import { DateTime } from 'luxon'
import { BaseModel,  column } from '@ioc:Adonis/Lucid/Orm'
export default class Gps extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitud: String
  
  @column()
  public longitud: String

  @column()
  public maquina_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
