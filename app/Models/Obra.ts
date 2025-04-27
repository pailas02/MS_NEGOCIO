import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Obra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  @column()
  public descripcion: string
  
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
