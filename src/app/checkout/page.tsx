'use client'
import React from 'react'
import { Elements, StripeElementsOptions } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_componnent/CheckoutForm'
import { useSearchParams } from 'next/navigation';

// Ensure that the environment variable is defined and a string
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY as string);

function Checkout() {
	const searchParams = useSearchParams();
	const amount = searchParams.get('amount');
	
	// Handle case where amount might be null
	const amountInCents = amount ? Number(amount) * 100 : 0;

	const options: StripeElementsOptions = {
		clientSecret: process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET as string, // Ensure clientSecret is set
	}

	return (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm amount={amountInCents} />
		</Elements>
	)
}

export default Checkout
