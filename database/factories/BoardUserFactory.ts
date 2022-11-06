import BoardUserFactory from 'App/Models/BoardUser'
import Factory from '@ioc:Adonis/Lucid/Factory'
import BoardFactory from './BoardFactory'
import UserFactory from './UserFactory'

export default Factory.define(BoardUserFactory, ({}) => {
  return {}
})
  .relation('board', () => BoardFactory)
  .relation('user', () => UserFactory)
  .build()
