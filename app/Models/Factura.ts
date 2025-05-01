import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto: number

  @column()
  public estado: string
  
  
  @column.date()
  public fechaPago: DateTime | null

 
  @belongsTo(() => Cuota)
  public cuota: BelongsTo<typeof Cuota>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
