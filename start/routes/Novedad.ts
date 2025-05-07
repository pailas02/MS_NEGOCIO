import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/novedades', 'NovedadsController.index')
  Route.get('/novedades/:id', 'NovedadsController.show')
  Route.post('/novedades', 'NovedadsController.store')      
  Route.put('/novedades/:id', 'NovedadsController.update')
  Route.delete('/novedades/:id', 'NovedadsController.destroy')
})
