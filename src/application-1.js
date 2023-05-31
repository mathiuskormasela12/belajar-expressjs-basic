import express from 'express'

// Membuat object Application (Ini object utama dalam Express)
const app = express()

// Membuat routing sederhana (hanya mendefinisikan object, bkn menjalakankan aplikasi kita)
app.get('/', (req, res) => {
  // Mereturn response ke client
  res.send('Hello')
})

// Untuk menjalankan aplikasi kita di sebuah port, jika kita tidak melakukan ini maka express js tidak akan berjalan
app.listen(3000, () => {
  console.log('Express is being run at port 3000')
})

export default app
