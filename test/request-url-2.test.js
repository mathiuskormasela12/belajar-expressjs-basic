import request from 'supertest'
import { app } from '../src/request-url-2'

test('Request Url', async () => {
  const response = await request(app).get('/api/v1').query({ name: 'mathius' })
  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    originalUrl: '/api/v1?name=mathius',
    baseUrl: '',
    path: '/api/v1',
    hostname: '127.0.0.1',
    protocol: 'http',
    secure: false,
    subdomains: []
  })
})
