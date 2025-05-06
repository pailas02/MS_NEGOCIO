import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/especialidad", "EspecialidadsController.find");
    Route.get("/especialidad/:id", "EspecialidadsController.find");
    Route.post("/especialidad", "EspecialidadsController.create");
    Route.put("/especialidad/:id", "EspecialidadsController.update");
    Route.delete("/especialidad/:id", "EspecialidadsController.delete");
});