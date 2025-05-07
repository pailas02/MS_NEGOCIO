import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mantenimientos extends BaseSchema {
  protected tableName = 'mantenimientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha').notNullable()
      table.string('estado').notNullable()

      // clave foránea correcta a `maquinas.id`
      table
        .integer('maquina_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('maquinas')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
