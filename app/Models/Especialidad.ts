import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Operario from './Operario'

export default class Especialidad extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string
  @column()
  public descripcion: string

  @manyToMany(() => Operario, 
    {
      localKey: 'id',
      relatedKey: 'id',
      pivotTable: 'especialidad_operarios',
      pivotForeignKey: 'especialidad_id',
      pivotRelatedForeignKey: 'operario_id',
      pivotColumns: ['created_at', 'updated_at'],
    }
  )
  public operarios: ManyToMany<typeof Operario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}