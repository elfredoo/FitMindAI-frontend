import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import InfoSection from "./InfoSection";
import { useAnimation } from "framer-motion";
import { motion } from "framer-motion";

export default function Home() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const shimmerControls = useAnimation();

  useEffect(() => {
    shimmerControls.start({
      backgroundPositionX: ["-200%", "200%"],
      transition: { repeat: Infinity, duration: 3, ease: "linear" },
    });
  }, [shimmerControls]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>

      <div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <InfoSection />
        </div>
      </div>

      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2 group cursor-pointer">
          <motion.h1
            className="text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-gray-600 to-yellow-900 bg-clip-text text-transparent"
            animate={shimmerControls}
            style={{
              backgroundSize: "200% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            Elevate Your Everyday
          </motion.h1>

          <span className="text-slate-700 text-2xl relative inline-block">
            Dive into our exclusive selection of must-have products chosen with
            you in mind.
            <motion.span
              className="absolute left-0 -bottom-1 h-1 bg-yellow-800 rounded origin-left"
              style={{ width: "100%" }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 4)
                .map((product, index) => (
                  <ProductCard key={index} product={product} about={true} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
