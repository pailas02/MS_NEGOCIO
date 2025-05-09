import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import GobernanteMunicipio from './GobernanteMunicipio'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: string

  @column()
  public tipo: 'departamento' | 'municipio'

  @column()
  public departamentoId?: number | null

  @column.date()
  public periodoInicio: DateTime

  @column.date()
  public periodoFin: DateTime

  @belongsTo(() => Departamento, {
    foreignKey: 'departamentoId',
  })
  public departamento: BelongsTo<typeof Departamento>

  @hasMany(() => GobernanteMunicipio, {
    foreignKey: 'gobernanteId',
  })
  public municipios: HasMany<typeof GobernanteMunicipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
