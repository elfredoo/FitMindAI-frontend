import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import useProductFilter from "@/hooks/useProductFilter";
import { fetchCategories, fetchSellerProducts } from "@/store/actions";
import { FaExclamationTriangle } from "react-icons/fa";
import NoProducts from "@/components/products/NoProducts";
import Filter from "@/components/products/Filter";
import Loader from "@/components/shared/Loader";
import Paginations from "@/components/shared/Paginations";
import { motion } from "framer-motion";
import SellerProduct from "@/components/seller/SellerProduct";
import defaultProductImg from "../../assets/default_product.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function MyProducts() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { sellerProducts } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const [pagination, setPagination] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useProductFilter(true);

  useEffect(() => {
    dispatch(fetchCategories());
    if (!sellerProducts) return;
    setPagination((prev) => ({
      ...prev,
      pageNumber: sellerProducts.pageNumber,
      pageSize: sellerProducts.pageSize,
      totalElements: sellerProducts.totalElements,
      totalPages: sellerProducts.totalPages,
      lastPage: sellerProducts.lastPage,
    }));
  }, [dispatch, sellerProducts]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:max-w-screen-2xl 2xl:mx-auto">
      <Button
        variant="outline"
        className="border-gray-900 text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
        onClick={() => navigate("/seller")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Products</h1>

      <Filter categories={categories ?? []} />

      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader text={"Loading products..."} />
        </div>
      ) : (
        <div className="min-h-[700px]">
          {sellerProducts?.content?.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <NoProducts text="You have not added any products yet." />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pb-6 pt-14 grid gap-y-10 gap-x-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
            >
              {sellerProducts?.content.map((product) => (
                <motion.div
                  key={product.productId}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-[280px] sm:max-w-[320px]">
                    <SellerProduct
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
