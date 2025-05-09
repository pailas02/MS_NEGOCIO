import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'MaquinaCombosController.index')
  Route.post('/', 'MaquinaCombosController.store')
  Route.get('/:id', 'MaquinaCombosController.show')
  Route.delete('/:id', 'MaquinaCombosController.destroy')
}).prefix('/maquina-combos')
