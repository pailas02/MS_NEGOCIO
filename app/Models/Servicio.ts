import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Combo from './Combo'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public costo: number

  @column()
  public prioridad: string

  @column()
  public tipoServicio: string

  @column.dateTime()
  public fechaInicio: DateTime

  @column.dateTime()
  public fechaFin: DateTime

  @column()
  public estado: string

  @column()
  public ubicacion: string

  @column()
  public historico: string

  @column()
  public comboId: number

  @belongsTo(() => Combo)
  public combo: BelongsTo<typeof Combo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
