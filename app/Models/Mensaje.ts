// app/Models/Mensaje.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Chat from './Chat'

export default class Mensaje extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contenido: string // Cambiado de 'mensaje' a 'contenido' para más claridad

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd HH:mm:ss')
  })
  public fecha: DateTime // Ahora es auto-generado

  // Relaciones (nombres más estándar)
  @column({ columnName: 'idUsuario' })
  public usuarioId: number

  @column({ columnName: 'idChat' })
  public chatId: number

  @belongsTo(() => Usuario, {
    foreignKey: 'usuarioId',
    localKey: 'id'
  })
  public usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Chat, {
    foreignKey: 'chatId',
    localKey: 'id'
  })
  public chat: BelongsTo<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}