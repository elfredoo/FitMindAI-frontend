import { FaHandHoldingHeart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa6";
import { GoPackageDependents } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { motion, useAnimationFrame } from "framer-motion";
import {
  RiMentalHealthFill,
  RiSecurePaymentFill,
  RiUserHeartFill,
} from "react-icons/ri";
import { useRef } from "react";
import {
  MdEventAvailable,
  MdOutlinePayment,
  MdReviews,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { ImLeaf } from "react-icons/im";

const items = [
  {
    icon: <RiUserHeartFill size={40} />,
    title: "4.9/5",
    subtitle: "user rating",
  },
  {
    icon: <MdShoppingCartCheckout size={40} />,
    title: "30s",
    subtitle: "checkout time",
  },
  {
    icon: <ImLeaf size={40} />,
    title: "Eco-packaging",
    subtitle: "planet wins",
  },
  {
    icon: <MdReviews size={40} />,
    title: "60k+ reviews",
    subtitle: "people love us",
  },
  {
    icon: <RiMentalHealthFill size={40} />,
    title: "100% natural",
    subtitle: "no BS inside",
  },
  {
    icon: <MdEventAvailable size={40} />,
    title: "365 returns",
    subtitle: "zero risk",
  },
  {
    icon: <RiSecurePaymentFill size={40} />,
    title: "Secure pay",
    subtitle: "we encrypt",
  },
  {
    icon: <LiaShoppingBagSolid size={40} />,
    title: "Gift inside",
    subtitle: "every order",
  },
];

const slideVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function InfoSection() {
  const x = useRef(0);
  const containerRef = useRef();

  useAnimationFrame((t, delta) => {
    const moveBy = delta * 0.05;
    x.current -= moveBy;
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 2;
      if (Math.abs(x.current) >= width) x.current = 0;
      containerRef.current.style.transform = `translateX(${x.current}px)`;
    }
  });

  return (
    <div className="overflow-hidden w-full bg-white py-6">
      <motion.div
        className="inline-flex gap-4 whitespace-nowrap"
        ref={containerRef}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <motion.div
            variants={slideVariants}
            initial="initial"
            animate="animate"
            key={index}
            className="flex flex-col justify-center items-center bg-gradient-to-br from-slate-100 to-white p-5 rounded-2xl shadow-xl hover:shadow-2xl min-w-[220px] transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="text-blue-500 mb-2">{item.icon}</div>
            <p className="font-bold text-lg text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500 text-center">{item.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
