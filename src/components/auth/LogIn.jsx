import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { motion } from "framer-motion";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

export default function LogIn() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const loginHandler = async (data) => {
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] py-8 sm:px-8 px-4 rounded-md bg-white"
        style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex flex-col gap-3 w-full">
            <InputField
              label="Username"
              required
              id="username"
              type="text"
              register={register}
              errors={errors}
              message="*Username is required"
              placeholder="Enter your username"
            />
            <InputField
              label="Password"
              required
              id="password"
              type="password"
              register={register}
              errors={errors}
              message="*Password is required"
              placeholder="Enter your password"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden flex gap-2 items-center justify-center font-semibold text-white w-full py-2 rounded-sm my-3"
            type="submit"
          >
            <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loader ? (
                <>
                  <Spinners />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </span>
          </motion.button>
          <p className="text-center text-sm text-slate-700 mt-6">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold underline hover:text-black"
            >
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
