import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  // get board's tasks
  public async getBoardTasks({ params, response }: HttpContextContract) {
    try {
      const tasks = await Task.query()
        .where('board_id', params.id)
        .preload('assignee')
        .paginate(params.page, params.per_page)

      return tasks
    } catch (error) {
      console.log(error)

      return response.status(500).send(error)
    }
  }

  // get task by id
  public async show({ params, response }: HttpContextContract) {
    try {
      const task = await Task.find(params.id)

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // create new task
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const payload = request.validate(CreateTaskValidator)

      const task = await Task.create({ ...payload, createdBy: auth.user?.id })

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // change task status
  public async changeStatus({ params, request, response }: HttpContextContract) {
    try {
      const taskStatusSchema = schema.create({
        status: schema.enum(['todo', 'in-progress', 'done']),
      })

      const payload = await request.validate({ schema: taskStatusSchema })

      const task = await Task.find(params.id)

      if (task) {
        task.status = payload.status
        await task.save()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // change task assigneeId
  public async changeAssignee({ params, request, response }: HttpContextContract) {
    try {
      const taskAssigneeSchema = schema.create({
        assigneeId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
      })

      const payload = await request.validate({ schema: taskAssigneeSchema })

      const task = await Task.find(params.id)

      if (task) {
        task.assigneeId = payload.assigneeId
        await task.save()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // change task due date
  public async changeDueDate({ params, request, response }: HttpContextContract) {
    try {
      const taskDueDateSchema = schema.create({
        dueDate: schema.date(),
      })

      const payload = await request.validate({ schema: taskDueDateSchema })

      const task = await Task.find(params.id)

      if (task) {
        task.dueDate = payload.dueDate
        await task.save()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // change priority
  public async changePriority({ params, request, response }: HttpContextContract) {
    try {
      const taskPrioritySchema = schema.create({
        priority: schema.enum(['low', 'medium', 'high']),
      })

      const payload = await request.validate({ schema: taskPrioritySchema })

      const task = await Task.find(params.id)

      if (task) {
        task.priority = payload.priority
        await task.save()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // change task type
  public async changeType({ params, request, response }: HttpContextContract) {
    try {
      const taskTypeSchema = schema.create({
        taskType: schema.enum(['task', 'bug', 'feature']),
      })

      const payload = await request.validate({ schema: taskTypeSchema })

      const task = await Task.find(params.id)

      if (task) {
        task.taskType = payload.taskType
        await task.save()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // delete task
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const task = await Task.find(params.id)

      if (task) {
        await task.delete()
      }

      return task
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // add comment to task
  public async addComment({ auth, params, request, response }: HttpContextContract) {
    try {
      const task = await Task.find(params.id)

      if (task && auth.user) {
        const comment = await task.related('comments').create({
          message: request.input('message'),
          userId: auth.user.id,
        })

        return comment
      }
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // upload document to task
  public async uploadDocument({ auth, params, request, response }: HttpContextContract) {
    try {
      const file = request.file('file', {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
      })

      const task = await Task.find(params.id)

      if (task && auth.user && file) {
        const fileLocation = `task/${1}/documents/${new Date().getTime()}.${file.extname}`

        await file.moveToDisk('local', {
          name: fileLocation,
        })

        const document = await task.related('documents').create({
          name: file.clientName,
          location: fileLocation,
          userId: auth.user.id,
        })

        return document
      }
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
