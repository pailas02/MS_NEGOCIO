import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Middleware globales
|--------------------------------------------------------------------------
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

/*
|--------------------------------------------------------------------------
| Middleware nombrados
|--------------------------------------------------------------------------
*/
Server.middleware.registerNamed({
  msSecMid: () => import('App/Middleware/MsSecMid'),
})
