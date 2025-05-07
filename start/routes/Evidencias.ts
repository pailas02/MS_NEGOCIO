import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/evidencias', 'EvidenciasController.index')
  Route.get('/evidencias/:id', 'EvidenciasController.show')
  Route.post('/evidencias', 'EvidenciasController.store')
  Route.put('/evidencias/:id', 'EvidenciasController.update')
  Route.delete('/evidencias/:id', 'EvidenciasController.destroy')
})
