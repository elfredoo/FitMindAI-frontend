import {
  Circles,
  ProgressBar,
  RotatingLines,
  ThreeDots,
} from "react-loader-spinner";
import { motion } from "framer-motion";

export default function Loader({ text }) {
  return (
    <div className="flex justify-center items-center w-full h-[250px]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="p-5"
          animate={{ scale: [1, 1.2, 1] }} // Animacja pulsowania
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4f46e5"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </motion.div>

        <motion.p
          className="text-transparent bg-clip-text text-lg font-semibold drop-shadow-sm tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            backgroundSize: "400% 400%",
            backgroundImage:
              "linear-gradient(to right, #4f46e5, #9333ea, #ec4899, #f472b6)",
            WebkitBackgroundClip: "text",
            animation: "gradient-animation 3s ease infinite", // Animacja tła
          }}
        >
          {text || "Please wait..."}
        </motion.p>
      </div>
    </div>
  );
}
