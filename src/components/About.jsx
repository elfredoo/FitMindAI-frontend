import { useDispatch, useSelector } from "react-redux";
import manDiscussPhoto from "../assets/about-us-photos/man-discussing.png";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/actions";
import ProductCard from "./shared/ProductCard";
import Loader from "./shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const timelineData = [
  {
    year: "2023",
    title: "Company Founded",
    text: "We started with a small team and a big dream: improve supplementation with premium products.",
  },
  {
    year: "2024",
    title: "First 1,000 Happy Customers",
    text: "We reached a key milestone and built a strong community of wellness-focused individuals.",
  },
  {
    year: "2025",
    title: "Expansion into Specialized Supplements",
    text: "We introduced targeted lines for mental clarity, muscle recovery, and overall vitality.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      {/* Nagłówek */}
      <section className="text-center">
        <h1 className="text-slate-900 text-4xl font-extrabold mb-4">
          About Us
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We’re passionate about making your shopping experience smooth,
          trustworthy and enjoyable. Here's our journey and what our customers
          say about us.
        </p>
      </section>

      {/* Sekcja powitalna */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">Who We Are</h2>
          <p className="text-slate-600">
            At Bartosz Rafałko sp. z o.o., we strive to provide top-quality
            products and a seamless online shopping experience. From the heart
            of Augustów, our team works hard to earn your trust every day.
          </p>
          <ul className="list-disc list-inside text-slate-600">
            <li>High-quality product curation</li>
            <li>Fast and secure delivery</li>
            <li>Dedicated support and service</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={manDiscussPhoto}
            alt="Team brainstorming"
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Our Journey
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="relative mb-4 text-center">
            <span className="text-slate-500 text-sm">Year</span>
            <div className="text-indigo-600 font-semibold text-2xl transition-all duration-300">
              {timelineData[activeIndex].year}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={timelineData.length - 1}
            value={activeIndex}
            step={1}
            onChange={(e) => setActiveIndex(Number(e.target.value))}
            className="w-full appearance-none h-2 bg-slate-200 rounded-lg outline-none transition-all duration-300
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:bg-indigo-600
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:appearance-none
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:bg-indigo-600
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:cursor-pointer"
          />

          <div className="text-center mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {timelineData[activeIndex].title}
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto">
              {timelineData[activeIndex].text}
            </p>
          </div>
        </div>
      </section>

      {/* Opinie klientów */}
      <section>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Anna K.",
              review:
                "Fast shipping and great customer service. I’ll definitely come back!",
            },
            {
              name: "Michał T.",
              review:
                "High quality and exactly as described. Trustworthy seller.",
            },
            {
              name: "Julia P.",
              review:
                "The best experience I’ve had with an online shop. Highly recommend!",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow-md border border-slate-100 text-slate-700"
            >
              <p className="mb-4 italic">"{testimonial.review}"</p>
              <div className="text-right font-semibold text-indigo-600">
                – {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dane kontaktowe */}
      <section className="bg-slate-100 p-8 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Seller Information
        </h2>
        <ul className="text-slate-700 space-y-2">
          <li>
            <strong>Company:</strong> Bartosz Rafałko sp. z o.o.
          </li>
          <li>
            <strong>Address:</strong> Zygmuntowska, 16-300 Augustów
          </li>
          <li>
            <strong>VAT ID:</strong> 123426895
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:boch33n@gmail.com"
              className="text-indigo-600 hover:underline"
            >
              boch33n@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+48519578401"
              className="text-indigo-600 hover:underline"
            >
              +48 519 578 401
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
