import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setEssay } from "../redux/essaySlice";
import { useNavigate } from "react-router-dom";

export default function PlanBeforeWriting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================
  // STATE
  // =====================
  const [form, setForm] = useState({
    topic: "",
    introduction: "",
    body1: "",
    body2: "",
    conclusion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(setEssay(form));
    navigate("/write-essay");
  };

  // =====================
  // TIMER
  // =====================
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-screen bg-black-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold !text-blue-600">Plan Before Writing</h1>
      {/* TIMER */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <div className="text-3xl font-mono font-bold">
          ⏱ {formatTime(seconds)}
        </div>

        <button
          onClick={startTimer}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={stopTimer}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>

        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        <input
          name="topic"
          placeholder="Essay Topic"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="introduction"
          placeholder="Introduction"
          onChange={handleChange}
          className="w-full h-28 p-3 border rounded-lg"
        />

        <textarea
          name="body1"
          placeholder="Body 1"
          onChange={handleChange}
          className="w-full h-28 p-3 border rounded-lg"
        />

        <textarea
          name="body2"
          placeholder="Body 2"
          onChange={handleChange}
          className="w-full h-28 p-3 border rounded-lg"
        />

        <textarea
          name="conclusion"
          placeholder="Conclusion"
          onChange={handleChange}
          className="w-full h-28 p-3 border rounded-lg"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save Plan & Start Writing →
      </button>
    </div>
  );
}
