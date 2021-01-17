const router = require('express').Router()
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/charge', async (req, res) => {
    const token = req.body.token
    const amount = req.body.amount

    const charge = await stripe.charges.create({
        amount: amount,
        currency: 'eur',
        description: 'Example charge',
        source: token
    })

    res.json(charge)
})

module.exports = router