import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoies } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter.js";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { motion } from "framer-motion";
import NoProducts from "@/components/products/NoProducts";

export default function Products() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategoies());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ?? []} />

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader text={"Loading products..."} />
        </div>
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[300px] border border-red-300 rounded-lg bg-red-50 px-6 py-4 shadow-md">
          <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
          <span className="text-red-700 text-lg font-semibold">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <NoProducts />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 gap-x-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
          <div className="flex justify-center pt-12">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements}
            />
          </div>
          ;
        </div>
      )}
    </div>
  );
}
