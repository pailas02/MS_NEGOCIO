import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/municipios', 'MunicipiosController.index')
Route.get('/municipios/:id', 'MunicipiosController.show')
Route.post('/municipios', 'MunicipiosController.create')
Route.put('/municipios/:id', 'MunicipiosController.update')
Route.delete('/municipios/:id', 'MunicipiosController.delete')
Route.post('/municipios/sincronizar-datosgov', 'MunicipiosController.sincronizarDesdeDatosGov')

})
