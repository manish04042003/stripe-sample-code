// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Mx8HRSJ4QSCX8qS17rdfGxw9ORpjMnYlUiO4T1bdDfhOopVzKREjIKsZRYgy9C1D5dZfWr3taJGT7YOk4fEKbtl00tgXoWSfs');

const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1MxBo8SJ4QSCX8qSfDF08HVK',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});


app.post('/create-product', async (req, res) => {
  const product = await stripe.products.create({
    name: 'Gold Special',
  });
  console.log(product);
})


app.listen(4242, () => console.log('Running on port 4242'));