import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; 

const features = [
  {
    title: "Seamless Experience",
    description:
      "Switch effortlessly between apps with smooth animations and intuitive navigation.",
  },
  {
    title: "Secure Data Storage",
    description:
      "Your preferences and progress are stored securely, even after you log out.",
  },
  {
    title: "Modern UI & UX",
    description:
      "Beautiful gradients, luxury feel, and smooth interactions for an enjoyable experience.",
  },
  {
    title: "Fully Responsive",
    description:
      "Optimized for mobile, tablet, and desktop — use your apps anywhere.",
  },
];

 function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-6 py-16">
 
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features, Beautifully Crafted
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Everything you need in one place — built with elegance and performance in mind.
        </motion.p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border border-white/20 backdrop-blur-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="flex items-start space-x-4">
              <CheckCircle className="text-green-400 w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300 mt-2">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Features