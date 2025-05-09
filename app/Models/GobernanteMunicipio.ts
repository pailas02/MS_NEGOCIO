import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Gobernante from './Gobernante'
import Departamento from './Departamento'
import Municipio from './Municipio'

export default class GobernanteTerritorio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gobernanteId: number

  @column()
  public tipo: 'departamento' | 'municipio' // define el tipo de territorio

  @column()
  public territorioId: number // ID de municipio o departamento, según tipo

  @column.dateTime()
  public fechaInicio: DateTime

  @column.dateTime()
  public fechaFin: DateTime

  @belongsTo(() => Gobernante)
  public gobernante: BelongsTo<typeof Gobernante>

  // Opcional: relaciones dinámicas si deseas acceder directamente
  @belongsTo(() => Departamento, {
    foreignKey: 'territorioId',
    onQuery: (query) => query.where('tipo', 'departamento'),
  })
  public departamento: BelongsTo<typeof Departamento>

  @belongsTo(() => Municipio, {
    foreignKey: 'territorioId',
    onQuery: (query) => query.where('tipo', 'municipio'),
  })
  public municipio: BelongsTo<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
