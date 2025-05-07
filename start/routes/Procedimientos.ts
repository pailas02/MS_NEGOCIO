import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/procedimientos", "ProcedimientosController.index")
  Route.get("/procedimientos/:id", "ProcedimientosController.show")
  Route.post("/procedimientos", "ProcedimientosController.store")
  Route.put("/procedimientos/:id", "ProcedimientosController.update")
  Route.delete("/procedimientos/:id", "ProcedimientosController.destroy")
})
