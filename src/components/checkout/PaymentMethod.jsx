import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

export default function PaymentMethod() {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cartId, cart, errorMessage]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-16 border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Select Payment Method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment-method-label"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
          className="flex flex-col gap-4"
        >
          {["Stripe", "Paypal"].map((method) => (
            <FormControlLabel
              key={method}
              value={method}
              control={<Radio className="hidden" />}
              label={
                <div
                  className={`
                cursor-pointer select-none p-4 rounded-lg border transition-shadow duration-300 flex items-center justify-between
                ${
                  paymentMethod === method
                    ? "border-indigo-600 bg-indigo-50 shadow-md"
                    : "border-gray-300 hover:shadow-lg hover:border-indigo-400"
                }
              `}
                >
                  <span className="text-gray-800 font-medium">{method}</span>
                  {/* Tu możesz wstawić ikonkę np. logo Stripe / Paypal */}
                  {paymentMethod === method && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              }
              className="w-full"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
