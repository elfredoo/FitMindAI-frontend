import {
  bannerImageCognitive,
  bannerImageEnergy,
  bannerImageJoint,
  bannerImageAll,
} from "./constant";

export const bannerLists = [
  {
    id: 1,
    image: bannerImageCognitive,
    title: "Cognitive Function & Memory Supplements",
    subtitle: "Enhance focus, mental clarity, and memory retention.",
    description:
      "Supplements that help improve focus, memory, and mental clarity",
    url: "/products?category=Cognitive+Support",
  },
  {
    id: 2,
    image: bannerImageEnergy,
    title: "Energy & Endurance Supplements",
    subtitle: "Boost energy levels and enhance physical performance",
    description:
      "Products designed to boost energy, reduce fatigue, and enhance physical endurance",
    url: "/products?category=Energy+%26+Endurance",
  },
  {
    id: 3,
    image: bannerImageJoint,
    title: "Joint & Bone Health Supplements",
    subtitle: "Support joint mobility and strengthen bones.",
    description:
      "Supplements that support the health of joints, bones, and cartilage, promoting mobility and reducing pain",
    url: "/products?category=Joint+%26+Bone+Health",
  },
  {
    id: 4,
    image: bannerImageAll,
    title: "Browse All Supplements",
    subtitle: "Explore our full collection of health products",
    description:
      "Discover all categories of supplements tailored to your health and wellness needs",
    url: "/products",
  },
];
