import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'
import Procedimiento from './Procedimiento'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: DateTime
  @column()
  public estado: string

  @hasOne(() => Maquina, {
    foreignKey: 'mantenimientoId',
  })
  public maquina: HasOne<typeof Maquina>

  @manyToMany(() => Procedimiento, {
    pivotTable: 'mantenimiento_procedimiento',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'mantenimiento_id',
    pivotRelatedForeignKey: 'procedimiento_id',
  })
  public procedimientos: ManyToMany<typeof Procedimiento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
