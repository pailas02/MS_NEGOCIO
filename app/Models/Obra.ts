import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Combo from './Combo'

export default class Obra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  @column()
  public descripcion: string
  @column()
  public comboId: number
  
  @manyToMany(() => Municipio, {
    pivotTable: 'obra_municipio',
    pivotForeignKey: 'obra_id',  
    pivotRelatedForeignKey: 'municipio_id', 
  })
  public municipios: ManyToMany<typeof Municipio>

  @hasOne(() => Combo, {
    foreignKey: 'comboId',
  })
  public combo: HasOne<typeof Combo>

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
