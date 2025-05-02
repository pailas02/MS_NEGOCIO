import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'
import Servicio from './Servicio'

export default class Combo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @manyToMany(() => Maquina, {
    pivotTable: 'combo_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'combo_id',
    pivotRelatedForeignKey: 'maquina_id',
  })
  public maquinas: ManyToMany<typeof Maquina>

  @belongsTo(() => Servicio, {
    foreignKey: 'servicioId', // Foreign key on the Combo table
  })
  public servicio: BelongsTo<typeof Servicio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
