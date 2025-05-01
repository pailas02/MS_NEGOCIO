import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import EspecialidadMaquina from './EspecialidadMaquina'

export default class TipoServicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @manyToMany(() => EspecialidadMaquina, {
    pivotTable: 'especialidad_maquinas_tipo_servicios',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'tipo_servicio_id',
    pivotRelatedForeignKey: 'especialidad_maquina_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public especialidades: ManyToMany<typeof EspecialidadMaquina>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
