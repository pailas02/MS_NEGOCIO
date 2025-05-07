import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno'

export default class Novedad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public turnoId: number

  @column()
  public tipo: string

  @column()
  public descripcion: string

  @column()
  public evidencia: string // solo texto/ruta

  @column()
  public estado: string

  @column.date()
  public fecha: DateTime

  @column()
  public gravedad: string

  @hasOne(() => Turno, {
    foreignKey: 'turnoId',
  })
  public turno: HasOne<typeof Turno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
