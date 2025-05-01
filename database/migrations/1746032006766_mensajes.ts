import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'mensajes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      
      table.integer('idChat').unsigned().references('id').inTable('chats').onDelete('CASCADE')
      table.string('idUsuario', 255).notNullable()
      table.string('mensaje', 255).notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
