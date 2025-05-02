import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evidancias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      
      table.string('contenido', 255).notNullable()
      table.string('tipo', 50).notNullable()
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      table.integer('novedad_id').unsigned().references('id').inTable('novedads').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
