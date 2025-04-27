import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Departameto from './Departameto'
import Obra from './Obra'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public cargo: string

  @column()
  public periodoInicio: string

  @column()
  public periodoFin: string

  @belongsTo(() => Departameto, {
    foreignKey: 'departamentoId',
  })
  public departamento: BelongsTo<typeof Departameto>
  
@manyToMany(() => Municipio, {
    pivotTable: 'gobernante_municipio',
    pivotForeignKey: 'gobernante_id',  
    pivotRelatedForeignKey: 'municipio_id', 
  })
  public municipios: ManyToMany<typeof Municipio>

  @manyToMany(() => Obra, {
    pivotTable: 'gobernante_obra',
    pivotForeignKey: 'gobernante_id',  
    pivotRelatedForeignKey: 'obra_id', 
  })
  public obras: ManyToMany<typeof Obra>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
