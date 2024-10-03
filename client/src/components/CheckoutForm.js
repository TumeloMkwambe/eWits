import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../../src/StripeStyling.css'
import '../../src/globals.css'
import Sidebar from "./sidebar";

export default function CheckoutForm({dpmCheckerLink}) {
  const stripe = useStripe();
  const elements = useElements();

  const [messageStripe, setMessageStripe] = useState(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoadingStripe(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3001/completion",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessageStripe(error.message);
    } else {
      setMessageStripe("An unexpected error occurred.");
    }

    setIsLoadingStripe(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="DashboardContainer">
        <Sidebar/>
        <div className="ContentArea">
            <h1>Payments</h1>
            
                <form id="payment-form-stripe" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element-stripe" options={paymentElementOptions} />
                    <button disabled={isLoadingStripe || !stripe || !elements} id="button">
                    <span id="button-text-stripe">
                        {isLoadingStripe ? <div className="spinner-stripe" ></div> : "Pay now"}
                    </span>
                    </button>
                    {/* Show any error or success messages */}
                    {messageStripe && <div id="payment-message-stripe">{messageStripe}</div>}
                </form>
                {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
                <div>
                    <div id="dpm-annotation-stripe">
                    <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker-stripe">Preview payment methods by transaction</a>
                    </p>
                    </div>
                </div> 
        </div>
    </div>
    
  );
}
