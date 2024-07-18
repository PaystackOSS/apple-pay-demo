const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const paystack = new PaystackPop();
const makePaymentButton = document.getElementById('payment-btn')

// Method 1
const preloadPayment = async () => {
  await paystack.paymentRequest({
    key: PUBLIC_KEY,
    email: `${Math.random().toString(36).substring(2)}@email.com`,
    amount: 10000,
    currency: 'NGN',
    container: 'paystack-apple-pay',
    loadPaystackCheckoutButton: 'paystack-other-channels',
    style: {
      theme: 'dark',
      applePay: {
        margin: '10px',
        padding: '10px',
        width: '100%',
        borderRadius: '5px',
        type: 'pay', // Default value is 'pay'. See other apple pay button types here https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_css
        locale: 'en'
      }
    }, // custom styles for button elements
    onSuccess(response) {
      // do stuff
      console.log("response: ", response)
    },
    onError(error) {
      console.log(`Error: ${error.message}`)
    },
    onCancel() {
      console.log("Pop up closed!")
    },
    onElementsMount(elements) { // { applePay: true } or null
      if (elements) {
        console.log(`Successfully mounted elements: ${JSON.stringify(elements)}`);
      } else {
        console.log('Could not load elements');
      }
    }
  });
}

// Method 2
// const makePayment = async () => {
//   await paystack.checkout({
//     accessCode: "rl7pny5ixu0yyhd",
//     onSuccess: (transaction) => {
//       console.log("Transaction: ", transaction)
//       alert(`Ref: ${transaction.reference}`)
//     },
//     onElementsMount(elements) { // { applePay: true } or null
//       console.log(`Elements: ${JSON.stringify(elements)}`);
//     },
//     onCancel: () => {
//       console.log("Pop up closed!")
//     }
//   });
// }

// makePaymentButton.addEventListener('click', makePayment)
preloadPayment()