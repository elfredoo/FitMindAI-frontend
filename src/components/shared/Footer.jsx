import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-3 sm:mb-0">
          <p className="font-semibold text-lg">Bartek Rafalik</p>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:boch33n@gmail.com"
              className="text-blue-400 hover:underline"
            >
              boch33n@gmail.com
            </a>
          </p>
          <p className="text-sm">
            Tel:{" "}
            <a
              href="tel:+48519578401"
              className="text-blue-400 hover:underline"
            >
              +48 519 578 401
            </a>
          </p>
        </div>
        <div className="text-center text-sm">
          &copy; {currentYear} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
