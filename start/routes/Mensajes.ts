import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MensajesController.index')
  Route.get('/:id', 'MensajesController.show')
  Route.post('/', 'MensajesController.store')
  Route.put('/:id', 'MensajesController.update')
  Route.delete('/:id', 'MensajesController.destroy')
}).prefix('/mensajes')
