import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/GobernanteDepartamentos", "GobernanteDepartamentosController.find");
    Route.get("/GobernanteDepartameto/:id", "GobernanteDepartamentosController.find");
    Route.post("/GobernanteDepartameto", "GobernanteDepartamentosController.create");
    Route.put("/GobernanteDepartameto/:id", "GobernanteDepartamentosController.update");
    Route.delete("/GobernanteDepartameto/:id", "GobernanteDepartamentosController.delete");
});