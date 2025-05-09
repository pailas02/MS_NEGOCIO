import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MakeFechaPagoNullable extends BaseSchema {
  public async up () {
    this.schema.alterTable('facturas', (table) => {
      table.date('fecha_pago').nullable().alter()
    })
  }

  public async down () {
    this.schema.alterTable('facturas', (table) => {
      table.date('fecha_pago').notNullable().alter()
    })
  }
}
