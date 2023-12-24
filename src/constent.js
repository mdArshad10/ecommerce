import { config } from 'dotenv';
import stripe from 'stripe';
config({ path: './.env' });

const DB_Name = 'ecommerce';
const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT;
const mongodbURL = process.env.MONGO_URL;
const corsOrigin = process.env.ORIGIN;

//  cloudinary
const cloudinaryName = process.env.CLOUDINARY_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

// #  Token
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES;

// # Stripe
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const StripeSecretKey = process.env.STRIPE_SECRET_KEY;

export {
	DB_Name,
	Stripe,
	port,
	mongodbURL,
	corsOrigin,
	cloudinaryName,
	cloudinaryApiKey,
	cloudinaryApiSecret,
	accessTokenSecretKey,
	accessTokenExpires,
	stripePublicKey,
	StripeSecretKey,
};
