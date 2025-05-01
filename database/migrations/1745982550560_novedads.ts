import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'novedads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('turno_id').unsigned().references('id').inTable('turnos').onDelete('CASCADE')
      table.string('tipo', 50).notNullable()
      table.string('descripcion', 255).notNullable()
      table.string('evidencia', 255).notNullable()
      table.string('estado', 50).notNullable()
      table.string('fecha', 50).notNullable()
      table.string('gravedad', 50).notNullable()         

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
