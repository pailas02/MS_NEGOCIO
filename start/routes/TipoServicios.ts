import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TipoServiciosController.find')           // Listar todos o uno por ID
  Route.get('/:id', 'TipoServiciosController.find')        
  Route.post('/', 'TipoServiciosController.create')        // Crear tipo servicio
  Route.put('/:id', 'TipoServiciosController.update')      // Actualizar por ID
  Route.delete('/:id', 'TipoServiciosController.delete')   // Eliminar por ID
}).prefix('/tipo_servicios')
