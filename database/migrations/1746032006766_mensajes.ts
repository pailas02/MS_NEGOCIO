// database/migrations/xxxxx_mensajes.ts
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Mensajes extends BaseSchema {
  protected tableName = 'mensajes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('contenido').notNullable() // Cambiado a text para mensajes largos
      
      table.timestamp('fecha', { useTz: true })
        .notNullable()
        .defaultTo(this.now())

      // Relaciones
      table.integer('idUsuario')
        .unsigned()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')
        .notNullable()

      table.integer('idChat')
        .unsigned()
        .references('id')
        .inTable('chats')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Índices para mejor performance
      table.index(['idUsuario'], 'idx_mensajes_usuario')
      table.index(['idChat'], 'idx_mensajes_chat')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}