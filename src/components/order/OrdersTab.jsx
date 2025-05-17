import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Package } from "lucide-react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAddresses, getUserOrders } from "@/store/actions";
import ErrorPage from "@/components/shared/ErrorPage";
import Skeleton from "@/components/shared/Skeleton";
import NoOrders from "@/components/order/NoOrders";

export default function OrdersTab({ limit = 1000 }) {
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { userOrders } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/profile/orders/${orderId}`);
  };
  if (!userOrders || userOrders.length === 0) {
    return <NoOrders />;
  }

  if (isLoading) {
    return (
      <div className="lg:w-[80%] mx-auto py-5 w-120">
        <Skeleton />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <>
      <div className="h-96 pr-2">
        {userOrders.slice(0, limit).map((order) => (
          <motion.div
            key={order.orderId}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-5 shadow-sm rounded-2xl border border-muted flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-base mb-1">
                    Order{" "}
                    <span className="text-muted-foreground">
                      #{order.orderId}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Status:{" "}
                    <span className="font-medium">{order.orderStatus}</span>
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right w-full md:w-auto">
                <p className="text-green-600 font-semibold text-base">
                  ${order.totalAmount.toFixed(2)}
                </p>
                <Button
                  className="mt-2 w-full md:w-auto"
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewOrderDetails(order.orderId)}
                >
                  View Order
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
