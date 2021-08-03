import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "./Components/Payment"

const stripePromise = loadStripe("pk_test_51JKHjXLFrMKZTSKdDN5kQ02GGKyvTPAIID7dClLEEQYVEumwaFVEJU2awrfXwXqBoGpIyueYcQyY5QrT9KGxGS5f00WwgAeG8X")

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}

export default App;
