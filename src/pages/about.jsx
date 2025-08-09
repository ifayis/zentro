import React from 'react';
import { useNavigate } from 'react-router-dom';
function About() {
  const navigate = useNavigate()
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#dce3ea] flex items-center justify-center px-6">
      <div className="max-w-3xl text-center bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          About <span className="text-blue-600">Zentro App</span>
        </h2>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Zentro App is your elegant suite of productivity tools — from timers and to-do lists to background changers and counters — designed to keep your day organized and visually inspiring. Built with modern tech and attention to detail, Zentro helps you focus on what truly matters.
        </p>

        <div className="mt-10 flex justify-center">
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition transform duration-300">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}

export default About