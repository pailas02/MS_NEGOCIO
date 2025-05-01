import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Mensaje from './Mensaje'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string
  @column()
  public tipo: string

  @belongsTo(() => Mensaje, {
    foreignKey: 'idMensaje',
  })
  public mensajes: BelongsTo<typeof Mensaje>  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
