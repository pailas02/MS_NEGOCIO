import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Especialidad", "EspecialidadsController.find");
    Route.get("/Especialidad/:id", "EspecialidadsController.find");
    Route.post("/Especialidad", "EspecialidadsController.create");
    Route.put("/Especialidad/:id", "EspecialidadsController.update");
    Route.delete("/Especialidad/:id", "EspecialidadsController.delete");
});