const router = require('express').Router()
const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

router.get('/', (_req, res) => {
  res.json({
    status: "router works",
    message: "Welcome to noRoof API"
  })
})

// Get item data when item is clicked from shop screen
router.get('/item/:id/:size_id/:color_id', (req, res) => {
  const id = parseInt(req.params.id)
  const size = parseInt(req.params.size_id)
  const colorId = parseInt(req.params.color_id)

  pool.query('SELECT product.product_id, color_size.product_color_id, color_size.size_id, product.name, product.price, product.description, product.fit, product.fabric, color.color FROM product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id JOIN size ON color_size.size_id = size.size_id JOIN product ON product_color.product_id = product.product_id WHERE product.product_id = $1 and size.size_id = $2 and color_size.product_color_id = $3',
    [id, size, colorId], (error, results) => {
      if (error) {
        throw error
      }
      res.json(results.rows[0])
    })
})

//Get item quantity of all sizes
router.get('/quantity/:id/:color_id', (req, res) => {
  const id = parseInt(req.params.id)
  const colorId = parseInt(req.params.color_id)

  pool.query('SELECT color_size.quantity, size.size, size.size_id FROM product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id JOIN size ON color_size.size_id = size.size_id JOIN product ON product_color.product_id = product.product_id WHERE product.product_id = $1 and color_size.product_color_id = $2 ORDER BY color_size.size_id;',
    [id, colorId], (error, results) => {
      if (error) {
        throw error
      }
      res.json(results.rows)
    }
  )
})

router.get('/color/:id', (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT product_color.color_id, color_size.size_id, color.color, color.hex FROM product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id WHERE product_color.product_id = $1 ORDER BY product_color.color_id, color_size.size_id;',
    [id], (error, results) => {
      if(error){
        throw error
      }

      var colorID
      var colors = []

      for (var i = 0; i < results.rows.length; i++) {
        if (i === 0) {
          colors.push(results.rows[i])
          colorID = results.rows[i].color_id
        } else if (results.rows[i].color_id !== colorID) {
          colors.push(results.rows[i])
          colorID = results.rows[i].color_id
        }
      }

      res.send({ 'colors' : colors })
    }
  )
})

// Update item quantity
router.put('/quantity/:pr_id/:sz_id/:quantity', (req, res) => {
  const pr_id = parseInt(req.params.pr_id);
  const sz_id = parseInt(req.params.sz_id);
  const quantity = parseInt(req.params.quantity);

  pool.query(
    'UPDATE color_size SET quantity = quantity + $1 WHERE product_color_id = $2 AND size_id = $3',
    [quantity, pr_id, sz_id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.json(results.rows)
    }
  )
})

// Check whether all items in cart are in stock
router.get('/pre-checkout', (_req, res) => {
  pool.query('SELECT product.name, color_size.quantity, color_size.size_id, color.color, color_size.price_id, color_size.product_color_id FROM color_size JOIN product_color ON color_size.product_color_id = product_color.product_color_id JOIN product ON product_color.product_id = product.product_id JOIN color ON  product_color.color_id = color.color_id;',
    (error, results) => {
      if (error) {
        throw error
      }
      res.send(results.rows)
    })
})

// Get all items
router.get('/items', (_req, res) => {
  pool.query('SELECT DISTINCT product.product_id, product.name, product.price, product_color.product_color_id, color_size.size_id FROM product JOIN product_color ON product.product_id = product_color.product_id JOIN color_size ON product_color.product_color_id = color_size.product_color_id ORDER BY product.product_id;',
    (error, results) => {
      if (error)
        throw error

      var itemID
      var items = []

      for (var i = 0; i < results.rows.length; i++) {
        if (i === 0) {
          items.push(results.rows[i])
          itemID = results.rows[i].product_id
        } else if (results.rows[i].product_id !== itemID) {
          items.push(results.rows[i])
          itemID = results.rows[i].product_id
        }
      }

      res.send({ 'items': items })
    })
})

//Get item's photo ids
// router.get('/photos/:item_id/:color_id', (req, res) => {
//   const item_id = parseInt(req.params.item_id)
//   const color_id = parseInt(req.params.color_id)

//   pool.query(
//     'SELECT photo_id FROM item_photos WHERE item_id = $1 AND color_id = $2',
//     [item_id, color_id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       var photoIds = []
//       results.rows.forEach((item) => {
//         photoIds.push(item.photo_id)
//       })
//       res.json(photoIds)
//     }
//   )
// })

router.get('/photos/:item_id', (req, res) => {
  const item_id = parseInt(req.params.item_id)

  pool.query(
    'SELECT photo_id, color_id FROM item_photos WHERE item_id = $1',
    [item_id],
    (error, results) => {
      if (error) {
        throw error
      }

      var photoIds = []
      var colorPhotoIds = []
      var colorId = results.rows[0].color_id
      
      results.rows.forEach((item) => {
        if (item.color_id === colorId){
          colorPhotoIds.push(item.photo_id)
        } else {
          photoIds.push({
            'color_id': colorId,
            'photo_ids': colorPhotoIds
          })
          colorId = item.color_id
          colorPhotoIds = []
          colorPhotoIds.push(item.photo_id)
        }
      })

      photoIds.push({
        'color_id': colorId,
        'photo_ids': colorPhotoIds
      })
      console.log(photoIds)
      res.json(photoIds)
    }
  )
})

module.exports = router
