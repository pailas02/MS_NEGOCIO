import { BaseModel, column, manyToMany, ManyToMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Combo from './Combo'
import { DateTime } from 'luxon'

export default class Obra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public comboId: number

  @belongsTo(() => Combo)
  public combo: BelongsTo<typeof Combo>

  @manyToMany(() => Municipio, {
    pivotTable: 'obra_municipio',
    pivotForeignKey: 'obra_id',
    pivotRelatedForeignKey: 'municipio_id',
  })
  public municipios: ManyToMany<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
