import TaskFactory from './TaskFactory'
import BoardFactory from 'App/Models/Board'
import Factory from '@ioc:Adonis/Lucid/Factory'
import BoardUserFactory from './BoardUserFactory'

export default Factory.define(BoardFactory, ({ faker }) => {
  return {
    name: faker.vehicle.model(),
  }
})
  .relation('tasks', () => TaskFactory)
  .relation('boardUsers', () => BoardUserFactory)
  .build()
