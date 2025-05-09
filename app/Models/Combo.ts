import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Maquina from './Maquina'
import Servicio from './Servicio'

export default class Combo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @manyToMany(() => Maquina, {
    pivotTable: 'combo_maquina',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'combo_id',
    pivotRelatedForeignKey: 'maquina_id',
  })
  public maquinas: ManyToMany<typeof Maquina>

  @hasOne(() => Servicio, {
    foreignKey: 'comboId', // Clave foránea en la tabla "servicios"
  })
  public servicio: HasOne<typeof Servicio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
