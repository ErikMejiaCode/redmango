import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../Components/Page/Payment";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51N3nZUDsUPrv0h1VPuy3eVrV27n5hX4cXdjH4n5FODaaCl9wUnSsBgw4P4LbWniN5RunB0kgmxEuctB6rR6DiTlC00382jH1Gk"
  );
  const options = {
    //passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
}

export default Payment;
