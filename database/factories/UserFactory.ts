import UserFactory from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ProjectFactory from './ProjectFactory'

export default Factory.define(UserFactory, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: '123456789',
  }
})
  .relation('projects', () => ProjectFactory)
  .build()
