"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
(0, runner_1.test)('register user', async ({ client }) => {
    const response = await client.post('/register').form({
        name: 'Jon Doe',
        email: 'jon.doe@mailinator.com',
        password: '123456',
        password_confirmation: '123456',
    });
    response.assertStatus(200);
});
//# sourceMappingURL=auth.spec.js.map