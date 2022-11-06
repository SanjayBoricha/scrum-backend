import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Board from './Board'
import TaskComment from './TaskComment'
import TaskDocument from './TaskDocument'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public taskType: string // 'task' | 'bug' | 'feature'

  @column()
  public priority: string // 'low' | 'medium' | 'high'

  @column()
  public status: string // 'todo' | 'in_progress' | 'done'

  @column.dateTime()
  public dueDate: DateTime

  @column()
  public boardId: number

  @column()
  public assigneeId: number

  @column()
  public createdBy: number

  @belongsTo(() => Board)
  public board: BelongsTo<typeof Board>

  @belongsTo(() => User, { foreignKey: 'assigneeId' })
  public assignee: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  public creator: BelongsTo<typeof User>

  @hasMany(() => TaskComment)
  public comments: HasMany<typeof TaskComment>

  @hasMany(() => TaskDocument)
  public documents: HasMany<typeof TaskDocument>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
