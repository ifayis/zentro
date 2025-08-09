import React, { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState(null);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('zentro_user_email')?.toLowerCase();
    if (userEmail) {
      setEmail(userEmail);
    } else {
      alert('You must be logged in to use the counter.');
    }
  }, []);

  
  useEffect(() => {
    if (email) {
      fetchCounter(email);
    }
  }, [email]);

  const fetchCounter = async (userEmail) => {
    try {
      const res = await fetch(`https://zentro-1qs5.onrender.com/counters?email=${userEmail}`);
      const data = await res.json();
      console.log('Fetched counter data:', data);

      if (data.length > 0) {
        setCount(data[0].value);
        setDocId(data[0].id);
      } else {
        const res = await fetch(`http://localhost:5000/counters`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, value: 0 }),
        });
        const newDoc = await res.json();
        setCount(0);
        setDocId(newDoc.id);
      }
    } catch (err) {
      console.error('Error fetching counter:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveCounter = async (newValue) => {
    if (!docId || !email) return;

    try {
      await fetch(`http://localhost:5000/counters/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: docId, email: email, value: newValue }),
      });
    } catch (err) {
      console.error('Error saving counter:', err);
    }
  };

  const increment = () => {
    const newVal = count + 1;
    setCount(newVal);
    saveCounter(newVal);
  };

  const decrement = () => {
    const newVal = count > 0 ? count - 1 : 0;
    setCount(newVal);
    saveCounter(newVal);
  };

  const reset = () => {
    setCount(0);
    saveCounter(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
        <div className="text-xl">Loading counter...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
      <div className="bg-[#1E293B] p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-[#38BDF8] mb-6">🔢 Counter</h1>
        <p className="text-6xl font-bold mb-8 text-white">{count}</p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={decrement}
            className="w-16 h-16 bg-[#F472B6] hover:bg-[#e956a1] text-white rounded-full text-3xl font-bold shadow-lg transition duration-300 transform hover:scale-110"
          >
            −
          </button>

          <button
            onClick={increment}
            className="w-16 h-16 bg-[#38BDF8] hover:bg-[#0ea5e9] text-white rounded-full text-3xl font-bold shadow-lg transition duration-300 transform hover:scale-110"
          >
            +
          </button>
        </div>

        <button
          onClick={reset}
          className="mt-2 px-4 py-2 bg-transparent text-sm text-[#F472B6] border border-[#F472B6] rounded-lg hover:bg-[#F472B6] hover:text-white transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;