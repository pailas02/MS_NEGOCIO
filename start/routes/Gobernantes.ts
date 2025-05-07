import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'GobernantesController.index')       // GET /gobernantes
  Route.post('/', 'GobernantesController.store')      // POST /gobernantes
  Route.get('/:id', 'GobernantesController.show')     // GET /gobernantes/:id
})
  .prefix('/gobernantes')
