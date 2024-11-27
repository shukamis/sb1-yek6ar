export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval?: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  stripeCustomerId: string;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
  subscriptionId: string | null;
  currentPeriodEnd: string | null;
}

export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  createdAt: string;
  productId: string;
}