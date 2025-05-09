import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Poliza extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_operario' })
  public idOperario: number

  @column({ columnName: 'id_maquina' })
  public idMaquina: number

  @column({ columnName: 'id_seguro' })
  public idSeguro: number

  @column.dateTime({ columnName: 'fecha_inicio' })
  public fechaInicio: DateTime

  @column.dateTime({ columnName: 'fecha_fin' })
  public fechaFin: DateTime

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
