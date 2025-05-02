import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gobernante_departametos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('gobernante_id').unsigned().notNullable().references('id').inTable('gobernantes').onDelete('CASCADE')
      table.integer('departamento_id').unsigned().notNullable().references('id').inTable('departamentos').onDelete('CASCADE')
      table.date('fecha_inicio').notNullable()
      table.date('fecha_fin').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
