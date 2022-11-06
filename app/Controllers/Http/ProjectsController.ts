import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProjectsController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      // get auth user's projects
      const projects = await auth.user?.related('projects').query().withCount('boards')

      return projects?.map((project) => {
        return {
          ...project.toJSON(),
          boards_count: project.$extras.boards_count,
        }
      })
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // get project by id
  public async show({ auth, params, response }: HttpContextContract) {
    try {
      const project = await auth.user
        ?.related('projects')
        .query()
        .where('id', params.id)
        .withCount('boards')
        .preload('boards', (boardsQuery) => {
          boardsQuery.preload('user')
        })
        .firstOrFail()

      return project
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // create new project
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const createProjectSchema = schema.create({
        name: schema.string(),
      })

      const payload = await request.validate({ schema: createProjectSchema })

      const project = await auth.user?.related('projects').create(payload)

      return project
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // update project
  public async update({ auth, request, params, response }: HttpContextContract) {
    try {
      const { name } = request.all()

      const project = await auth.user
        ?.related('projects')
        .query()
        .where('id', params.id)
        .update({ name })

      return project
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // get boards by project id
  public async boards({ params, response }: HttpContextContract) {
    try {
      const boards = await Board.query().where('project_id', params.id)

      return boards
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
