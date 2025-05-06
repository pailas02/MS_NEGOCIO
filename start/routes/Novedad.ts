import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/novedades", "NovedadsController.find");
    Route.get("/novedades/:id", "NovedadsController.find");
    Route.post("/novedades", "NovedadsController.create");
    Route.put("/novedades/:id", "NovedadsController.update");
    Route.delete("/novedades/:id", "NovedadsController.delete");
});