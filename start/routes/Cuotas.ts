import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CuotasController.index')         // Listar cuotas
  Route.get('/:id', 'CuotasController.show')       // Obtener una cuota por ID
  Route.post('/', 'CuotasController.store')        // Crear una nueva cuota
  Route.put('/:id', 'CuotasController.update')     // Actualizar una cuota existente
  Route.delete('/:id', 'CuotasController.destroy') // Eliminar una cuota
}).prefix('/cuotas')
