import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[800px] flex flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="mb-6 text-slate-400"
      >
        <MdShoppingCart size={90} />
      </motion.div>

      <h2 className="text-4xl font-extrabold text-slate-700 mb-2 select-none">
        Your cart is empty
      </h2>
      <p className="text-lg text-slate-500 mb-6 select-none">
        Add some products to get started
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 group px-6 py-3 rounded-md bg-gradient-to-r from-slate-800 to-yellow-800 text-white font-semibold shadow-lg hover:shadow-2xl transition-shadow duration-300 select-none"
      >
        <motion.span
          whileHover={{ x: -6 }}
          whileTap={{ x: -12 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <MdArrowBack size={24} />
        </motion.span>
        Start Shopping
      </Link>
    </motion.div>
  );
}
