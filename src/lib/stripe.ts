import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface CreateCheckoutSessionParams {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerId,
  metadata,
}: CreateCheckoutSessionParams) {
  try {
    const response = await axios.post(`${API_URL}/create-checkout-session`, {
      priceId,
      successUrl,
      cancelUrl,
      customerId,
      metadata,
    });

    const { sessionId } = response.data;
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function createPortalSession(customerId: string) {
  try {
    const response = await axios.post(`${API_URL}/create-portal-session`, {
      customerId,
    });

    const { url } = response.data;
    window.location.href = url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new Error('Failed to create portal session');
  }
}