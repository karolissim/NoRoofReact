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
router.get('/item/:id/:size_id/:color_id', async (req, res) => {
  const id = parseInt(req.params.id)
  const size = parseInt(req.params.size_id)
  const colorId = parseInt(req.params.color_id)

  try {
    const { rows } = await pool.query(
      `SELECT product.name, product.price, product.description, product.fit, product.fabric
       FROM product_color 
       JOIN color_size ON product_color.product_color_id = color_size.product_color_id 
       JOIN color ON product_color.color_id = color.color_id 
       JOIN size ON color_size.size_id = size.size_id 
       JOIN product ON product_color.product_id = product.product_id 
       WHERE product.product_id = $1 and size.size_id = $2 and color_size.product_color_id = $3;`,
      [id, size, colorId]
    )

    if (!rows.length === false) {
      res.status(200).send(rows[0])
    } else {
      res.status(404).send({ 'code': 404, 'message': 'Item not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': 'Item not found' })
  }
})

//Get item quantity of all sizes
router.get('/quantity/:id/:color_id', async (req, res) => {
  const id = parseInt(req.params.id)
  const colorId = parseInt(req.params.color_id)

  try {
    const { rows } = await pool.query(
      `SELECT color_size.quantity, size.size, size.size_id 
       FROM product_color 
       JOIN color_size ON product_color.product_color_id = color_size.product_color_id 
       JOIN color ON product_color.color_id = color.color_id 
       JOIN size ON color_size.size_id = size.size_id 
       JOIN product ON product_color.product_id = product.product_id 
       WHERE product.product_id = $1 and color_size.product_color_id = $2 
       ORDER BY color_size.size_id;`,
      [id, colorId]
    )

    if (!rows.length === false) {
      res.status(200).send(rows)
    } else {
      res.status(404).send({ 'code': 404, 'message': 'Item not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': 'Item not found' })
  }
})

router.get('/color/:id', async (req, res) => {
  const item_id = parseInt(req.params.id)

  try {
    const { rows } = await pool.query(
      `SELECT product_color.color_id, color_size.size_id, color.color, color.hex 
       FROM product_color 
       JOIN color_size ON product_color.product_color_id = color_size.product_color_id 
       JOIN color ON product_color.color_id = color.color_id 
       WHERE product_color.product_id = $1 
       ORDER BY product_color.color_id, color_size.size_id;`,
      [item_id]
    )

    var colorID
    var colors = []

    for (var i = 0; i < rows.length; i++) {
      if (i === 0) {
        colors.push(rows[i])
        colorID = rows[i].color_id
      } else if (rows[i].color_id !== colorID) {
        colors.push(rows[i])
        colorID = rows[i].color_id
      }
    }

    if (!rows.length === false) {
      res.status(200).send({ 'colors': colors })
    } else {
      res.status(404).send({ 'code': 404, 'message': "Item id doesn't exist" })
    }
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': "Item id doesn't exist" })
  }
})

// Update item quantity
router.put('/quantity/:pr_id/:sz_id/', async (req, res) => {
  const pr_id = parseInt(req.params.pr_id)
  const sz_id = parseInt(req.params.sz_id)
  const { quantity } = req.body

  try {
    await pool.query(
      `UPDATE color_size 
       SET quantity = quantity + $1 
       WHERE product_color_id = $2 AND size_id = $3;`,
      [quantity || 0, pr_id, sz_id]
    )

    res.status(200).send({ 'code': 200, 'message': 'Item quantity updated' })
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': 'Item not found' })
  }
})

// Check whether all items in cart are in stock
router.get('/pre-checkout', async (_req, res) => {
  try {
    const {rows} = await pool.query(
      `SELECT product.name, color_size.quantity, color_size.size_id, color.color, color_size.price_id, color_size.product_color_id 
       FROM color_size JOIN product_color ON color_size.product_color_id = product_color.product_color_id 
       JOIN product ON product_color.product_id = product.product_id 
       JOIN color ON  product_color.color_id = color.color_id;`
    )

    res.status(200).send(rows)
  } catch(error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': 'Not found' })
  }
})

// Get all items
router.get('/items', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT product.product_id, product.name, product.price, product_color.product_color_id, color_size.size_id 
       FROM product 
       JOIN product_color ON product.product_id = product_color.product_id 
       JOIN color_size ON product_color.product_color_id = color_size.product_color_id 
       ORDER BY product.product_id;`
    )

    var itemID
    var items = []

    for (var i = 0; i < rows.length; i++) {
      if (i === 0) {
        items.push(rows[i])
        itemID = rows[i].product_id
      } else if (rows[i].product_id !== itemID) {
        items.push(rows[i])
        itemID = rows[i].product_id
      }
    }

    res.status(200).send({ 'items': items })
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 104, 'message': 'Not found' })
  }
})

//Get item's photo ids
router.get('/photos/:item_id', async (req, res) => {
  const item_id = parseInt(req.params.item_id)

  try {
    const { rows } = await pool.query('SELECT photo_id, color_id FROM item_photos WHERE item_id = $1', [item_id])

    var photoIds = []
    var colorPhotoIds = []
    var colorId = rows[0].color_id

    rows.forEach((item) => {
      if (item.color_id === colorId) {
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

    res.status(200).send(photoIds)
  } catch (error) {
    console.log(error)
    res.status(404).send({ 'code': 404, 'message': 'Item not found' })
  }
})

module.exports = router
