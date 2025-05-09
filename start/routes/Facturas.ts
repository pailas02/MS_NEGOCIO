import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'FacturasController.index')
    Route.get('/:id', 'FacturasController.show')
    Route.post('/', 'FacturasController.store')
    Route.put('/:id', 'FacturasController.update')
    Route.delete('/:id', 'FacturasController.destroy')
  }).prefix('/facturas')
  