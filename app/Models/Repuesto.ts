import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProcedimientoMantenimiento from './ProcedimientoMantenimiento'

export default class Repuesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public nombre: string
  @column()
  public marca: string
  @column()
  public precio: string
  @column()
  public stock: string
  @column()
  public proveedor: string

  @manyToMany(() => ProcedimientoMantenimiento, {
    pivotTable: 'repuesto_procedimiento_mantenimientos',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'repuesto_id',
    pivotRelatedForeignKey: 'procedimiento_mantenimiento_id',
  })
  public procedimientoMantenimientos: ManyToMany<typeof ProcedimientoMantenimiento>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
