import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EspecialidadOperarios extends BaseSchema {
  protected tableName = 'especialidad_operarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('especialidad_id')
        .unsigned()
        .references('id')
        .inTable('especialidads')
        .onDelete('CASCADE')

      table
        .integer('operario_id')
        .unsigned()
        .references('id')
        .inTable('operarios')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
