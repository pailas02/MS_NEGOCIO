import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gobernantes extends BaseSchema {
  protected tableName = 'gobernantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {table.increments('id')
      table.string('user_id').notNullable()
      table.enum('tipo', ['departamento', 'municipio']).notNullable()
      table.date('periodo_inicio').notNullable()
      table.date('periodo_fin').notNullable()
      table
        .integer('departamento_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('departamentos')
        .onDelete('SET NULL')
      

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
