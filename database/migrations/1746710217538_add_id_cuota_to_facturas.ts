import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddIdCuotaToFacturas extends BaseSchema {
  public async up () {
    this.schema.alterTable('facturas', (table) => {
      table.integer('id_cuota').unsigned().references('id').inTable('cuotas').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable('facturas', (table) => {
      table.dropColumn('id_cuota')
    })
  }
}
