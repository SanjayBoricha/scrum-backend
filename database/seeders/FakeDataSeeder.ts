import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await UserFactory.merge({
      name: 'Sanjay Boricha',
      email: 'sanjayboricha1001@gmail.com',
    })
      .with('projects', 25, (projects) => {
        projects.with('boards', 5, (boards) => {
          boards
            .merge({
              userId: boards.parent.userId,
            })
            .with('tasks', 100, (tasks) => {
              tasks.merge({
                boardId: boards.parent.id,
                assigneeId: boards.parent.userId,
                createdBy: boards.parent.userId,
              })
            })
          // .with('boardUsers', 5, (boardUsers) => {
          //   boardUsers.merge({
          //     boardId: boards.parent.id,
          //     userId: boardUsers.parent.userId,
          //   })
          // })
        })
      })
      .create()

    await UserFactory.with('projects', 3, (projects) => {
      projects.with('boards', 5, (boards) => {
        boards
          .merge({
            userId: boards.parent.userId,
          })
          .with('tasks', 10, (tasks) => {
            tasks.merge({
              boardId: boards.parent.id,
              assigneeId: boards.parent.userId,
              createdBy: boards.parent.userId,
            })
          })
      })
    }).createMany(10)
  }
}
