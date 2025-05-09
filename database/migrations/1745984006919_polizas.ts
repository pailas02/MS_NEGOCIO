import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Cambiar a nullable
      table.integer('id_operario').unsigned().references('id').inTable('operarios').onDelete('CASCADE').nullable()
      table.integer('id_maquina').unsigned().references('id').inTable('maquinas').onDelete('CASCADE').nullable()

      table.integer('id_seguro').unsigned().references('id').inTable('seguros').onDelete('CASCADE').notNullable()
      table.dateTime('fecha_inicio').notNullable()
      table.dateTime('fecha_fin').notNullable()
      table.string('estado').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
