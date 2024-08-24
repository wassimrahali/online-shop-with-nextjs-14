'use client'
import React, { useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (stripeError) {
      setError(stripeError.message || 'An error occurred');
      setIsProcessing(false);
      return;
    }

    // Handle payment submission to your backend
    // For example, call your API to create a payment intent
    // and complete the payment

    // Reset processing state
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <CardElement className="p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button 
        type="submit" 
        disabled={isProcessing || !stripe} 
        className={`w-full py-2 px-4 text-white font-semibold rounded-md focus:outline-none ${isProcessing ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
