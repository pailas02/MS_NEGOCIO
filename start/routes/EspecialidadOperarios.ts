import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/Especialidad", "EspecialidadsController.find");
    Route.get("/GobernanteDepartameto/:id", "EspecialidadsController.find");
    Route.post("/GobernanteDepartameto", "EspecialidadsController.create");
    Route.put("/GobernanteDepartameto/:id", "EspecialidadsController.update");
    Route.delete("/GobernanteDepartameto/:id", "EspecialidadsController.delete");
});