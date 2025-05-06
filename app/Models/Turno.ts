import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Novedad from './Novedad'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public maquinaId: number
  @column()
  public operarioId: number
  @column() 
  public estado: string
  @column.dateTime()
  public fechaInicio: DateTime
  @column.dateTime()
  public fechaFin: DateTime

  @belongsTo(() => Novedad, {
    foreignKey: 'turnoId',
  })
  public novedad: BelongsTo<typeof Novedad>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
