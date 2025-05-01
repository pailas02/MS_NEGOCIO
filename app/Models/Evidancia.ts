import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Novedad from './Novedad'

export default class Evidancia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contenido: string
  @column()
  public tipo: string

  @hasOne(() => Servicio, {
    foreignKey: 'servicioId',
  })
  public servicio: HasOne<typeof Servicio>

  @hasOne(() => Novedad, {
    foreignKey: 'novedadId',
  })
  public novedad: HasOne<typeof Novedad> 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
