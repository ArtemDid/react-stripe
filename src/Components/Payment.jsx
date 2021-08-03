import React, { useState, useEffect } from "react"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const Payment = () => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [amount] = useState(Math.floor(Math.random() * 100 * 100))

  useEffect(() => {
    console.log(stripe)
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Stream Stripe React test",
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      })
      pr.canMakePayment()
        .then((result) => {
          console.log(result)
          if (result) {
            console.log(result)
            setPaymentRequest(pr)
          }
        })
        .catch(console.error)
    }
  }, [stripe, amount])

  if (paymentRequest) {
    paymentRequest.on("paymentmethod", async (event) => {
      const {
        id,
        billing_details: { email, phone },
      } = event.paymentMethod

      try {
        const response = await fetch(`http://localhost:3001/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, amount, email, phone }),
        });
        const { data } = await response.json();

        event.complete("success")
        console.log(data)

      } catch ({ message, response }) {
        event.complete("fail")
        console.log(response ? response.data : message)
      }

    })
  }

  return (
    <>
      {paymentRequest ? (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      ) : (
        <CheckoutForm amount={amount} />
      )}
    </>
  )
}

export default Payment;