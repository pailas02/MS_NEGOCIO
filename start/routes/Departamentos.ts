import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/departamentos", "DepartamentosController.create");
    Route.put("/departamentos/:id", "DepartamentosController.update");
    Route.delete("/departamentos/:id", "DepartamentosController.delete");
    Route.post("/departamentos/sincronizar", "DepartamentosController.sincronizar");
    Route.get("/departamentos", "DepartamentosController.index");
})