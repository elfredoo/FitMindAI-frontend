import { Package } from "lucide-react";
import { motion } from "framer-motion";

export default function NoOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center text-gray-500"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="mb-4"
      >
        <Package className="w-16 h-16 text-gray-400" />
      </motion.div>
      <p className="text-lg font-medium">No orders found.</p>
      <p className="mt-2 text-sm text-gray-400">
        Looks like you haven't placed any orders yet.
      </p>
    </motion.div>
  );
}
