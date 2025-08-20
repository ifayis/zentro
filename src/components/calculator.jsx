import React, { useEffect, useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [email, setEmail] = useState(null);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("zentro_user_email")?.toLowerCase();
    if (userEmail) {
      setEmail(userEmail);
    } else {
      alert("You must be logged in to use the calculator.");
    }
  }, []);

  useEffect(() => {
    if (email) {
      fetchCalculation(email);
    }
  }, [email]);

  const fetchCalculation = async (userEmail) => {
    try {
      const res = await fetch(
        `https://zentro-1qs5.onrender.com/calculations?email=${userEmail}`
      );
      const data = await res.json();

      if (data.length > 0) {
        setInput(data[0].expression || "");
        setDocId(data[0].id);
      } else {
        const res = await fetch(`https://zentro-1qs5.onrender.com/calculations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, expression: "" }),
        });
        const newDoc = await res.json();
        setDocId(newDoc.id);
      }
    } catch (err) {
      console.error("Error fetching calculation:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveCalculation = async (expression) => {
    if (!docId || !email) return;
    try {
      await fetch(`https://zentro-1qs5.onrender.com/calculations/${docId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: docId, email: email, expression }),
      });
    } catch (err) {
      console.error("Error saving calculation:", err);
    }
  };

  const handleClick = (value) => {
    const newInput = input + value;
    setInput(newInput);
    saveCalculation(newInput);
  };

  const clearInput = () => {
    setInput("");
    saveCalculation("");
  };

  const calculate = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      saveCalculation(result);
    } catch {
      setInput("Error");
      saveCalculation("Error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
        <div className="text-xl">Loading calculator...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
      <div className="bg-[#1E293B] p-6 rounded-3xl shadow-2xl w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#38BDF8] mb-4">🧮 Calculator</h1>

        <input
          type="text"
          value={input}
          readOnly
          className="w-full h-14 mb-4 text-right p-3 rounded-lg bg-gray-800 text-white text-xl outline-none"
        />

        <div className="grid grid-cols-4 gap-3">
          {["7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"].map((btn) => (
            <button
              key={btn}
              onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
              className={`p-3 rounded-lg text-white text-lg font-bold transition ${
                btn === "="
                  ? "bg-[#38BDF8] hover:bg-[#0ea5e9]"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={clearInput}
            className="col-span-4 p-3 rounded-lg bg-[#F472B6] hover:bg-[#e956a1] text-white text-lg font-bold"
          >
            C
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
