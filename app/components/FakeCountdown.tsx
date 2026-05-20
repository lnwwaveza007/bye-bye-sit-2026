"use client";

import { useState, useEffect } from "react";

export default function FakeCountdown() {
  // Start with 20 minutes (1200 seconds)
  const [timeLeft, setTimeLeft] = useState(1200);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsDone(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="w-[140px] mx-auto bg-[#ffffff] border-2 border-[#b8730f] flex flex-col overflow-hidden shadow-sm">
      <div 
        className="text-center font-bold py-1 text-sm text-white"
        style={{
          background: "url('/imgs/header-tab.png') repeat-x left top",
          borderBottom: "1px solid #b8730f",
        }}
      >
        เวลาใช้งานเหลือ
      </div>
      <div className="p-3 text-center flex flex-col items-center justify-center bg-[#fdfaf5] h-[125px]">
        {isDone ? (
          <div className="py-4 text-[#8b2525] font-bold text-sm animate-pulse">
            แป๋ว ไม่มีไรหรอก 😜
          </div>
        ) : (
          <>
            <div className="text-[32px] font-serif font-bold text-black leading-none mb-3 tracking-wider tabular-nums" style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-[11px] text-[#003366] leading-[1.4] font-medium">
              แต่ถ้าไม่ใช้งาน<br />นาน 15 นาที<br />ระบบจะตัดการ<br />เชื่อมต่อ
            </div>
          </>
        )}
      </div>
    </div>
  );
}
