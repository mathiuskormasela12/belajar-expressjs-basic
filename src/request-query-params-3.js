import express from 'express'

export const app = express()

app.get('/api/v1', (req, res) => {
  // Mendapatkan request headers. Cara yg paling banyak digunakan (case insensitive)
  // const accept = req.get('Accept')

  // Mendapatkan request headers. (case insensitive)
  const accept = req.header('accept')

  // req.query mendefinisilan query params
  // jika user tidak mengirim query params
  // maka default nya adalah empty object {}
  res.send(`Hello ${req.query.firstName} ${req.query.lastName} ${accept}`)
})

// app.listen(3000, () => {
//   console.log('Run at port', 3000)
// })
