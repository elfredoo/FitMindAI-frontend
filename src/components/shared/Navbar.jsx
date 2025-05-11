import { Badge } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-[70px] bg-gradient-to-r from-[#111827] to-[#1f2937] text-white z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        <NavLink to="/" className="flex items-center text-2xl font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[Poppins]">Orderly</span>
        </NavLink>
        <ul
          className={`bg-gradient-to-r from-gray-900 to-gray-800 flex sm:gap-10 gap-4 sm:items-center text-white sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md 
    ${navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"} 
    transition-all duration-100 sm:h-fit sm:bg-none sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="font-[500] transition-all duration-150">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-200"
              }
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li className="font-[500] transition-all duration-150">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-200"
              }
              to="/products"
              end
            >
              Products
            </NavLink>
          </li>
          <li className="font-[500] transition-all duration-150">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-200"
              }
              to="/about"
              end
            >
              About
            </NavLink>
          </li>
          <li className="font-[500] transition-all duration-150">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-200"
              }
              to="/contact"
              end
            >
              Contact
            </NavLink>
          </li>
          <li className="font-[500] transition-all duration-150">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-200"
              }
              to="/cart"
              end
            >
              <Badge
                showZero
                badgeContent={cart?.length}
                color="primary"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <FaShoppingCart size={25} />
              </Badge>
            </NavLink>
          </li>
          {user && user.id ? (
            <li className="font-[500] transition-all duration-150">
              <UserMenu />
            </li>
          ) : (
            <li className="font-[500] transition-all duration-150">
              <NavLink
                className="flex items-center space-x-2 px-4 py-[6px] text-white font-semibold rounded-md shadow-lg"
                to="/login"
                end
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden font-semibold py-2 px-4 rounded-sm text-white transition-all duration-300"
                >
                  <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></span>

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaSignInAlt className="text-lg" /> Login
                  </span>
                </motion.button>
              </NavLink>
            </li>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
}
