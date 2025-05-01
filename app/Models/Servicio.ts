import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Combo from './Combo'
import Cuota from './Cuota'
import Evidancia from './Evidancia'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public costo: number
  @column()
  public prioridad: string
  @column()
  public tipoServicio: string
  @column()
  public fechaInicio: string
  @column()
  public fechaFin: string
  @column()
  public estado: string
  @column()
  public ubicacion: string
  @column()
  public historico: string

  @hasOne(() => Combo, {
    foreignKey: 'comboId', 
  })
  public combo: HasOne<typeof Combo>

  @belongsTo(() => Cuota, {
    foreignKey: 'cuotaId', 
  })
  public cuota: BelongsTo<typeof Cuota>

  @belongsTo(() => Evidancia, {
    foreignKey: 'evidenciaId',
  })
  public evidencia: BelongsTo<typeof Evidancia>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
