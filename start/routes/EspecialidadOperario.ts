import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/EspecialidadeOperario", "EspecialidadOperariosController.find");
    Route.get("/EspecialidadeOperario/:id", "EspecialidadOperariosController.find");
    Route.post("/EspecialidadeOperario", "EspecialidadOperariosController.create");
    Route.put("/EspecialidadeOperario/:id", "EspecialidadOperariosController.update");
    Route.delete("/EspecialidadeOperario/:id", "EspecialidadOperariosController.delete");
});