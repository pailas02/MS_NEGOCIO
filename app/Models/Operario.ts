import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Especialidad from './Especialidad'


export default class Operario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public experiencia: String

  @manyToMany(() => Especialidad  , {
    pivotTable: 'especialidad_operarios',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'especialidad_maquina_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public especialidades: ManyToMany<typeof Especialidad>

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
