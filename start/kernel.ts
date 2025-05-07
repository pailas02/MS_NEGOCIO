/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| Este archivo define los middleware globales y nombrados de la app.
| Usa `() => import(...)` para mantener carga diferida y ordenada.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Middleware globales
|--------------------------------------------------------------------------
|
| Se ejecutan en todas las rutas.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

/*
|--------------------------------------------------------------------------
| Middleware nombrados
|--------------------------------------------------------------------------
|
| Se pueden aplicar a rutas específicas con `.middleware('alias')`
|
*/
Server.middleware.registerNamed({
  MsSecMid: () => import('App/Middleware/MsSecMid'),
})
