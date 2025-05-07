import { BaseModel, column, manyToMany, ManyToMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Obra from './Obra'
import { DateTime } from 'luxon'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamentoId: number

  @belongsTo(() => Departamento)
  public departamento: BelongsTo<typeof Departamento>

  @manyToMany(() => Obra, {
    pivotTable: 'obra_municipio',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'obra_id',
  })
  public obras: ManyToMany<typeof Obra>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
