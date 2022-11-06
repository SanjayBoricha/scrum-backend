import ProjectFactory from 'App/Models/Project'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import BoardFactory from './BoardFactory'

export default Factory.define(ProjectFactory, ({ faker }) => {
  return {
    name: faker.vehicle.manufacturer(),
  }
})
  .relation('user', () => UserFactory)
  .relation('boards', () => BoardFactory)
  .build()
