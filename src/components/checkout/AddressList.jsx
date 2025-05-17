import React from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAddress } from "../../store/actions";

export default function AddressList({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) {
  const dispatch = useDispatch();
  const { selectedUserAddress } = useSelector((state) => state.auth);

  const handleAddressSelection = (address) => {
    dispatch(selectUserAddress(address));
  };

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const isSelected = selectedUserAddress?.addressId === address.addressId;

        return (
          <div
            key={address.addressId}
            onClick={() => handleAddressSelection(address)}
            className={`p-4 rounded-xl cursor-pointer relative transition-all duration-300 border shadow-md ${
              isSelected
                ? "bg-gradient-to-br from-[#3b3a36] to-[#2c2b28] border-[#d8c38f] text-[#f3f3f3] shadow-[0_4px_20px_rgba(216,195,143,0.2)]"
                : "bg-[#2e2e2e] border-[#444] text-gray-200 hover:border-[#b89b5e] hover:shadow-[0_3px_12px_rgba(184,155,94,0.15)]"
            }`}
          >
            <div className="flex items-start">
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <FaBuilding size={14} className="mr-2 text-[#d8c38f]" />
                  <p className="font-medium">{address.buildingName}</p>
                  {isSelected && (
                    <FaCheckCircle className="text-[#d8c38f] ml-2" />
                  )}
                </div>
                <div className="flex items-center">
                  <FaStreetView size={17} className="mr-2 text-gray-400" />
                  <p>{address.street}</p>
                </div>
                <div className="flex items-center">
                  <MdLocationCity size={17} className="mr-2 text-gray-400" />
                  <p>
                    {address.city}, {address.state}
                  </p>
                </div>
                <div className="flex items-center">
                  <MdPinDrop size={17} className="mr-2 text-gray-400" />
                  <p>{address.zipcode}</p>
                </div>
                <div className="flex items-center">
                  <MdPublic size={17} className="mr-2 text-gray-400" />
                  <p>{address.country}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 absolute top-4 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditButtonHandler(address);
                }}
                className="hover:scale-105 transition-transform"
              >
                <FaEdit
                  size={18}
                  className="text-[#d8c38f] hover:text-[#e8dbb4]"
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButtonHandler(address);
                }}
                className="hover:scale-105 transition-transform"
              >
                <FaTrash
                  size={17}
                  className="text-red-500 hover:text-red-400"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
