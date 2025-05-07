import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'EspecialidadOperariosController.index')
  Route.get('/:id', 'EspecialidadOperariosController.show')
  Route.post('/', 'EspecialidadOperariosController.store')
  Route.put('/:id', 'EspecialidadOperariosController.update')
  Route.delete('/:id', 'EspecialidadOperariosController.destroy')
}).prefix('/especialidad-operarios')
