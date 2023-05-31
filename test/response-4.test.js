import request from 'supertest'
import { app } from '../src/response-4'

test('Response', async () => {
  const response = await request(app).get('/api/v1')

  // expect(response.status).toBe(200)

  // expect(response.status).toBe(201)
  expect(response.get('Content-Type')).toContain('text/plain')
  // expect(response.text).toBe('Hello')

  // expect(response.status).toBe(302)
  // expect(response.get('Location')).toBe('/login')
})
