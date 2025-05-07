import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/especialidad_maquinarias", "EspecialidadesMaquinaController.index");
  Route.get("/especialidad_maquinarias/:id", "EspecialidadesMaquinaController.show");
  Route.post("/especialidad_maquinarias", "EspecialidadesMaquinaController.store");
  Route.put("/especialidad_maquinarias/:id", "EspecialidadesMaquinaController.update");
  Route.delete("/especialidad_maquinarias/:id", "EspecialidadesMaquinaController.destroy");
})
