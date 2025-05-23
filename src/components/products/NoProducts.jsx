import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react"; // lub FiShoppingBag jeśli używasz react-icons

export default function NoProducts({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center text-gray-500"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="mb-4"
      >
        <ShoppingBag className="w-16 h-16 text-gray-400" />
      </motion.div>
      <p className="text-lg font-medium">No products available.</p>
      <p className="mt-2 text-sm text-gray-400">{text}</p>
    </motion.div>
  );
}
