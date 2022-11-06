/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('auth')

Route.group(() => {
  Route.get('projects', 'ProjectsController.index')
  Route.get('projects/:id', 'ProjectsController.show')
  Route.post('projects', 'ProjectsController.store')
  Route.put('projects/:id', 'ProjectsController.update')
  Route.delete('projects/:id', 'ProjectsController.destroy')

  Route.get('boards', 'BoardsController.index')
  Route.get('boards/:id', 'BoardsController.show')
  Route.post('boards', 'BoardsController.store')
  Route.put('boards/:id', 'BoardsController.update')
  Route.delete('boards/:id', 'BoardsController.destroy')
  Route.post('boards/:id/add-user', 'BoardsController.addUser')
  Route.post('boards/:id/remove-user', 'BoardsController.removeUser')
  Route.get('boards/:id/board-users', 'BoardsController.boardUsers')

  Route.get('/boards/:id/tasks', 'TasksController.getBoardTasks')
  Route.get('tasks/:id', 'TasksController.show')
  Route.post('tasks', 'TasksController.store')
  Route.delete('tasks/:id', 'TasksController.destroy')
  Route.post('tasks/:id/change-status', 'TasksController.changeStatus')
  Route.post('tasks/:id/change-prirority', 'TasksController.changePriority')
  Route.post('tasks/:id/change-assingee', 'TasksController.changeAssignee')
  Route.post('tasks/:id/change-due-date', 'TasksController.changeDueDate')
  Route.post('tasks/:id/change-type', 'TasksController.changeType')
  Route.post('tasks/:id/add-comment', 'TasksController.addComment')
  Route.post('tasks/:id/upload-document', 'TasksController.uploadDocument')
}).middleware('auth')
