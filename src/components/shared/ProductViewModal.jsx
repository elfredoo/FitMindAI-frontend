import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDone, MdClose } from "react-icons/md";
import Status from "./Status";
import { Divider } from "@mui/material";

const dropIn = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};
export default function ProductViewModal({
  open,
  setOpen,
  product,
  isAvailable,
}) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          as="div"
          className="relative z-50"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div
            className="fixed inset-0 bg-gradient-to-br from-slate-900/60 to-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-xl md:min-w-[620px] bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-100"
            >
              {product.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative aspect-[3/2] bg-gray-100 overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="object-contain h-full w-full"
                  />
                  {product.specialPrice && (
                    <div className="absolute top-4 right-4 bg-rose-600 text-white text-xs px-2 py-1 rounded-full shadow">
                      SALE
                    </div>
                  )}
                </motion.div>
              )}

              <div className="px-6 pt-8 pb-4">
                <DialogTitle
                  as="h1"
                  className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 text-center"
                >
                  {product.productName}
                </DialogTitle>

                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    {product.specialPrice ? (
                      <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-sm">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <span className="text-2xl font-semibold text-rose-600">
                          ${Number(product.specialPrice).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-semibold text-slate-700">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}

                    {isAvailable ? (
                      <Status
                        text="In Stock"
                        icon={MdDone}
                        bg="bg-teal-100"
                        color="text-teal-800"
                      />
                    ) : (
                      <Status
                        text="Out-Of-Stock"
                        icon={MdClose}
                        bg="bg-rose-100"
                        color="text-rose-700"
                      />
                    )}
                  </div>

                  <Divider />

                  <p className="leading-relaxed text-sm text-slate-600">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="px-6 py-5 bg-gray-50 flex justify-end gap-4 rounded-b-3xl">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  type="button"
                  className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-all rounded-lg shadow-sm"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
