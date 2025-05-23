import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Combos extends BaseSchema {
  protected tableName = 'combos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descripcion', 255).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
