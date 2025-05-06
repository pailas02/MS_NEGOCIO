import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from './Gobernante'
import Departameto from './Departamento'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamentoId: number

  @belongsTo(() => Departameto, {
    foreignKey: 'departamentoId',
  })
  public departamento: BelongsTo<typeof Departameto>

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernante_municipio',
    pivotForeignKey: 'municipio_id',  
    pivotRelatedForeignKey: 'gobernante_id', })
  public gobernantes: ManyToMany<typeof Gobernante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
