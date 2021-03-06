const express = require("express");
const app = express();
const fetch = require('node-fetch');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./api/routes');
const apiStripe = require('./api/stripe')
var cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const DOMAIN_URL = process.env.DOMAIN_URL;

const port = 3030;
const server = http.createServer(app);
const endpointSecret = 'whsec_kHHJ5iKPMkUcFtQw6vx6ygNt6JU1Pf4O';

app.use(cookieParser());

app.use(cors());

app.use(express.json({
  verify: function(req, res, buf) {
    if (req.originalUrl.startsWith('/webhook')) {
      req.rawBody = buf.toString();
    }
  }
}))

app.use('/api', apiRoutes)
app.use('/stripe', apiStripe)

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

// Create Stripe checkout session
app.post('/create-session', async (req, res) => {
  var items = req.body.inStock;

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'required',
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    metadata: {
      colorId: req.body.colorIds,
      sizeIds: req.body.sizeIds,
      amount: req.body.amount
    },
    success_url: `${DOMAIN_URL}/success`,
    cancel_url: `${DOMAIN_URL}/canceled?session_id={CHECKOUT_SESSION_ID}`
  });

  //Add session id to cookies to check if payment succeeded
  res.cookie('key', session.id, {httpOnly: false});
  res.cookie('status', 'false', {httpOnly: false});

  res.send({
    id: session.id
  });
});

// Create webhook for Stripe to monitor checkout
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const payload = request.rawBody;
  const sig = request.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const metadata = event.data.object.metadata;
    console.log(metadata);

    console.log("Payment id: " + event.data.object.id);
  }

  if(event.type === 'payment_intent.payment_failed') {
    console.log("FAILED")
    console.log(event.data.object);
  }

  response.status(200);
});

app.use(express.static(__dirname));

// Start server
server.listen(port, function() {
  console.log('Server started on port ' + port);
});
