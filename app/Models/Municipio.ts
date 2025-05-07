import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Gobernante from './Gobernante'
import Departamento from './Departamento'

export default class Municipio extends BaseModel {
  public static table = 'municipios' // asegúrate que coincide con la migración

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public departamentoId: number

  @belongsTo(() => Departamento, {
    foreignKey: 'departamentoId',
  })
  public departamento: BelongsTo<typeof Departamento>

  @manyToMany(() => Gobernante, {
    pivotTable: 'gobernante_municipio',
    pivotForeignKey: 'municipio_id',
    pivotRelatedForeignKey: 'gobernante_id',
  })
  public gobernantes: ManyToMany<typeof Gobernante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
