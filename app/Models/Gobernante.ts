import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Departameto from './Departameto'
import Obra from './Obra'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public periodoInicio: string

  @column()
  public periodoFin: string



  @manyToMany(() => Municipio, {
    pivotTable: 'gobernante_municipio',
    pivotForeignKey: 'gobernante_id',  
    pivotRelatedForeignKey: 'municipio_id', 
  })
  public municipios: ManyToMany<typeof Municipio>

  @manyToMany(() => Departameto, {
    pivotTable: 'gobernante_departamento',
    pivotForeignKey: 'gobernante_id',  
    pivotRelatedForeignKey: 'departamento_id', 
  })
  public departamento: ManyToMany<typeof Departameto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
