"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async register({ auth, request, response }) {
        const newUserSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            email: Validator_1.schema.string([
                Validator_1.rules.email(),
                Validator_1.rules.unique({
                    table: 'users',
                    column: 'email',
                }),
            ]),
            password: Validator_1.schema.string([Validator_1.rules.confirmed(), Validator_1.rules.minLength(4)]),
        });
        try {
            const payload = await request.validate({
                schema: newUserSchema,
            });
            await User_1.default.create({
                name: payload.name,
                email: payload.email,
                password: payload.password,
            });
            const token = await auth.use('api').attempt(payload.email, payload.password);
            return token;
        }
        catch (error) {
            if (error?.name === 'ValidationException') {
                return response.badRequest(error.messages);
            }
            return response.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }
    async login({ auth, request, response }) {
        const loginSchema = Validator_1.schema.create({
            email: Validator_1.schema.string([
                Validator_1.rules.email(),
                Validator_1.rules.exists({
                    table: 'users',
                    column: 'email',
                }),
            ]),
            password: Validator_1.schema.string([Validator_1.rules.minLength(4)]),
        });
        try {
            const payload = await request.validate({
                schema: loginSchema,
            });
            const token = await auth.use('api').attempt(payload.email, payload.password);
            return response.status(200).json(token);
        }
        catch (error) {
            if (error?.name === 'ValidationException') {
                return response.badRequest(error.messages);
            }
            return response.unauthorized({
                message: 'Invalid credentials',
            });
        }
    }
    async me({ auth }) {
        return {
            user: auth.user,
        };
    }
    async logout({ auth }) {
        await auth.use('api').revoke();
        return {
            revoked: true,
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map