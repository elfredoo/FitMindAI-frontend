import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function PaypalPayment() {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>Paypal Method Unavailable</AlertTitle>
        Paypal payment is not available yet. Please use another payment method.
      </Alert>
    </div>
  );
}
