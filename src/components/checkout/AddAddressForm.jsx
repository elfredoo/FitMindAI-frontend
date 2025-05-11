import React, { useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaAddressCard, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/actions";

export default function AddAddressForm({ address, setOpenAddressModal }) {
  const { btnLoader } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  console.log(address);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal)
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("zipcode", address?.zipcode);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <form
      onSubmit={handleSubmit(onSaveAddressHandler)}
      className="relative bg-white p-8 rounded-2xl w-full max-w-3xl mx-auto"
    >
      <button
        type="button"
        onClick={() => setOpenAddressModal(false)}
        className="absolute top-4 right-4 text-slate-600 hover:text-slate-900"
      >
        <FaTimes size={22} />
      </button>
      {/* Nagłówek */}
      <div className="flex items-center gap-3 text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
        <FaAddressCard className="text-blue-600 text-4xl" />
        {!address?.addressId ? "Add" : "Edit"} Address
      </div>

      {/* Pola formularza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          label="Building Name"
          required
          id="buildingName"
          type="text"
          register={register}
          errors={errors}
          message="*Building Name is required"
          placeholder="Enter Building Name"
        />
        <InputField
          label="City"
          required
          id="city"
          type="text"
          register={register}
          errors={errors}
          message="*City is required"
          placeholder="Enter City"
        />
        <InputField
          label="State"
          required
          id="state"
          type="text"
          register={register}
          errors={errors}
          message="*State is required"
          placeholder="Enter State"
        />
        <InputField
          label="Zipcode"
          required
          id="zipcode"
          type="text"
          register={register}
          errors={errors}
          message="*Zipcode is required"
          placeholder="Enter Zipcode"
        />
        <InputField
          label="Street"
          required
          id="street"
          type="text"
          register={register}
          errors={errors}
          message="*Street is required"
          placeholder="Enter Street"
        />
        <InputField
          label="Country"
          required
          id="country"
          type="text"
          register={register}
          errors={errors}
          message="*Country is required"
          placeholder="Enter Country"
        />
      </div>

      {/* Przycisk */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        className="relative overflow-hidden flex gap-2 items-center justify-center font-semibold text-white w-full py-3 rounded-md shadow-md"
        type="submit"
        disabled={btnLoader}
      >
        <span className="absolute inset-0 animate-gradient-move bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-md"></span>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {btnLoader ? (
            <>
              <Spinners />
              Loading...
            </>
          ) : (
            "Save"
          )}
        </span>
      </motion.button>
    </form>
  );
}
