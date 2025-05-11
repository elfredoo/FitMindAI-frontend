import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import { truncateText } from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

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

  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView(product);
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={product.image}
          alt={product.productName}
        />
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
            <button
              disabled={!isAvailable || btnLoader}
              onClick={() => addToCartHandler(product)}
              className={`bg-blue-500 ${
                isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"
              } text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-34 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Stock Out"}
            </button>
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
