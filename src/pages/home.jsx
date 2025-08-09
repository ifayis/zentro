import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./footer";

const apps = [
  {
    name: "Todo App",
    description:
      "Our Todo App is designed to keep your life effortlessly organized. With a sleek interface, intuitive controls, and secure storage, you can manage tasks from anywhere.",
    icon: "/icons/todo.webp",
    path: "/todo",
  },
  {
    name: "BG Changer",
    description:
      "Easily switch between beautiful background themes with a single click.",
    icon: "/icons/bg-changer.png",
    path: "/bg-changer",
  },
  {
    name: "Counter",
    description:
      "A minimal, fast, and accurate counter for your counting needs.",
    icon: "/icons/counter.png",
    path: "/counter",
  },
  {
    name: "Timer",
    description:
      "Track time with precision — perfect for workouts, study sessions, and productivity.",
    icon: "/icons/timer.png",
    path: "/timer",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleImageClick = (path) => {
    navigate(path);
  };

  const changeMainApp = (direction) => {
    setCurrentIndex((prev) =>
      direction === "up"
        ? (prev - 1 + apps.length) % apps.length
        : (prev + 1) % apps.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.img
            src={apps[(currentIndex - 1 + apps.length) % apps.length].icon}
            alt="prev app"
            className="w-16 h-16 cursor-pointer opacity-70 hover:opacity-100 transition-transform hover:scale-110"
            onClick={() => changeMainApp("up")}
            whileHover={{ y: -5 }}
          />

          <div className="flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={apps[currentIndex].icon}
                src={apps[currentIndex].icon}
                alt={apps[currentIndex].name}
                className="w-60 h-60 cursor-pointer drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleImageClick(apps[currentIndex].path)}
              />
            </AnimatePresence>

            <motion.h2
              key={apps[currentIndex].name}
              className="text-3xl font-bold mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {apps[currentIndex].name}
            </motion.h2>
            <motion.p
              key={apps[currentIndex].description}
              className="mt-4 max-w-md text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {apps[currentIndex].description}
            </motion.p>
          </div>

          <motion.img
            src={apps[(currentIndex + 1) % apps.length].icon}
            alt="next app"
            className="w-16 h-16 cursor-pointer opacity-70 hover:opacity-100 transition-transform hover:scale-110"
            onClick={() => changeMainApp("down")}
            whileHover={{ y: 5 }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;