import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get('/obra-municipios', 'ObraMunicipiosController.index')
    Route.get('/obra-municipios/:id', 'ObraMunicipiosController.show')
    Route.post('/obra-municipios', 'ObraMunicipiosController.store')
    Route.put('/obra-municipios/:id', 'ObraMunicipiosController.update')
    Route.delete('/obra-municipios/:id', 'ObraMunicipiosController.destroy')
  })
  