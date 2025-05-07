import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/GobernanteDepartamentos", "GobernanteDepartamentosController.find")
  Route.get("/GobernanteDepartamentos/:id", "GobernanteDepartamentosController.find")
  Route.post("/GobernanteDepartamentos", "GobernanteDepartamentosController.create")
  Route.put("/GobernanteDepartamentos/:id", "GobernanteDepartamentosController.update")
  Route.delete("/GobernanteDepartamentos/:id", "GobernanteDepartamentosController.delete")
})
