import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/Chats', 'ChatsController.index')         // Lista todos los chats
  Route.get('/Chats/:id', 'ChatsController.show')      // Muestra un chat por ID
  Route.post('/Chats', 'ChatsController.store')        // Crea un nuevo chat
  Route.put('/Chats/:id', 'ChatsController.update')    // Actualiza un chat
  Route.delete('/Chats/:id', 'ChatsController.destroy')// Elimina un chat
})
    