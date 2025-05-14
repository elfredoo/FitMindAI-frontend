import React, { useState } from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRecommendation } from "../../store/actions";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

export default function AskAI() {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [goals, setGoals] = useState("");
  const [genderError, setGenderError] = useState(null);
  const [ageError, setAgeError] = useState("");
  const [goalsError, setGoalsError] = useState("");
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setGenderError(null);
    setAgeError("");
    setGoalsError("");

    let isValid = true;

    if (gender === "") {
      setGenderError("Please select your gender");
      isValid = false;
    }

    if (
      age === "" ||
      isNaN(age) ||
      Number.parseInt(age) <= 0 ||
      Number.parseInt(age) > 120
    ) {
      setAgeError("Please enter a valid age between 1 and 120");
      isValid = false;
    }

    if (goals.trim() === "") {
      setGoalsError("Please describe your goals");
      isValid = false;
    }

    if (goals.trim.length > 300) {
      setGoalsError("Please limit your goals to 300 characters");
      isValid = false;
    }

    if (isValid) {
      const aiResponse = await dispatch(
        getProductsRecommendation({
          gender: gender.toUpperCase(),
          age: Number.parseInt(age),
          userGoals: goals,
        })
      );
      setResponse(aiResponse);
    } else {
      setResponse("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen flex justify-center items-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded-xl shadow-xl space-y-8">
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ask AI for Supplement Recommendations
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gender */}
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-gray-700 mb-2 font-semibold"
              >
                Gender
              </label>
              <select
                id="gender"
                className={`p-4 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  genderError ? "bg-red-200" : "bg-gray-200"
                }`}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {genderError && (
                <p className="text-red-500 text-sm mt-1">{genderError}</p>
              )}
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label htmlFor="age" className="text-gray-700 mb-2 font-semibold">
                Age
              </label>
              <input
                type="number"
                id="age"
                className={`p-4 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  ageError ? "bg-red-200" : ""
                }`}
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {ageError && (
                <p className="text-red-500 text-sm mt-1">{ageError}</p>
              )}
            </div>
          </div>

          {/* Goals */}
          <div>
            <label htmlFor="goals" className="text-gray-700 mb-2 font-semibold">
              Your Goals
            </label>
            <textarea
              id="goals"
              className={`w-full p-4 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                goalsError ? "bg-red-200" : ""
              }`}
              placeholder="Enter your fitness or health goals"
              rows={4}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
            {goalsError && (
              <p className="text-red-500 text-sm mt-1">{goalsError}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 text-white font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            whileHover={{
              scale: 1.02,
              backgroundPosition: "100% 50%",
            }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            style={{
              backgroundSize: "400% 400%",
              backgroundImage:
                "linear-gradient(to right, #4f46e5, #9333ea, #ec4899, #f472b6)",
              animation: "gradient-animation 3s ease infinite",
            }}
          >
            Get Recommendation
          </motion.button>
        </motion.form>

        {/* AI Response */}
        {isLoading && <Loader text={"Loading AI response..."} />}
        {errorMessage && (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        )}
        {response && (
          <motion.div
            className="mt-8 p-6 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b border-gray-300 pb-2">
              AI Response
            </h2>
            <div className="prose prose-purple max-w-none">
              <Markdown>{response}</Markdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
