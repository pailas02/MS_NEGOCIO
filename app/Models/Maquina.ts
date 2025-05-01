import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gps from './Gps'
import Combo from './Combo'
import TipoServicio from './TipoServicio'
import Operario from './Operario'
export default class Maquina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public marca: string
  @column()
  public modelo: string
  @column()
  public estado: string

  @hasOne(() => Gps, {
    foreignKey: 'maquinaId',
  })
  public gps: HasOne<typeof Gps>

  @manyToMany(() => Combo, {
    pivotTable: 'combo_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'combo_id',
  })
  public combos: ManyToMany<typeof Combo>

  @manyToMany(() => TipoServicio, {
    pivotTable: 'tipo_servicio_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'tipo_servicio_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public tipoServicios: ManyToMany<typeof TipoServicio>

  @manyToMany(() => Operario, {
    pivotTable: 'operario_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'operario_id',
  })
  public operarios: ManyToMany<typeof Operario>

  @manyToMany(() => Operario, {
    pivotTable: 'Turno',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'maquina_id',
    pivotRelatedForeignKey: 'operario_id',
    pivotColumns: ['created_at', 'updated_at'],
  })
  public operariosMaquina: ManyToMany<typeof Operario>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
