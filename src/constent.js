import stripe from 'stripe';

export const DB_Name = 'ecommerce';
export const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
