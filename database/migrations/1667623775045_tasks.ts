import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.enum('task_type', ['task', 'bug', 'feature']).notNullable()
      table.enum('priority', ['low', 'medium', 'high']).notNullable()
      table.enum('status', ['todo', 'in_progress', 'done']).notNullable()
      table.datetime('due_date').notNullable()
      table.integer('board_id').unsigned().references('id').inTable('boards').onDelete('CASCADE')
      table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('created_by').unsigned().references('id').inTable('users').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
