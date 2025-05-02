import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rep_proce_manten'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('repuesto_id').unsigned().references('id').inTable('repuestos').onDelete('CASCADE')
      table.integer('procedimiento_mantenimiento_id').unsigned().references('id').inTable('procedimiento_mantenimientos').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
