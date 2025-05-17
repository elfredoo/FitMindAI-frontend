import Loader from "@/components/shared/Loader";
import Spinners from "@/components/shared/Spinners";
import {
  getAddressById,
  getOrderById,
  getUserAddresses,
} from "@/store/actions";
import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo_2.png";

const Invoice = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [order, setOrder] = useState(null);
  const [orderAddress, setOrderAddress] = useState();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId && user && user.id) {
        const result = await dispatch(getOrderById(orderId));
        setOrder(result);
      }
    };
    fetchOrder();
  }, [dispatch, orderId, user, user.id]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (order && order.addressId) {
        const address = await dispatch(getAddressById(order.addressId));
        setOrderAddress(address);
      }
    };
    fetchAddress();
  }, [dispatch, order?.addressId]);

  useEffect(() => {
    document.title = `Invoice - Order #${orderId}`;
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <Loader text={"Loading Your Invoice..."} />;
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
        <span className="text-slate-800 text-lg font-medium">
          {errorMessage}
        </span>
      </div>
    );
  }

  if (!order || !orderAddress) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
        <span className="text-slate-800 text-lg font-medium">
          No orders found.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans print:text-black print:bg-white">
      <div className="flex justify-between items-start mb-8">
        <div>
          <img src={logo} alt="Company Logo" className="h-30 mb-2" />
          <h2 className="font-bold text-md">Seller</h2>
          <p className="text-sm">
            Bartosz Rafałko sp. z o.o.
            <br />
            Zygmuntowska
            <br />
            16-300 Augustów
            <br />
            VAT ID: 123426895
            <br />
            Email: boch33n@gmail.com
            <br />
            Phone: +48519578401
          </p>
        </div>

        <div className="text-right">
          <h1 className="text-2xl font-bold mb-1">Invoice</h1>
          <p>
            <span className="font-semibold">Invoice ID:</span> #{order.orderId}
          </p>
          <p>
            <span className="font-semibold">Issue Date:</span>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Due Date:</span>{" "}
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-bold text-md mb-1">Buyer</h2>
          <p className="text-sm">
            {user.username}
            <br />
            {orderAddress.street}
            <br />
            {orderAddress.zipcode} {orderAddress.city}, {orderAddress.state}
            <br />
            Phone: {user.phoneNumber}
            <br />
            Email: {user.email}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-md mb-1">Payment Details</h2>
          <p className="text-sm">
            {order.payment.paymentMethod} via {order.payment.pgName}
            <br />
            <span className="font-semibold text-green-700">
              {order.payment.pgStatus}
            </span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Shipping Method:</span> Courier /
            Locker
          </p>
        </div>
      </div>

      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-2">Product</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Unit Price ($)</th>
            <th className="text-right py-2">Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr key={item.orderItemId} className="border-b border-gray-200">
              <td className="py-2">{item.product.productName}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-right py-2">
                {item.orderedProductPrice.toFixed(2)}
              </td>
              <td className="text-right py-2">
                {(item.orderedProductPrice * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="text-sm text-right">
          <p>
            Net Total:{" "}
            <span className="font-medium">
              {/* ${(order.totalAmount / 1.23).toFixed(2)} */}$ $
              {order.totalAmount.toFixed(2)}
            </span>
          </p>
          <p>
            VAT (0%):{" "}
            <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
          </p>
          <p className="text-lg font-bold mt-1">
            Total Amount: ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center print:hidden space-x-4">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300"
        >
          Go Back
        </button>

        <button
          onClick={handlePrint}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
