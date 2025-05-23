import "./App.css";
import { FaBeer } from "react-icons/fa";
import Products from "./components/products/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/actions";
import LogIn from "./components/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AskAI from "./components/ai/AskAI";
import UserProfile from "./components/user/UserProfile";
import OrderDetails from "@/components/order/OrderDetails";
import Invoice from "@/components/order/Invoice";
import OrdersTab from "@/components/order/OrdersTab";
import Footer from "@/components/shared/Footer";
import SellerPanel from "@/components/seller/SellerPanel";
import MyProducts from "@/components/seller/MyProducts";
import MyEarnings from "@/components/seller/MyEarnings";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/" element={<PrivateRoute publicPage />}>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<Register />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<PrivateRoute sellerPage={true} />}>
                  <Route path="/seller" element={<SellerPanel />} />
                  <Route path="/seller/products" element={<MyProducts />} />
                  <Route path="/seller/earnings" element={<MyEarnings />} />
                </Route>
                <Route
                  path="/profile/orders/:orderId"
                  element={<OrderDetails />}
                />
                <Route path="/profile/orders" element={<OrdersTab />} />
                <Route
                  path="/profile/orders/:orderId/invoice"
                  element={<Invoice />}
                />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/order-confirm"
                  element={<PaymentConfirmation />}
                />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>

      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
