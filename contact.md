---
layout: page
title: Contact
---

Although I spend a lot of time working on social media, the best way to reach me is  — wait for it — by email at [andrew@andrewstiefel.com](mailto:andrew@andrewstiefel.com).

<!-- Load Stripe.js on your website. -->
<script src="https://js.stripe.com/v3"></script>
<style>
    #checkout-button-sku_F6CwBbwMqnq9GM {
        background-color: #6772E5; 
        color: #FFF; 
        padding: 8px 12px; 
        border:0; 
        border-radius: 4px; 
        font-size: 1em;
    }
</style>

<!-- Create a button that your customers click to complete their purchase. Customize the styling to suit your branding. -->

<button id="checkout-button-sku_F6CwBbwMqnq9GM" role="link">Checkout</button>

<div id="error-message"></div>

<script>
  var stripe = Stripe('pk_live_1F8nf3E5ipKuMJp2r7zYVZ6800gBG6IWro');

  var checkoutButton = document.getElementById('checkout-button-sku_F6CwBbwMqnq9GM');
  checkoutButton.addEventListener('click', function () {
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_F6CwBbwMqnq9GM', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'https://andrewstiefel.netlify.com/success',
      cancelUrl: 'https://andrewstiefel.netlify.com/canceled',
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
</script>