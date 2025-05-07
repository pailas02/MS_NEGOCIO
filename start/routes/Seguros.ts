import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SegurosController.index')
  Route.get('/:id', 'SegurosController.show')
  Route.post('/', 'SegurosController.store')
  Route.put('/:id', 'SegurosController.update')
  Route.delete('/:id', 'SegurosController.destroy')
}).prefix('/seguros')
