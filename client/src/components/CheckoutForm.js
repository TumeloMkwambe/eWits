import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../../src/StripeStyling.css'
import '../../src/globals.css'


export default function CheckoutForm({dpmCheckerLink}) {
  const stripe = useStripe();
  const elements = useElements();

  const [messageStripe, setMessageStripe] = useState(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) return;
  
    setIsLoadingStripe(true);
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "http://localhost:3001/completion" },
    });
  
    if (error) {
      setMessageStripe(error.message);
    } else {
      // just put this here just incase
      const taxCalculation = await fetch("/create-tax-calculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* nothing for now */ }),
      });
  
      const taxTransaction = await fetch("/create-tax-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TAX_CALCULATION: taxCalculation.id,
          PAYMENT_INTENT_ID: paymentIntent.id,
        }),
      });
  
      
    }
  
    setIsLoadingStripe(false);
  };
  

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
        <main id="main-stripe">
          <h1>Payments</h1>
              <form id="payment-form-stripe" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element-stripe" options={paymentElementOptions} />
                  <button disabled={isLoadingStripe || !stripe || !elements} id="button-stripe">
                      <span id="button-text-stripe">
                            {isLoadingStripe ? <div id="spinner-stripe" ></div> : "Pay now"}
                        </span>
                  </button>
                    
                  {messageStripe && <div id="payment-message-stripe">{messageStripe}</div>}
              </form>
              {/* [DEV]: Dont Edit peeps */}
                <div>
                <div id="dpm-stripe">
                  <p>
                      Thank YOU.&nbsp;
                  <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker-stripe">eWits</a>
                  </p>
                    
                  </div>
               </div>
        </main> 
  );
}
