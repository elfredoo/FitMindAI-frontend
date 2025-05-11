import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartEmpty() {
  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <MdShoppingCart size={80} className="mb-4 text-slate-500" />
        <div className="text-3xl font-bold text-slate-700">
          Your cart is empty
        </div>
        <div className="text-lg mt-2 text-slate-500">
          Add some products to get started
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/"
          className="flex gap-2 items-center mt-2 group transition-colors duration-300"
        >
          <motion.span
            whileHover={{ x: -4 }}
            whileTap={{ x: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center text-slate-600 group-hover:text-rose-600 transition-colors duration-300"
          >
            <MdArrowBack className="transition-colors duration-300 group-hover:text-rose-600" />
            <span className="ml-1 relative">
              <span className="z-10 relative">Start Shopping</span>
              <span className="absolute inset-0 z-0 rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-rose-100 to-pink-100"></span>
            </span>
          </motion.span>
        </Link>
      </div>
    </div>
  );
}
