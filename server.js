require("dotenv").config();
// This is your test secret API key.
const stripe = require('stripe')(process.env.KEY);

const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';
let priceID= ''

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: priceID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});


// app.post('/create-product', async (req, res) => {
  
// })
async function createProduct(name){
  const product = await stripe.products.create({
    name: name,
  })
  console.log(product);
  console.log('----------------------------------------------------------------------------------------')
  const price = await stripe.prices.create({
    unit_amount: 1200,
    currency: 'inr',
    product: `${product.id}`,
  });
  console.log(price)

  priceID = price.id;
}

createProduct('manish1');





app.listen(4242, () => console.log('Running on port 4242'));