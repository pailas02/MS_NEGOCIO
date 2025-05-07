import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'
import Procedimiento from './Procedimiento'

export default class Mantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public fecha: DateTime

  @column()
  public estado: string

  @column({ columnName: 'maquina_id' })
  public maquinaId: number

  @belongsTo(() => Maquina)
  public maquina: BelongsTo<typeof Maquina>

  @manyToMany(() => Procedimiento, {
    pivotTable: 'mantenimiento_procedimiento',
    pivotForeignKey: 'mantenimiento_id',
    pivotRelatedForeignKey: 'procedimiento_id',
  })
  public procedimientos: ManyToMany<typeof Procedimiento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
