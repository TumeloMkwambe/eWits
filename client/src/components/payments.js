// components/PaymentApp.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; 
import CompletePage from "./CompletePage"; 
import '../../src/StripeStyling.css'; 
import Sidebar from "./sidebar";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function PaymentApp() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false); // State to track payment completion

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.URI_STRIPE}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "Volvo", amount: 1450000 }] }),
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
    // customerSessionClientSecret,
    appearance,
  };

  return (
    <div className="DashboardContainer">
      <Sidebar/>
      <div className="ContentArea">
          {clientSecret && !paymentCompleted && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm dpmCheckerLink={dpmCheckerLink} onPaymentComplete={() => setPaymentCompleted(true)} />
            </Elements>
            )}
        {paymentCompleted && <CompletePage />} {/* CompletePage when payment is completed */}
      </div>
     
      
    </div>
  );
}
