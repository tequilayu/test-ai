# Stripe Integration Guide

This document explains how the Stripe integration works in this application.

## Webhook Events Handled

The application handles the following Stripe webhook events:

### 1. checkout.session.completed
- Triggered when a customer completes a payment
- Uses the `client_reference_id` to find the associated order
- Updates the order status to "completed"
- Stores the subscription/customer information
- Creates or updates the subscription record in the database

### 2. invoice.payment_succeeded
- Triggered when a recurring payment is successful
- Updates the subscription period dates
- Sets the subscription status to "active"

### 3. invoice.payment_failed
- Triggered when a recurring payment fails
- Sets the subscription status to "past_due"

### 4. customer.subscription.created
- Triggered when a new subscription is created
- Creates a subscription record in the database

### 5. customer.subscription.updated
- Triggered when a subscription is updated
- Updates the subscription details in the database
- Handles changes to billing cycle, status, and cancellation settings

### 6. customer.subscription.deleted
- Triggered when a subscription is cancelled
- Updates the subscription status to "cancelled"
- Sets the ended_at timestamp

## Database Schema

The integration uses two main tables:

### Orders Table
Stores information about payment transactions:
- `id`: UUID primary key
- `user_id`: Reference to the user
- `plan_id`: The subscription plan (basic/premium)
- `billing_cycle`: Payment frequency (monthly/yearly)
- `amount`: Payment amount
- `status`: Order status (pending/completed)
- `payment_link`: Stripe payment link
- `payment_intent_id`: Stripe payment intent ID

### Subscriptions Table
Stores information about user subscriptions:
- `id`: UUID primary key
- `user_id`: Reference to the user
- `subscription_id`: Stripe subscription ID
- `customer_id`: Stripe customer ID
- `status`: Subscription status (active/past_due/cancelled)
- `plan_id`: The subscription plan
- `billing_cycle`: Payment frequency
- `current_period_start`: Current billing period start
- `current_period_end`: Current billing period end
- `cancel_at_period_end`: Whether to cancel at period end

## Implementation Details

### Client Reference ID
When creating a payment link, the application uses the `client_reference_id` parameter to link Stripe events back to our system:
```
client_reference_id = user_id + '_' + order_id
```

### Webhook Security
In a production environment, you should:
1. Verify webhook signatures using `stripe.webhooks.constructEvent()`
2. Store the `STRIPE_WEBHOOK_SECRET` in environment variables
3. Never process unverified webhook events

### Environment Variables
The following environment variables are needed:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## API Endpoints

### Create Order
```
POST /api/create-order
```
Creates a new order and returns a Stripe payment link.

### Cancel Subscription
```
POST /api/cancel-subscription
```
Marks a subscription to be cancelled at the end of the current billing period.

### Reactivate Subscription
```
POST /api/reactivate-subscription
```
Reactivates a subscription that was marked for cancellation.

## Next Steps for Production

1. Install the Stripe SDK:
   ```bash
   npm install stripe
   ```

2. Implement proper webhook signature verification

3. Replace mock payment link generation with real Stripe API calls

4. Add error handling and logging

5. Implement proper authentication for API endpoints

6. Add tests for webhook handlers