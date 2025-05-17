import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Mail,
  Phone,
  MapPin,
  Package,
  SquareUserRoundIcon,
  User,
  LocationEdit,
  SquarePen,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses, getUserOrders, updateUser } from "@/store/actions";
import { motion } from "framer-motion";
import AddAddressForm from "@/components/checkout/AddAddressForm";
import AddressInfo from "@/components/checkout/AddressInfo";
import Skeleton from "@/components/shared/Skeleton";
import ErrorPage from "@/components/shared/ErrorPage";
import { Button } from "@headlessui/react";
import OrdersTab from "@/components/order/OrdersTab";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { address, user, userOrders } = useSelector((state) => state.auth);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [contactInfoEditMode, setContactInfoEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserOrders());
      dispatch(getUserAddresses());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setEditableUser({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      console.log(editableUser);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    dispatch(updateUser(editableUser));
    setContactInfoEditMode(false);
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto mt-10 shadow-xl relative min-h-[120px]">
        <CardHeader className="flex flex-row items-center gap-4">
          <User size={40} />
          <div>
            <CardTitle className="text-xl">{user.username}</CardTitle>
            <p className="text-muted-foreground text-sm">
              Premium user since 2024
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ScrollArea className="h-160 pr-2">
                {isLoading && !userOrders ? (
                  <div className="lg:w-[80%] mx-auto py-5 w-120">
                    <Skeleton />
                  </div>
                ) : (
                  <>
                    <OrdersTab limit={5} />
                  </>
                )}
              </ScrollArea>
              {userOrders && userOrders.length > 5 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => navigate("/profile/orders")}
                    className="inline-flex items-center gap-2 px-6 py-2 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-md transition duration-300 ease-in-out hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4focus:ring-blue-300 active:scale-95 select-none"
                    aria-label="See more orders"
                  >
                    See More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </TabsContent>
            {isLoading && (
              <div className="lg:w-[80%] mx-auto py-5 w-120">
                <Skeleton />
              </div>
            )}
            <TabsContent value="addresses">
              <AddressInfo address={address} mode="user-page" />
            </TabsContent>

            <TabsContent value="contact" className="relative min-h-[180px]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <SquareUserRoundIcon className="w-5 h-5 text-primary" />
                  {contactInfoEditMode ? (
                    <input
                      name="username"
                      value={editableUser.username}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-slate-500 text-black outline-none px-1"
                    />
                  ) : (
                    <span>{user.username}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  {contactInfoEditMode ? (
                    <input
                      name="email"
                      value={editableUser.email}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-slate-500 text-black outline-none px-1"
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  {contactInfoEditMode ? (
                    <input
                      name="phoneNumber"
                      value={editableUser.phoneNumber}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-slate-500 text-black outline-none px-1"
                    />
                  ) : (
                    <span>{user.phoneNumber}</span>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 right-0 flex gap-2 pr-4 pb-4">
                {contactInfoEditMode ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveChanges}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-md 
          bg-gradient-to-r from-yellow-700 to-yellow-900 
          text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Check size={18} />
                    Save changes
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setContactInfoEditMode(true)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-md 
          bg-gradient-to-r from-slate-800 to-slate-900 
          text-gray-200 shadow-md hover:shadow-lg transition-all"
                  >
                    <SquarePen size={18} />
                    Edit
                  </motion.button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </>
  );
}
