import NoProducts from "@/components/products/NoProducts";
import Loader from "@/components/shared/Loader";
import useProductFilter from "@/hooks/useProductFilter";
import { motion } from "framer-motion";
import { fetchWeeklySales, fetchUser } from "@/store/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Banknote,
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyEarnings = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, sellerProducts, recentSales } = useSelector(
    (state) => state.auth
  );
  const withdrawn = user?.totalEarnings || 0 - user?.balance || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chartData = recentSales?.content?.map((sale) => {
    const date = new Date(sale.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return {
      day: formattedDate,
      sales: sale.soldCount,
    };
  });

  useEffect(() => {
    dispatch(fetchWeeklySales());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {}, [recentSales]);

  useProductFilter(true, 100);

  let totalSold;
  let topProduct;
  if (!isLoading && !errorMessage && sellerProducts) {
    totalSold = sellerProducts.content.reduce(
      (sum, p) => sum + (p.soldCount || 0),
      0
    );
    topProduct = sellerProducts.content.reduce(
      (top, current) =>
        (current.soldCount || 0) > (top?.soldCount || 0) ? current : top,
      null
    );
  }

  return (
    <>
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Earnings</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader text={"Loading data..."} />
          </div>
        ) : (
          <div className="min-h-[700px]">
            {sellerProducts?.content?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <NoProducts text="You have not added any products yet." />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <EarningCard
                    title="Total Earnings"
                    amount={"$" + user?.totalEarnings}
                    icon={<DollarSign className="text-green-600 w-6 h-6" />}
                  />
                  <EarningCard
                    title="Available Balance"
                    amount={"$" + user?.balance}
                    icon={<Banknote className="text-indigo-600 w-6 h-6" />}
                  />
                  <EarningCard
                    title="Withdrawn"
                    amount={"$" + withdrawn}
                    icon={<TrendingUp className="text-amber-600 w-6 h-6" />}
                  />
                </motion.div>

                <div className="flex justify-end mt-6">
                  <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition">
                    Withdraw Balance
                  </button>
                </div>

                <h3 className="text-xl font-semibold mt-12 mb-4 text-gray-700">
                  Sales Summary
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <EarningCard
                    title="Total Products"
                    amount={sellerProducts?.content?.length}
                    icon={<ShoppingCart className="text-blue-500 w-6 h-6" />}
                  />
                  <EarningCard
                    title="Total Sold"
                    amount={totalSold}
                    icon={<TrendingUp className="text-pink-500 w-6 h-6" />}
                  />
                  {topProduct && (
                    <EarningCard
                      title="Top Seller"
                      amount={`${topProduct.productName} (${topProduct.soldCount})`}
                      icon={<Star className="text-yellow-500 w-6 h-6" />}
                    />
                  )}
                </motion.div>

                <div className="mt-14">
                  <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Weekly Sales
                  </h3>
                  <div className="w-full h-[300px] bg-white rounded-xl shadow p-4">
                    {isLoading ? (
                      <Loader text="Fetching sales..." />
                    ) : errorMessage ? (
                      <div className="flex justify-center items-center h-[300px] border border-red-300 rounded-lg bg-red-50 px-6 py-4 shadow-md">
                        <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
                        <span className="text-red-700 text-lg font-semibold">
                          {errorMessage}
                        </span>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#6366f1"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Button
        variant="outline"
        className="border-gray-900 text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
        onClick={() => navigate("/seller")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </>
  );
};
export default MyEarnings;

const EarningCard = ({ title, amount, icon }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow flex items-center gap-4">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{amount}</p>
      </div>
    </div>
  );
};
