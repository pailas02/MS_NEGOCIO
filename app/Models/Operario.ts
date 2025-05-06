import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Especialidad from './Especialidad'
import Maquina from './Maquina'


export default class Operario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public nombre: string

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

  @manyToMany(() => Especialidad, {
    pivotTable: 'especialidad_operarios',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'especialidad_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public especialidadesMaquina: ManyToMany<typeof Especialidad>

  @manyToMany(() => Maquina, {
    pivotTable: 'operario_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'operario_id',
    pivotRelatedForeignKey: 'maquina_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public maquinas: ManyToMany<typeof Maquina>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
