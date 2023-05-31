import express from 'express'

export const app = express()

app.get('/api/v1', (req, res) => {
  // Response menedefinisikan Http Response

  // Mendefinsikan response status
  // res.status(201)

  // Mendefinisikan response status tanpa mereturn response body
  res.status(200).end()

  // Mendefinisikan response header
  // res.set('Content-Type', 'application/json')
  // res.set({
  //   'Content-Type': 'application/json'
  // })
  // res.header('Content-Type', 'text/plain')

  // Mendefinisikan response body
  // res.send('Hello')

  // Mendefinisikan response redirect dengan response status 302
  // res.redirect('/login')
})

// app.listen(3000, () => {
//   console.log('Run at port', 3000)
// })
