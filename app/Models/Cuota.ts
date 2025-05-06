import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Factura from './Factura'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_servicio: number
  @column()
  public monto: number
  @column()
  public estado: string
  
  @hasOne(() => Servicio, {
    foreignKey: 'servicioId',
  })
  public servicio: HasOne<typeof Servicio>

  @hasOne(() => Factura, {
    foreignKey: 'cuotaId',
  })
  public factura: HasOne<typeof Factura>

  @belongsTo(() => Servicio, {
    foreignKey: 'id_servicio',
  })
  public servicioId: BelongsTo<typeof Servicio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
