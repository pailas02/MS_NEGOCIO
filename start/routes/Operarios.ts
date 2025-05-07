import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/operarios', 'OperariosController.index')
  Route.get('/operarios/:id', 'OperariosController.show')
  Route.post('/operarios', 'OperariosController.store')
  Route.put('/operarios/:id', 'OperariosController.update')
  Route.delete('/operarios/:id', 'OperariosController.destroy')
})
