import React, { useState } from 'react';

function ColorChanger() {
  const [color, setColor] = useState('');
  const [bgColor, setBgColor] = useState('#0F172A');

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const applyColor = () => {
    setBgColor(color);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center transition-all duration-700"
      style={{ backgroundColor: bgColor }}
    >
      <div className="bg-[#1E293B] p-10 rounded-3xl shadow-2xl text-center animate-fade-in w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-[#38BDF8] mb-6">🎨 Color Changer</h1>

        <input
          type="text"
          placeholder="Enter a color (name or hex)"
          value={color}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl text-[#0F172A] font-medium text-center focus:outline-none focus:ring-4 focus:ring-[#38BDF8] transition-all duration-300"
        />

        <button
          onClick={applyColor}
          className="mt-6 w-full py-3 bg-[#38BDF8] text-[#0F172A] font-semibold rounded-xl hover:bg-[#F472B6] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Apply Color
        </button>
      </div>
    </div>
  );
}

export default ColorChanger;