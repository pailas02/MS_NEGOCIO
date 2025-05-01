import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Mantenimiento from './Mantenimiento'

export default class Procedimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  @column()
  public descripcion: string

  @manyToMany(() => Mantenimiento, {
    pivotTable: 'mantenimiento_procedimiento',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'procedimiento_id',
    pivotRelatedForeignKey: 'mantenimiento_id',
  })
  public mantenimientos: ManyToMany<typeof Mantenimiento>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
