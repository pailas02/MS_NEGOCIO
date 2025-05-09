import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Servicios extends BaseSchema {
  protected tableName = 'servicios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('costo').notNullable()
      table.string('prioridad', 50).notNullable()
      table.string('tipo_servicio', 50).notNullable()
      table.timestamp('fecha_inicio', { useTz: true }).notNullable()
      table.timestamp('fecha_fin', { useTz: true }).notNullable()
      table.string('estado', 50).notNullable()
      table.string('ubicacion', 255).notNullable()
      table.string('historico', 255).notNullable()

      // Clave foránea hacia Combo
      table
        .integer('combo_id')
        .unsigned()
        .references('id')
        .inTable('combos')
        .onDelete('CASCADE')


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
