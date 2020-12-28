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
router.get('/item/:id/:size', (req, res) => {
    const id = parseInt(req.params.id)
    const size = req.params.size
  
    pool.query('SELECT product.product_id, color_size.product_color_id, color_size.size_id, product.name, product.price, product.description, product.fit, product.fabric, product.available_size, color.color, size.size, color_size.quantity FROM product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id JOIN size ON color_size.size_id = size.size_id JOIN product ON product_color.product_id = product.product_id WHERE product.product_id = $1 and size = $2',
      [id, size], (error, results) => {
        if (error) {
          throw error
        }
        res.json(results.rows[0])
    })
})

// Get item quantity when item size is being changed
router.get('/quantity/:id/:size', (req, res) => {
    const id = parseInt(req.params.id)
    const size = req.params.size
  
    pool.query('SELECT color_size.quantity, color_size.size_id FROM  product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id JOIN size ON color_size.size_id = size.size_id JOIN product ON product_color.product_id = product.product_id WHERE product.product_id = $1 and size = $2',
      [id, size], (error, results) => {
        if (error) {
          throw error
        }
        res.json(results.rows[0])
    })
})

//Get item quantity of all sizes
router.get('/quantity/:id', (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT color_size.quantity, size.size, size.size_id FROM  product_color JOIN color_size ON product_color.product_color_id = color_size.product_color_id JOIN color ON product_color.color_id = color.color_id JOIN size ON color_size.size_id = size.size_id JOIN product ON product_color.product_id = product.product_id WHERE product.product_id = $1 ORDER BY color_size.size_id',
    [id], (error, results) => {
      if(error) {
        throw error
      }
      res.json(results.rows)
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
        if(error){
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
router.get('/item', (_req, res) => {
    pool.query('SELECT * FROM product ORDER BY product_id;',
        (error, results) => {
            if(error)
                throw error
            res.send({'items' : results.rows})
    })
})

module.exports = router
