import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from "App/Models/User"

export default class AuthController {
    public async register({ auth, request, response }: HttpContextContract) {
        const newUserSchema = schema.create({
            name: schema.string(),
            email: schema.string([
                rules.email(),
                rules.unique({
                    table: 'users',
                    column: 'email'
                })
            ]),
            password: schema.string([
                rules.confirmed(),
                rules.minLength(4)
            ])
        })

        try {
            const payload = await request.validate({
                schema: newUserSchema
            })

            await User.create({
                name: payload.name,
                email: payload.email,
                password: payload.password
            })

            const token = await auth.use('api').attempt(payload.email, payload.password)
            return token
        } catch (error) {
            if (error?.name == 'ValidationException') {
                return response.badRequest(error.messages)
            }

            return response.status(500).json({
                message: 'Something went wrong.'
            })
        }
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const loginSchema = schema.create({
            email: schema.string([
                rules.email(),
                rules.exists({
                    table: 'users',
                    column: 'email'
                })
            ]),
            password: schema.string([
                rules.minLength(4)
            ])
        })

        try {
            const payload = await request.validate({
                schema: loginSchema
            })

            const token = await auth.use('api').attempt(payload.email, payload.password);

            return response.status(200).json(token)
        } catch (error) {
            if (error?.name == 'ValidationException') {
                return response.badRequest(error.messages)
            }

            return response.unauthorized({
                message: "Invalid credentials"
            })
        }
    }

    public async me({ auth }: HttpContextContract) {
        return {
            'user': auth.user
        }
    }

    public async logout({ auth }: HttpContextContract) {
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }
}
