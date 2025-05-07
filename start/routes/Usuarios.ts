import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/usuarios', 'UsuariosController.index')        // Listar todos
  Route.get('/usuarios/:id', 'UsuariosController.show')     // Mostrar uno
  Route.post('/usuarios', 'UsuariosController.store')       // Crear nuevo
  Route.put('/usuarios/:id', 'UsuariosController.update')   // Actualizar
  Route.delete('/usuarios/:id', 'UsuariosController.destroy') // Eliminar
})
