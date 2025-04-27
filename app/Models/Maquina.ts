import { DateTime } from 'luxon'
import { BaseModel,  column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Mantenimiento from './Mantenimiento'
export default class Maquina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo: string
  @column()
  public ubicacion: string
  @column()
  public estado: string

  @hasOne(() => Mantenimiento, {
    foreignKey: 'maquinaId',
  })
  public mantenimiento: HasOne<typeof Mantenimiento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
