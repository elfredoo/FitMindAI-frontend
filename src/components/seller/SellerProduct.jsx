import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AddUpdateProduct from "./AddUpdateProduct";
import { DeleteModal } from "@/components/checkout/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/store/actions";
import toast from "react-hot-toast";

export default function SellerProduct({ product, defaultPhoto }) {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  function onDeleteHandler(productId) {
    dispatch(deleteProduct(productId, toast));
  }

  const imageUrl = product?.image.includes(
    `${import.meta.env.VITE_BACK_END_URL}/images/default.png`
  )
    ? defaultPhoto
    : product?.image;

  return (
    <motion.div className="rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 h-full flex flex-col bg-white">
      {/* Górna część: obrazek */}
      <div className="w-full overflow-hidden aspect-[3/2] relative flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain cursor-pointer drop-shadow-2xl"
          src={imageUrl}
          alt={product.productName}
        />
      </div>

      {/* Dolna część: informacje o produkcie */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold mb-2 cursor-pointer">
            {product.productName}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3 h-[72px]">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-slate-700">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <AddUpdateProduct type="edit" product={product} />
          <Button
            variant="destructive"
            onClick={() => setIsDeleting((prev) => !prev)}
          >
            Delete
          </Button>
          <DeleteModal
            open={isDeleting}
            setOpen={setIsDeleting}
            title={`Delete ${product?.productName}`}
            onDeleteHandler={() => onDeleteHandler(product.productId)}
            loader={isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
}
