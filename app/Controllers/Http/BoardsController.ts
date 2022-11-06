import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'

export default class BoardsController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      // get auth user's boards
      const boards = await auth.user?.related('boards').query()

      return boards
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // get board by id
  public async show({ auth, params, response }: HttpContextContract) {
    try {
      const board = await auth.user?.related('boards').query().where('id', params.id).firstOrFail()

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // create new board
  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const { name, projectId } = request.all()

      const board = await auth.user?.related('boards').create({ name, projectId })

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // update board
  public async update({ auth, request, params, response }: HttpContextContract) {
    try {
      const { name } = request.all()

      const board = await auth.user
        ?.related('boards')
        .query()
        .where('id', params.id)
        .update({ name })

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // delete board
  public async destroy({ auth, params, response }: HttpContextContract) {
    try {
      const board = await auth.user?.related('boards').query().where('id', params.id).delete()

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // add user to board
  public async addUser({ auth, request, params, response }: HttpContextContract) {
    try {
      const { userId } = request.all()

      const board = await auth.user?.related('boards').query().where('id', params.id).firstOrFail()

      // insert record in board_users pivot table
      await board?.related('boardUsers').create({ userId })

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // remove user from board
  public async removeUser({ auth, request, params, response }: HttpContextContract) {
    try {
      const { userId } = request.all()

      const board = await auth.user?.related('boards').query().where('id', params.id).firstOrFail()

      // delete record in board_users pivot table
      await board?.related('boardUsers').query().where('user_id', userId).delete()

      return board
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  // get board users
  public async boardUsers({ params, response }: HttpContextContract) {
    try {
      const board = await Board.query().where('id', params.id).firstOrFail()

      const boardUsers = await board?.related('users').query()

      return boardUsers
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
