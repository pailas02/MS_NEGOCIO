import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'

export default class Gps extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitud: number
  @column()
  public longitud: number
  
  @belongsTo(() => Maquina, {
    foreignKey: 'maquinaId', // Foreign key on the Gp table
  })
  public maquina: BelongsTo<typeof Maquina>
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
