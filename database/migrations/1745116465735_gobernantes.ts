import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gobernantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre', 50).notNullable()
      table.string('cargo', 50).notNullable()
      table.string('periodo_inicio', 50).notNullable()
      table.string('periodo_fin', 50).notNullable()
      table.string('departamento_id', 50).notNullable().references('id').inTable('departamentos').onDelete('CASCADE')
      table.string('municipio_id', 50).notNullable().references('id').inTable('municipios').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
