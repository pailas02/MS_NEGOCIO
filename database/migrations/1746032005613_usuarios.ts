import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('user_id').notNullable().unique() // ID externo del ms-security
      table.string('nombre', 100).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()

      table.integer('id_chat').unsigned().references('id').inTable('chats').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
