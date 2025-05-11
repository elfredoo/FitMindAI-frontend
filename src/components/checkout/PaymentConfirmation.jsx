import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "../shared/Skeleton";
import { FaCheckCircle } from "react-icons/fa";
import { stripePaymentConfirmation } from "../../store/actions";
import toast from "react-hot-toast";

export default function PaymentConfirmation() {
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);
  const { selectedUserAddress } = useSelector((state) => state.auth);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart?.length > 0
    ) {
      const sendData = {
        addressId: selectedUserAddress.addressId,
        pgName: "Stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment Successfull",
      };
      console.log("sendData", sendData);
      console.log(selectedUserAddress);
      dispatch(
        stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast)
      );
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="max-w-xl mx-auto">
          <Skeleton />
        </div>
      ) : (
        <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <div className="text-green-500 mb-4 flex justify-center">
            <FaCheckCircle size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successfull
          </h2>
          <p>
            Thank You for Your purchase! Your order has been successfully
            placed.
          </p>
        </div>
      )}
    </div>
  );
}
