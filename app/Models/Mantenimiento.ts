import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime
  @column()
  public estado: string
  
  @hasMany(() => Maquina, {
    foreignKey: 'maquinaId',
  })
  public maquinas: HasMany<typeof Maquina>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
