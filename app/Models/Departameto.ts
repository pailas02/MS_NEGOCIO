import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from './Gobernante'
import Municipio from './Municipio'

export default class Departameto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public ubicacio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Gobernante, {
    foreignKey: 'departamentoId',
  })
  public gobernantes: HasMany<typeof Gobernante>

  @hasMany(() => Municipio, {
    foreignKey: 'departamentoId',
  })
  public municipios: HasMany<typeof Municipio>
}
