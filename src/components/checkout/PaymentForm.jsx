import { Skeleton } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PaymentForm({ clientSecret, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONT_END_URL}/order-confirm`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
          <motion.button
            disabled={!stripe || isLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden w-full py-[10px] mt-2 rounded-md font-bold  px-5 text-white transition-all duration-300 disabled:opacity-50 disabled:animate-pulse"
          >
            <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></span>

            <span className="relative z-10 flex items-center justify-center gap-2">
              {!isLoading
                ? `Pay $${Number(totalPrice).toFixed(2)}`
                : "Processing..."}
            </span>
          </motion.button>
        </>
      )}
    </form>
  );
}
