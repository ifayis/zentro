import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [email, setEmail] = useState(null);
  const [docId, setDocId] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("zentro_user_email")?.toLowerCase();
    if (userEmail) {
      setEmail(userEmail);
    } else {
      alert("You must be logged in.");
    }
  }, []);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://zentro-app-znor.onrender.com/timers?email=${email}`);
        const data = await res.json();

        if (data.length > 0) {
          const timer = data[0];
          setTime(timer.milliseconds || 0);
          setLaps(timer.laps || []);
          setDocId(timer.id);
        } else {
          const res = await fetch(`https://zentro-app-znor.onrender.com/timers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, milliseconds: 0, laps: [] }),
          });
          const newDoc = await res.json();
          setDocId(newDoc.id);
        }
      } catch (err) {
        console.error("Error fetching timer:", err);
      }
    };

    fetchData();
  }, [email]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (docId) {
      saveTimerToDB(time, laps);
    }
  }, [time, laps]);

  const saveTimerToDB = async (ms, lapList) => {
    try {
      await fetch(`https://zentro-app-znor.onrender.com/timers/${docId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: docId,
          email,
          milliseconds: ms,
          laps: lapList,
        }),
      });
    } catch (err) {
      console.error("Error saving timer:", err);
    }
  };

  const formatTime = (millis) => {
    const minutes = String(Math.floor(millis / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((millis % 60000) / 1000)).padStart(2, "0");
    const ms = String(Math.floor((millis % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}.${ms}`;
  };

  const handleLap = () => {
    const updatedLaps = [...laps, time];
    setLaps(updatedLaps);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center px-4">
      <div className="bg-[#1E293B] p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#38BDF8] mb-6">⏱️ Premium Timer</h1>
        <p className="text-5xl font-mono mb-6">{formatTime(time)}</p>

        <div className="flex justify-center gap-4 mb-6">
          {!running ? (
            <button
              onClick={() => setRunning(true)}
              className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setRunning(false)}
              className="px-6 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
            >
              Stop
            </button>
          )}

          <button
            onClick={handleLap}
            disabled={!running}
            className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            Lap
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>

        <div className="text-left max-h-64 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">📝 Laps:</h2>
          {laps.length === 0 ? (
            <p className="text-gray-400">No laps recorded.</p>
          ) : (
            <ul className="list-decimal ml-4 space-y-1 text-sm">
              {laps.map((lap, index) => (
                <li key={index}>{formatTime(lap)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timer;