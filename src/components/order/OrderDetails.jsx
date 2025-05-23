import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "@/store/actions";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@headlessui/react";
import Invoice from "@/components/order/Invoice";
import defaultProductImg from "../../assets/default_product.png";

export default function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const result = await dispatch(getOrderById(orderId));
        setOrder(result);
      }
    };
    fetchOrder();
  }, [dispatch, orderId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  function getImageUrl(item) {
    if (item?.image.includes("default.png")) {
      return defaultProductImg;
    } else if (item?.image.includes(import.meta.env.VITE_BACK_END_URL)) {
      return item?.image;
    } else {
      return `${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`;
    }
  }

  return (
    <div className="bg-white text-gray-800 p-8 min-h-screen font-sans">
      <div className="text-3xl font-semibold text-gray-900 mb-6 border-b border-gray-300 pb-3">
        Order #{order.orderId}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm border border-gray-200 rounded-md">
          <CardContent className="p-6">
            <div className="font-medium text-gray-700 mb-2">Order Status</div>
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle size={20} />
              {order.orderStatus}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Placed on{" "}
              {new Date(order.orderDate).toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-200 rounded-md">
          <CardContent className="p-6">
            <div className="font-medium text-gray-700 mb-2">Payment</div>
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Method:</span>{" "}
              {order.payment.paymentMethod}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Provider:</span>{" "}
              {order.payment.pgName}
            </div>
            <div className="text-sm text-green-600 font-semibold">
              Status: {order.payment.pgStatus}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-200 rounded-md flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <div className="font-medium text-gray-700 mb-2">Total</div>
            <div className="text-2xl font-bold text-gray-900">
              ${order.totalAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="font-semibold text-xl text-gray-900 mb-4 border-b border-gray-300 pb-2">
        Ordered Items
      </div>
      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <Card
            key={item.orderItemId}
            className="border border-gray-200 rounded-md shadow-sm"
          >
            <CardContent className="flex items-center p-4 gap-4">
              <img
                src={getImageUrl(item.product)}
                alt={item.product.productName}
                className="w-20 h-20 object-contain rounded-md border border-gray-300"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {item.product.productName}
                </div>
                <div className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </div>
              </div>
              <div className="text-gray-900 font-bold text-lg">
                ${item.orderedProductPrice.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          variant="outline"
          className="border-gray-900 text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          className="bg-gray-900 text-white font-semibold hover:bg-gray-800 transition px-6 py-2 rounded-md shadow"
          onClick={() => navigate("invoice")}
        >
          Download Invoice
        </Button>
      </div>
    </div>
  );
}
