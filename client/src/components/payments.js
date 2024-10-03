// components/PaymentApp.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // Import CheckoutForm
import CompletePage from "./CompletePage"; // Import CompletePage
import '../../src/StripeStyling.css'; // CSS for styling

const stripePromise = loadStripe("pk_test_51Q5K2cIGdJX290o6AGtNDjFKDaLF60nyLuGlhI3NMCdXsHYPTKAMd3CodrnWBf944hzuC0A5nNPjqPaRSaOcnYLv00nCmlil7h");

export default function PaymentApp() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false); // State to track payment completion

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => { 
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
     
      {clientSecret && !paymentCompleted && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm dpmCheckerLink={dpmCheckerLink} onPaymentComplete={() => setPaymentCompleted(true)} />
        </Elements>
      )}
      {paymentCompleted && <CompletePage />} {/* Render CompletePage when payment is completed */}
    </div>
  );
}
