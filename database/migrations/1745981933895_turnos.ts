import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'turnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.integer('operario_id').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
      table.boolean('estado').notNullable()
      table.datetime('fecha_inicio', { useTz: true })
      table.datetime('fecha_fin', { useTz: true })


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
