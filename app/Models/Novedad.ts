import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column,  HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno'
import Evidancia from './Evidancia'

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
  public evidencia: string
  @column()
  public estado: string
  @column()
  public fecha: DateTime
  @column()
  public gravedad: string

  @hasOne(() => Turno, {
    foreignKey: 'turnoId',
  })
  public turno: HasOne<typeof Turno>

  @belongsTo(() => Evidancia, {
    foreignKey: 'evidencia',
  })
  public evidencias: BelongsTo<typeof Evidancia>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
