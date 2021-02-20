const router = require('express').Router()
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/charge', async (req, res) => {
    const token = req.body.token
    const amount = req.body.amount

    try {
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'eur',
            description: 'Example charge',
            source: token,
            receipt_email: 'karolis70012@gmail.com'
        })
        res.status(200).send(charge)
    } catch(error) {
        res.status(404).send(error)
    }
})

module.exports = router