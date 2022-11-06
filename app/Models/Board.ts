import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Project from './Project'
import BoardUser from './BoardUser'
import Task from './Task'

export default class Board extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public userId: number

  @column()
  public projectId: number

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => BoardUser)
  public boardUsers: HasMany<typeof BoardUser>

  @hasManyThrough([() => User, () => BoardUser])
  public users: HasManyThrough<typeof User>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
