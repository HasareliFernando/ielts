import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function WriteEssay() {
  const essay = useSelector((state: RootState) => state.essay);

  const [text, setText] = useState("");

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
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // =====================
  // COPY
  // =====================
  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // =====================
  // PDF
  // =====================
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageHeight = 297;
    const margin = 15;

    const lines = pdf.splitTextToSize(text, 180);
    const topic = pdf.splitTextToSize(essay.topic, 180);

    
    let y1 = 20;
    pdf.setFontSize(12);
    topic.forEach((line: string) => {
      if (y1 > pageHeight - margin) {
        pdf.addPage();
        y1 = 20;
      }

      pdf.text(line, 15, y1);
      y1 += 7;
    });
    
    let y = 30;
    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(line, 15, y);
      y += 7;
    });

    pdf.save("essay.pdf");
  };
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  return (
    <div className="flex min-h-screen bg-gray-50 !text-black">
      {/* SIDEBAR */}
      <div className="w-1/3 bg-white p-4 border-r space-y-3">
        <h2 className="text-xl font-bold">Plan</h2>

        <p className="whitespace-pre-wrap">
          <b className="block">Topic:</b>
          {essay.topic}
        </p>
        <p className="whitespace-pre-wrap">
          <b className="block">Intro:</b>
          {essay.introduction}
        </p>
        <p className="whitespace-pre-wrap">
          <b className="block">Body 1:</b>
          {essay.body1}
        </p>
        <p className="whitespace-pre-wrap">
          <b className="block">Body 2:</b>
          {essay.body2}
        </p>
        <p className="whitespace-pre-wrap">
          <b className="block">Conclusion:</b>
          {essay.conclusion}
        </p>
      </div>

      {/* MAIN */}
      <div className="w-2/3 p-6 space-y-4">
        <h1 className="text-3xl font-bold !text-blue-600">Essay</h1>
        {/* TIMER */}
        <div className="flex gap-3 items-center bg-white p-3 rounded">
          <div className="text-2xl font-mono">⏱ {formatTime(seconds)}</div>

          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Start
          </button>

          <button
            onClick={stopTimer}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Stop
          </button>

          <button
            onClick={resetTimer}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Reset
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <h4 className="text-xl font-bold">Word Count - {wordCount}</h4>

          <button
            onClick={copyText}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Copy
          </button>

          <button
            onClick={downloadPDF}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>

        {/* WRITING AREA */}
        <div ref={contentRef}>
          <textarea
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[500px] border p-4 rounded-lg"
            placeholder="Write your essay here..."
          />
        </div>
      </div>
    </div>
  );
}
