import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('costos').notNullable()
      table.string('prioridad', 50).notNullable()
      table.string('tipo_servicio', 50).notNullable()
      table.string('fecha_inicio', 50).notNullable()
      table.string('fecha_fin', 50).notNullable()
      table.string('estado', 50).notNullable()
      table.string('ubicacion', 255).notNullable()
      table.string('historico', 255).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
