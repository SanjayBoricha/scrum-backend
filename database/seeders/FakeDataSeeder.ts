import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await UserFactory.merge({
      name: 'Sanjay Boricha',
      email: 'sanjayboricha1001@gmail.com',
    })
      .with('boards', 5, (boards) => {
        boards
          .merge({
            userId: boards.parent.id,
          })
          .with('tasks', 100, (tasks) => {
            tasks.merge({
              boardId: tasks.parent.id,
              assigneeId: boards.parent.id,
              createdBy: boards.parent.id,
            })
          })
        // .with('boardUsers', 5, (boardUsers) => {
        //   boardUsers.merge({
        //     boardId: boards.parent.id,
        //     userId: boardUsers.parent.userId,
        //   })
        // })
      })
      .create()

    await UserFactory.with('boards', 5, (boards) => {
      boards
        .merge({
          userId: boards.parent.id,
        })
        .with('tasks', 10, (tasks) => {
          tasks.merge({
            boardId: tasks.parent.id,
            assigneeId: boards.parent.id,
            createdBy: boards.parent.id,
          })
        })
    }).createMany(10)
  }
}
