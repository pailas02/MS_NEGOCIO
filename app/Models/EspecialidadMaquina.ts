import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EspecialidadMaquina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipoServicioId: number
  @column()
  public maquinaId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
