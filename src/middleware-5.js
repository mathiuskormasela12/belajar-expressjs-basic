/*
	========== Middleware ==========

	Middleware merupakan sebuah callback function
	(yang akan menerima 3 paramater yaitu request yang berupa obect
	javascript, response yang berupa object javascript juga
	dan next yang merupakan sebuah function yang ketika
	di panggil akan membuat express mengeksekusi routernya dalam
	express js ) yang akan di eksekusi sebelum
	router tereksekusi.

	Jadi dalam aplikasi life cycle express js,
	kita user melakukan request ke server, maka
	setelah request tersebut masuk ke dalam server
	maka pertama-tama akan di handle oleh middleware
	terlebih dahulu setelah itu dari middleware
	akan di teruskan ke middleware lain itu langsung
	ke router.

	Pengeksekusian middleware juga bersifat sequential
	dimana setiap route yg di bawah middlewarenya
	akan terkena efek middleware tersebut.

	Dengan middleware kita dapat melakukan banyak hal :
	1. Memvalidasi request yang di kirim user
	2. Autorisasi dengan jwt
	3. Melakuan modifikasi terhadap object request dan object response (karena object request dan response merupakan native javascript object)

	Dalam Express Js sendiri terdapat beberapa jenis middleware :
	1. Application Level Middleware
	   Middleware yang di jalankan di file utama express js kita
		 Dimana akan di pasangkan dengan object Application Express Js
		 dan ini akan menjadikannya global middleware. Middleware
		 jenis ini akan selalu di ekseskusi ketika ada request yang masuk
		 kedalam server.

	2. Router Level Middleware
	  Middlware ini akan di jalankan di file router kita.
		Dimana ini menjadikan middlware jenis ini hanya
		akan di eksekusi ketika user mengases routing
		yang di buat menggunakan router yg memiliki middleware

	3. Error Handling Middleware
	  Middleware jenis ini merupakan middleware yang akan di jalanakna
		ketika terjadi error. Jadi dengan middleware ini kita dapat
		menampilkan halaman error ketika terjadi error pada aplikasi kita.
		Middleware jenis ini akan menerima 4 parameter, yang pertama
		parameter error, request, resposne dan next functon. (berurutan)

	4. Built-in Middleware
	   Middleware-middleware yang sudah di buatkan langsung oleh
		 express js dan kita hanya perlu untuk menggunakannya.

		 Contohnya :
		 a. express.json() => untuk membuat express js parsing request body ke json
		 b. express.urlencoded() => untuk membuat express js parsing request body ke url-encoded
		 c.  express.static() untuk serve static file di express js
		 d. express.raw() untuk mengallow express js menerima request body
		                  berupa Buffer
	   e. express.text() untuk mengallow express js menerima request body berupa text

	5.Third-party Middleware
	   Middleware-middleware yang dapat kita download dari website npm
		 guna untuk membantu kita melakukan sesuatu. Misal middleware
		cookie-parser.
*/

import express from 'express'
import { extname, join, dirname } from 'path'
import url from 'url'
import cookieParser from 'cookie-parser'
import expressFileUpload from 'express-fileupload'
// import { engine } from 'express-handlebars'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const app = express()

// Built-in middleware
// Untuk mengallow node js menerima request body dalam bentuk json
app.use(express.json())
// Untuk mengallow node js menerima request body berbentuk form data
// jike extended nya false maka body akan di parse menggunakan querystring library
// jika extended nya true maka body akan di parse menggunakan qs library
// default nya true, tpi better set ke false, karena default nya udh deprecated
app.use(express.urlencoded({ extended: false }))

app.use(expressFileUpload({
  createParentPath: true
}))

// Untuk memparsing request body menjadi text
// app.use(express.text())

// app.use(express.raw())

// untuk serve static files
// app.use('/assets', express.static(join(__dirname, '../public')))

// Third-Party middlware
// setup middleware cookie parser
// app.use(cookieParser())

// Setup middleware cookie parser dengan signed cookie
app.use(cookieParser('INI_SECRET_KEY_NYA'))

// Application Middleware
const setDateNow = (req, res, next) => {
  // req.app.locals untuk menyimpan data di request object, contoh bisa di pake untuk nyimpen decoded jwt-token
  if (!req.app.locals.now) req.app.locals.now = Date.now()

  next()
}

// Binding middleware ke Application object
app.use(setDateNow)

app.get('/api', (req, res) => {
  res.send(`Ini adalah date now dari application middleware ${req.app.locals.now}`)
})

// Membuat Router
const router = express.Router()

// Binding router ke Application object
app.use(router)

app.route('/handle-cookie')
  .get((req, res) => {
    // Untuk mengambil data cookie ada 2 cara, dengan req.cookies['namaCookie'] atau req.cookies.namaCookie

    // Cara pertama (karena key cookie nya dipisah dengan tanda dash)
    let name = req.cookies['My-Name']

    // Cara kedua (karena key cookie nya simple hanya satu huruf dan tidak ada tanda dash atau spasi)
    let age = req.cookies.old

    // Ketika menggunakan signed cookie, kita tidak bisa lgi akses cookie nya dengan req.cookies karena sudah jdi empty obejct
    name = req.signedCookies['My-Name']
    age = req.signedCookies.old
    console.log(req.cookies, req.signedCookies)
    res.send(`${name}-${age}`)
  })
  .post((req, res) => {
    // Write Cookie
    // max-age umur maksiumal cookie nya akan aktif selama 5000 milisecond (5 detik)
    // path: '/' berarti cookie nya akan aktif di semua route, karena / merupakan route paling awal
    // klo kita tidak definisikan path nya maka cookie nya akan aktif pada route yg skrg aja yaitu /handle-cookie
    // res.cookie('My-Name', req.body.name, { maxAge: 720000, path: '/' })
    // res.cookie('old', req.body.old, { maxAge: 720000, path: '/' })

    // Write cookie dengan signed cookie
    res.cookie('My-Name', req.body.name, { maxAge: 720000, path: '/', signed: true })
    res.cookie('old', req.body.old, { maxAge: 720000, path: '/', signed: true })

    res.send('Cookie is written and will active for 5 seconds')
  })
  .delete((req, res) => {
    // Clear cookie cara pertama
    res.clearCookie('My-Name', '', { maxAge: 720000, path: '/' })
    res.clearCookie('old', null, { maxAge: 720000, path: '/' })

    // Clear cookie cara kedua
    // res.cookie('My-Name', '', { maxAge: -720000, path: '/' })
    // res.cookie('old', null, { maxAge: -720000, path: '/' })

    // Jadi sebenrnya tidak ada clear cookie
    // hanya saja biasnaya kita menimpa data cookie yg sudah ada
    // dan set maxAge nya itu menjadi masa lalu

    res.send('Cookies are deleted')
  })

app.get('/get-cookie', (req, res) => {
  // Read signed cookie
  const name = req.signedCookies['My-Name']
  res.send(`Name : ${name ?? '-'}`)
})

// Router Level Middleware
const setName = (req, res, next) => {
  req.name = 'Mathius'

  next()
}

router.use(setName)

router.get('/user', (req, res) => {
  res.send('Halo ' + req.name)
})

// Router path, kita bisa membuat path yg dinamis menggunakan regex
// Secara default express sudah memakai library path-to-regex untuk melakukan hal itu
// kita bisa liat dokumentasi path-to-regex untuk menulis regexnya
// callback route ini akan di eksekusi jika pathnya itu
// /route-with-regex/namanya-apa-pun-asalahkan-di-akhiri-dengan-ekstensi.json
router.get('/route-with-regex/*.json', (req, res) => {
  res.send(`Route with Regex: ${req.originalUrl}`)
})

router.get('/route-angka/(\\d+)', (req, res) => {
  res.send('Route angka')
})

// Route Parameyter
router.get('/data/:nama', (req, res) => {
  const nama = req.params.nama
  res.send('Hi ' + nama)
})

// Jika kita memiliki beberapa HTTP method yg memiliki path yg sma kita bisa menggunakan .route
// bisa juga di lakukan di application level
router.route('/coba')
  .get((req, res) => res.send('Coba Get'))
  .delete((req, res) => res.send('Delete : ' + req.params.tgl))
  .post((req, res) => {
    res.send({
      ...req.body
    })
  })

router.post('/test-parsing', (req, res) => {
  res.send(req.body)
})

router.post('/test-upload', (req, res) => {
  const photo = req.files.photo
  let filename = photo.name.split('.').shift()
  filename += '-'
  filename += Date.now()
  filename += extname(photo.name)

  photo.mv(join(__dirname, '../public/' + filename))
  res.send(`Uploading ${filename}`)
})

router.get('/biodata', (req, res) => {
  res.render('home', {
    name: 'Mathius',
    title: 'Home',
    hobi: [
      {
        id: 1,
        nama: 'Ngoding'
      },
      {
        id: 2,
        nama: 'Musik'
      }
    ]
  })
})

// Error Handling Middleware biasnaya di taruh di akhir file
app.use((err, req, res, next) => {
  res.send(`Terjadi Error : ${err.message}`)
})

// Not Found Error handling (klo route yg di akses gk ada, akan eksekusi middleware ini)
app.use((req, res, next) => {
  res.status(404).send('Gk ada bre')
})

app.listen(3000, () => {
  console.log('App run at port 3000')
})
