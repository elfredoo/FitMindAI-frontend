import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";

export default function Cart() {
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };
  newCart.totalPrice = cart?.reduce(
    (acc, curr) => acc + Number(curr?.specialPrice) * Number(curr?.quantity),
    0
  );
  const dispatch = useDispatch();

  console.log(cart);

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <MdShoppingCart size={36} className="text-gray-700" /> Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-2">All Your selected items</p>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
          Product
        </div>
        <div className="justify-self-center text-lg text-slate-800">Price</div>
        <div className="justify-self-center text-lg text-slate-800">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-800">Total</div>
      </div>

      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, index) => <ItemContent key={index} item={item} />)}
      </div>

      <div className="border-t-[1.5px] border-slate-300 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col">
          <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(newCart.totalPrice)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Link to="/checkout" className="w-full flex justify-end">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden font-semibold w-[300px] py-2 px-4 rounded-sm text-white transition-all duration-300"
            >
              <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></span>

              <span className="relative z-10 flex items-center justify-center gap-2">
                <MdShoppingCart className="text-lg" /> Checkout
              </span>
            </motion.button>
          </Link>
          <Link
            className="flex gap-2 items-center mt-2 text-slate-500"
            to="/products"
          >
            <motion.span
              whileHover={{ x: -4 }}
              whileTap={{ x: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <MdArrowBack />
              Continue Shopping
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}
