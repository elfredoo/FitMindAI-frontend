import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import defaultProductImg from "../../assets/default_product.png";

export default function Cart() {
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };
  newCart.totalPrice = cart?.reduce(
    (acc, curr) => acc + Number(curr?.specialPrice) * Number(curr?.quantity),
    0
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3 select-none tracking-tight">
          <MdShoppingCart size={38} className="text-gray-800" />
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-xl text-center font-light">
          Review all your selected items before proceeding to checkout.
        </p>
      </div>

      {/* Header */}
      <div className="grid md:grid-cols-5 grid-cols-4 gap-6 pb-3 border-b border-gray-300 font-semibold text-gray-700 tracking-wide items-center">
        <div className="md:col-span-2 justify-self-start text-lg">Product</div>
        <div className="justify-self-center text-lg">Price</div>
        <div className="justify-self-center text-lg">Quantity</div>
        <div className="justify-self-center text-lg">Total</div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-300">
        {cart && cart.length > 0 ? (
          cart.map((item, index) => (
            <ItemContent
              key={index}
              item={item}
              defaultImg={defaultProductImg}
            />
          ))
        ) : (
          <p className="text-center py-12 text-gray-400 italic font-light">
            Your cart is empty
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 pt-6 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-6">
        <div></div>
        <div className="flex text-sm gap-1 flex-col items-end">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold text-gray-900 tracking-tight">
            <span>Subtotal</span>
            <span>{formatPrice(newCart.totalPrice)}</span>
          </div>
          <p className="text-gray-500 select-none text-xs font-light">
            Taxes and shipping calculated at checkout
          </p>

          <Link to="/checkout" className="w-full flex justify-end">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.04 }}
              className="relative overflow-hidden font-semibold w-[300px] py-3 px-6 rounded-md text-white transition-all duration-300 shadow-md shadow-gray-700/20 bg-gradient-to-r from-gray-800 via-gray-900 to-yellow-800"
              aria-label="Proceed to checkout"
            >
              {/* Gradient overlay with subtle animation */}
              <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-gray-700 via-gray-900 to-yellow-900 opacity-80 rounded-md"></span>

              <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide text-lg">
                <MdShoppingCart className="text-xl" />
                Checkout
              </span>
            </motion.button>
          </Link>

          <Link
            to="/products"
            className="flex gap-2 items-center mt-3 text-gray-600 hover:text-gray-800 font-medium tracking-wide transition-colors duration-200"
          >
            <motion.span
              whileHover={{ x: -5 }}
              whileTap={{ x: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <MdArrowBack size={20} />
              Continue Shopping
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}
