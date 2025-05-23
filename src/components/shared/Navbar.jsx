import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import UserMenu from "../user/UserMenu";
import logo from "../../assets/logo_2.png";

const slogans = ["Boost focus", "Burn fat", "Sleep better"];

export default function Navbar() {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-gray-800 to-yellow-900 text-white shadow-md animate-gradient-move print:hidden">
      <div className="mx-auto px-4 sm:px-8 lg:px-14 h-[70px] flex items-center justify-between">
        {/* Logo i nazwa */}
        <NavLink
          to="/"
          className="flex items-center gap-2 sm:gap-3 text-2xl font-extrabold tracking-wide"
        >
          <motion.img
            src={logo}
            alt="FitMindAI Logo"
            className="h-26 w-auto object-contain"
            whileHover={{
              scale: 1.07,
              filter: "drop-shadow(0 0 8px rgba(204, 153, 0, 0.6))",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.96 }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={slogans[sloganIndex]}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 1.05, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-sm font-medium text-gray-200 tracking-tight"
            >
              {slogans[sloganIndex]}
            </motion.div>
          </AnimatePresence>
        </NavLink>
        {/* Menu - desktop */}
        <nav className="hidden sm:flex gap-8 font-medium text-sm items-center">
          {["/", "/products", "/ask-ai", "/About"].map((path, i) => {
            const label = ["Home", "Products", "Ask AI", "About"][i];
            return (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white transition"
                }
              >
                {label}
              </NavLink>
            );
          })}

          <NavLink to="/cart">
            <Badge
              showZero
              badgeContent={cart?.length}
              color="primary"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <FaShoppingCart size={22} />
            </Badge>
          </NavLink>
          {user && user.id && user.roles.includes("ROLE_SELLER") && (
            <NavLink to="/seller">
              <p>My Marketplace</p>
            </NavLink>
          )}
          {user && user.id ? (
            <UserMenu />
          ) : (
            <NavLink to="/login" end>
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden font-semibold py-2 px-4 rounded-sm text-white transition-all duration-300"
              >
                <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-gray-700 via-gray-600 to-yellow-900"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaSignInAlt className="text-lg" /> Login
                </span>
              </motion.button>
            </NavLink>
          )}
        </nav>

        {/* Burger menu */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden text-white text-3xl"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden bg-gray-800/90 ${
          navbarOpen ? "max-h-[400px] py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 text-sm">
          {["/", "/products", "/ask-ai", "/about", "/cart"].map((path, i) => {
            const label = ["Home", "Products", "Ask AI", "About", "Cart"][i];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setNavbarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white transition"
                }
              >
                {label}
              </NavLink>
            );
          })}

          {/* Marketplace - tylko jeśli sprzedawca */}
          {user && user.id && user.roles.includes("ROLE_SELLER") && (
            <NavLink
              to="/seller"
              onClick={() => setNavbarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              My Marketplace
            </NavLink>
          )}

          {/* Login lub UserMenu */}
          {user && user.id ? (
            <div className="font-[500] transition-all duration-150">
              <UserMenu />
            </div>
          ) : (
            <div className="font-[500] transition-all duration-150">
              <NavLink
                to="/login"
                onClick={() => setNavbarOpen(false)}
                className="flex items-center space-x-2 px-4 py-[6px] text-white font-semibold rounded-md shadow-lg"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden font-semibold py-2 px-4 rounded-sm text-white transition-all duration-300"
                >
                  <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-gray-700 via-gray-600 to-yellow-900"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaSignInAlt className="text-lg" /> Login
                  </span>
                </motion.button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
