import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import Usuario from './Usuario'

export default class Mensaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public mensaje: string
  @column()
  public fecha: DateTime
 
  @hasOne(() => Usuario, {
    foreignKey: 'idUsuario',
  })
  public usuario: HasOne<typeof Usuario>

  @hasOne(() => Chat, {
    foreignKey: 'idChat',
  })
  public chats: HasOne<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
