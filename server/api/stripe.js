const router = require('express').Router()
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/charge', async (req, res) => {
  const { amount, email, shipping } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      payment_method_types: ['card'],
      receipt_email: email,
      shipping: shipping
    })

    res.status(200).send({ client_secret: paymentIntent.client_secret })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router