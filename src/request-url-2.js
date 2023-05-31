import express from 'express'

export const app = express()

app.get('/api/v1', (req, res) => {
  res.send({
    // Full api url (dari path /api/v1 dst)
    originalUrl: req.originalUrl,

    // Base Url api kita, akan muncul klo kita sudah grouping routing (kondisi skrg result nya hanyalah string kosong)
    baseUrl: req.baseUrl,

    // Pathname nya (/api/v1) tanpa query params
    path: req.path,

    // Host name (localhost atau 127.0.01)
    hostname: req.hostname,

    // Protocol (http atau https)
    protocol: req.protocol,

    // Kalau https maka secure nya itu true
    // kalao http maka secure nya false
    secure: req.secure,

    // Subdomains (array subdomain)
    // misal jika domain kita http://app.chat.mathius.com
    // maka sudomainnya adadalah ["app", "chat"]
    subdomains: req.subdomains
  })
})

// app.listen(3000, () => {
//   console.log('Run at port', 3000)
// })
