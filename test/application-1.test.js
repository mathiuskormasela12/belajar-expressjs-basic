import express from 'express'
import request from 'supertest'

// Membuat object Application (Ini object utama dalam Express)
const app = express()

// Membuat routing sederhana (hanya mendefinisikan object, bkn menjalakankan aplikasi kita)
app.get('/', (req, res) => {
  // Mereturn response ke client
  res.send('Hello')
})

// Testing express js
test('Test Application', async () => {
  const response = await request(app).get('/')
  expect(response.status).toBe(200)
  expect(response.text).toBe('Hello')
})
