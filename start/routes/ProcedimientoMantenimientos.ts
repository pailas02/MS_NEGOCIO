import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/procedimiento_mantenimientos", "ProcedimientoMantenimientosController.index")
  Route.get("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.show")
  Route.post("/procedimiento_mantenimientos", "ProcedimientoMantenimientosController.store")
  Route.put("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.update")
  Route.delete("/procedimiento_mantenimientos/:id", "ProcedimientoMantenimientosController.destroy")
})
