import request from 'supertest'
import { app } from '../src/middleware-5'

it('Test Get Cookie', async () => {
  const response = await request(app).get('/handle-cookie').set('Cookie', 'My-Name=Mathius;old=21')
  expect(response.status).toBe(200)
  expect(response.text).toContain('Mathius')
  expect(response.text).toContain('21')
})
