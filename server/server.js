const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();
const stripe = require("stripe")("sk_test_51Q5K2cIGdJX290o6Kodmu2dyzuBTMtqaxYuJLkLVpP4QGIiig15QUhpYiNgLOP2DUhUtmCP23oxFdJXYDHilOXEN00rkGnSOAs");

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" })); // Allow requests from port 3001

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "zar",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});

app.listen(5252, () => console.log("Node server listening on port 5252!"));
