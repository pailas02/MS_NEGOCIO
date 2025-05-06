import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/GobernanteMunicipios", "GobernanteMunicipiosController.find");
    Route.get("/GobernanteDepartameto/:id", "GobernanteMunicipiosController.find");
    Route.post("/GobernanteDepartameto", "GobernanteMunicipiosController.create");
    Route.put("/GobernanteDepartameto/:id", "GobernanteMunicipiosController.update");
    Route.delete("/GobernanteDepartameto/:id", "GobernanteMunicipiosController.delete");
});