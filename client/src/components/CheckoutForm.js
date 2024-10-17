import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../StripeStyling.css';
import '../globals.css';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export default function CheckoutForm({ onPaymentComplete }) {
  const stripe = useStripe();
  const elements = useElements();

  const [messageStripe, setMessageStripe] = useState(null);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  
  useEffect(() => {
    const storedData = localStorage.getItem('ticketPurchase');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCustomerDetails({
        firstname: parsedData.firstname || '',
        lastname: parsedData.lastname || '',
        email: parsedData.email || ''
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoadingStripe(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/completion`,
          payment_method_data: {
            billing_details: {
              name: `${customerDetails.firstname} ${customerDetails.lastname}`,
              email: customerDetails.email
            }
          }
        }
      });

      if (error) {
        setMessageStripe(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessageStripe('Payment successful!');
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      }
    } catch (err) {
      setMessageStripe('An unexpected error occurred.');
      console.error('Payment error:', err);
    } finally {
      setIsLoadingStripe(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <main id="main-stripe">
      <h1 id="h1-stripe">Complete Your Payment</h1>
      <form id="payment-form-stripe" onSubmit={handleSubmit}>
        <div className="customer-details">
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstname"
              value={customerDetails.firstname}
              onChange={(e) => setCustomerDetails(prev => ({...prev, firstname: e.target.value}))}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastname"
              value={customerDetails.lastname}
              onChange={(e) => setCustomerDetails(prev => ({...prev, lastname: e.target.value}))}
              required
            />
          </FormGroup>
{/* 
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails(prev => ({...prev, email: e.target.value}))}
              required
            />
          </FormGroup> */}
        </div>

        <PaymentElement id="payment-element-stripe" options={paymentElementOptions} />
        
        <button disabled={isLoadingStripe || !stripe || !elements} id="button-stripe">
          <span id="button-text-stripe">
            {isLoadingStripe ? <div id="spinner-stripe"></div> : "Pay now"}
          </span>
        </button>
        
        {messageStripe && <div id="payment-message-stripe">{messageStripe}</div>}
      </form>
    </main>
  );
}