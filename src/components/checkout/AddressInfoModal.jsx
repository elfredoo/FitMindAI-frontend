import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import AddAddressForm from "./AddAddressForm";

export default function AddressInfoModal({ open, setOpen, children }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="relative w-full transform  overflow-hidden transition-all">
          <div className="px-6 py-6">{children}</div>
          <div></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
