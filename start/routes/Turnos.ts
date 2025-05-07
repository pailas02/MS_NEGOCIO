import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/turnos', 'TurnosController.index')      // Lista o pagina turnos
  Route.get('/turnos/:id', 'TurnosController.show')   // Mostrar por ID
  Route.post('/turnos', 'TurnosController.store')     // Crear turno
  Route.put('/turnos/:id', 'TurnosController.update') // Actualizar turno
  Route.delete('/turnos/:id', 'TurnosController.destroy') // Eliminar turno
})
