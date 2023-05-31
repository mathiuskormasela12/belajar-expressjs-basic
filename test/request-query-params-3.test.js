import request from 'supertest'
import { app } from '../src/request-query-params-3'

test('Request Query Params & Header', async () => {
  // Untuk mendefinisikan query params di supertest bisa menggunakan method().query(object query params)
  // Untuk mendefinisilan headers bisa menggunakna method .set()
  const response = await request(app).get('/api/v1').set('Accept', 'text/plain').query({ firstName: 'Mathius', lastName: 'Kormasela' })
  expect(response.status).toBe(200)
  expect(response.text).toBe('Hello Mathius Kormasela text/plain')
})
