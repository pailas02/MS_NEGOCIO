import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

     table.integer('id_operario').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
     table.integer('id_maquina').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
     table.integer('id_seguro').unsigned().references('id').inTable('seguros').onDelete('CASCADE')
     table.dateTime('fecha_inicio')
     table.dateTime('fecha_fin')
     table.string('estado')

 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
