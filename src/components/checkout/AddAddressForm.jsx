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
      className="relative bg-white dark:bg-zinc-900 p-8 rounded-xl w-full max-w-3xl mx-auto shadow-lg border border-zinc-200 dark:border-zinc-700"
    >
      <button
        type="button"
        onClick={() => setOpenAddressModal(false)}
        className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 dark:hover:text-white transition-colors"
      >
        <FaTimes size={20} />
      </button>

      <div className="flex items-center gap-3 text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-3">
        <FaAddressCard className="text-blue-500" />
        {!address?.addressId ? "Add" : "Edit"} Address
      </div>

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

      <button
        type="submit"
        disabled={btnLoader}
        className="w-full py-3 rounded-md text-white bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 font-medium transition-colors duration-200"
      >
        {btnLoader ? (
          <div className="flex items-center justify-center gap-2">
            <Spinners />
            Saving...
          </div>
        ) : (
          "Save"
        )}
      </button>
    </form>
  );
}
