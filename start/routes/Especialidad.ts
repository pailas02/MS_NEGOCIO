import Route from '@ioc:Adonis/Core/Route'

// Rutas para Especialidades
Route.get('/especialidades', 'EspecialidadsController.index')
Route.get('/especialidades/:id', 'EspecialidadsController.show')
Route.post('/especialidades', 'EspecialidadsController.store')
Route.put('/especialidades/:id', 'EspecialidadsController.update')
Route.delete('/especialidades/:id', 'EspecialidadsController.destroy')
