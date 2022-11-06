import TaskFactory from 'App/Models/Task'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'
import UserFactory from './UserFactory'

export default Factory.define(TaskFactory, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    taskType: ['task', 'bug', 'feature'][Math.floor(Math.random() * 2)],
    priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    status: ['todo', 'in_progress', 'done'][Math.floor(Math.random() * 3)],
    dueDate: DateTime.now().plus({ days: Math.floor(Math.random() * 10) }),
  }
})
  .relation('creator', () => UserFactory)
  .relation('assignee', () => UserFactory)
  .build()
