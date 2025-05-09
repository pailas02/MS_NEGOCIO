import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PolizasController.index')        // Listar todas
  Route.get('/:id', 'PolizasController.show')      // Ver una por ID
  Route.post('/', 'PolizasController.store')       // Crear nueva
  Route.put('/:id', 'PolizasController.update')    // Actualizar
  Route.delete('/:id', 'PolizasController.destroy')// Eliminar
}).prefix('/polizas')
