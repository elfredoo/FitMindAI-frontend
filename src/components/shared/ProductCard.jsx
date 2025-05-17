import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { truncateText } from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import { ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, about = false }) {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const dispatch = useDispatch();
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = product.quantity && Number(product.quantity) > 0;

  const handleProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  console.log(product.image);

  return (
    <div className="rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => handleProductView(product)}
        className="w-full overflow-hidden aspect-[3/2] relative flex justify-center items-center"
      >
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-contain cursor-pointer drop-shadow-2xl"
          src={product.image}
          alt={product.productName}
        />

        {!about && (
          <button
            disabled={!isAvailable || btnLoader}
            onClick={(e) => {
              e.stopPropagation();
              addToCartHandler(product);
            }}
            className={`absolute bottom-3 right-3 bg-slate-800 ${
              isAvailable
                ? "opacity-100 hover:bg-slate-600"
                : "opacity-70 cursor-not-allowed"
            } text-white py-2 px-3 rounded-lg flex items-center justify-center shadow-md transition-all duration-300`}
          >
            <ShoppingBasket className="" />
          </button>
        )}
      </div>
      <div className="p-4">
        <h2
          onClick={() => {
            handleProductView(product);
          }}
          className="text-lg font-semibold mb-2 cursor-pointer"
        >
          {truncateText(product.productName, 50)}
        </h2>
        <div className="min-h-20 max-h-20">
          <p className="text-gray-600 text-sm">
            {truncateText(product.description)}
          </p>
        </div>

        {!about && (
          <div className="flex items-center justify-between">
            {product.specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="text-xl font-bold text-slate-700">
                  ${Number(product.specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-700">
                {" "}
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
}
