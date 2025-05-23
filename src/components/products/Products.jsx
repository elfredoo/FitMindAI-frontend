import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter.js";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { motion } from "framer-motion";
import NoProducts from "@/components/products/NoProducts";
import defaultProductImg from "../../assets/default_product.png";

export default function Products() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:max-w-screen-2xl 2xl:mx-auto">
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
              <NoProducts text="Currently there are no products in this category or your search." />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pb-6 pt-14 grid gap-y-10 gap-x-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-[280px] sm:max-w-[320px]">
                    <ProductCard
                      product={product}
                      defaultPhoto={defaultProductImg}
                    />
                  </div>
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
        </div>
      )}
    </div>
  );
}
