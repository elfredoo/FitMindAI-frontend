import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Filter({ categories }) {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currCategory = searchParams.get("category") || "all";
    const currSortOrder = searchParams.get("sortby") || "asc";
    const currSearchTerm = searchParams.get("keyword") || "";

    setCategory(currCategory);
    setSortOrder(currSortOrder);
    setSearchTerm(currSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      console.log(searchTerm);
      navigate(`${pathName}?${searchParams.toString()}`);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathName]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }
    navigate(`${pathName}?${params}`);
    setCategory(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathName}?${params}`);
      return newOrder;
    });
  };

  const handleClearFilter = () => {
    navigate({ pathName: window.location.pathname });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-md"
    >
      {/* SEARCH */}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="w-full max-w-xl relative"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:outline-none text-sm text-gray-800 bg-white shadow-sm transition"
        />
        <FiSearch
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={18}
        />
      </motion.div>

      {/* FILTER CONTROLS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center sm:justify-end gap-4"
      >
        {/* Category Select */}
        <FormControl variant="outlined" size="small" className="min-w-[160px]">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="bg-white rounded-md"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort Button */}
        <Tooltip title={`Sorted by price: ${sortOrder}`}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleSortOrder}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm px-4 py-2 rounded-md shadow-sm transition"
          >
            Sort by
            {sortOrder === "asc" ? (
              <FiArrowUp size={16} />
            ) : (
              <FiArrowDown size={16} />
            )}
          </motion.button>
        </Tooltip>

        {/* Clear Filter Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClearFilter}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm px-4 py-2 rounded-md border border-gray-300 shadow-sm transition"
        >
          <FiRefreshCw size={16} />
          Clear Filter
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
