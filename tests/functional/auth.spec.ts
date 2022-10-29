import { test } from '@japa/runner'

test('register user', async ({ client }) => {
  const response = await client.post('/register').form({
    name: 'Jon Doe',
    email: 'jon.doe@mailinator.com',
    password: '123456',
    password_confirmation: '123456',
  })

  response.assertStatus(200)
})
