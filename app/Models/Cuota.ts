import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Factura from './Factura'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto: number

  @column()
  public estado: string
  @column()
public servicio_id: number

@belongsTo(() => Servicio, {
  foreignKey: 'servicio_id',
})
public servicio: BelongsTo<typeof Servicio>

  

  @belongsTo(() => Factura, {
    foreignKey: 'cuota_id',
  })
  public factura: BelongsTo<typeof Factura>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
