import { useState } from "react";
import { truncateText } from "../../utils/truncateText";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";

export default function ItemContent({ item, defaultImg }) {
  const [currentQty, setCurrentQty] = useState(item.quantity);
  const dispatch = useDispatch();

  const handleQtyIncrease = (cartItems) => {
    dispatch(increaseCartQuantity(cartItems, toast, currentQty, setCurrentQty));
  };

  const handleQtyDecrease = (cartItem) => {
    if (currentQty > 1) {
      const newQuantity = currentQty - 1;
      setCurrentQty(newQuantity);
      dispatch(decreaseCartQuantity(cartItem, newQuantity));
    }
  };

  const removeItemFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem, toast));
  };

  let imageUrl;

  if (item?.image.includes("default.png")) {
    imageUrl = defaultImg;
  } else if (item?.image.includes(import.meta.env.VITE_BACK_END_URL)) {
    imageUrl = item?.image;
  } else {
    imageUrl = `${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`;
  }
  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center  border-[1px] border-slate-200  rounded-md  lg:px-4  py-4 p-2">
      <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {truncateText(item.productName)}
          </h3>
        </div>
        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={imageUrl}
            alt={item.productName}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded"
          />

          <div className="text items-start gap-5 mt-3">
            <button
              onClick={() => {
                removeItemFromCart(item);
              }}
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(item.specialPrice))}
      </div>
      <div className="justify-self-center">
        <SetQuantity
          quantity={currentQty}
          cardCounter={true}
          handleQtyDecrease={() => {
            handleQtyDecrease(item);
          }}
          handleQtyIncrease={() => handleQtyIncrease(item)}
        />
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
        {formatPrice(Number(item.specialPrice) * Number(currentQty))}
      </div>
    </div>
  );
}
