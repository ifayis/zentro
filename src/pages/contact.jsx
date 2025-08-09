import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "mohammedfayis135@gmail.com",
        },
        "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-lg w-full z-10"
      >
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-gray-300 text-center mb-8">
          Have questions or feedback? Fill out the form below and we’ll get back to you soon.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Message</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-300"
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg"
          >
            Send Message
          </motion.button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-green-400">{status}</p>
        )}
      </motion.div>
    </div>
  );
}
export default Contact