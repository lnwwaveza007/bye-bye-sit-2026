"use client";

import { useState, useEffect, useCallback } from "react";
import CurrentTime from "./CurrentTime";

export default function Sidebar() {
  const [stats, setStats] = useState({ totalMessages: 0, totalWishes: 0 });

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch {
      console.error("Failed to fetch stats");
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="flex flex-col gap-3">
      {/* System Info */}
      <div className="portal-section">
        <div className="portal-section-header">ข้อมูลการใช้งาน</div>
        <div className="orange-bar-thin" />
        <div className="p-2.5 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">เวลาปัจจุบัน:</span>
            <CurrentTime />
          </div>
          <div className="border-b border-dashed border-[#d0cec8]" />
          <div className="flex justify-between items-center">
            <span className="text-[#5c3a24] font-bold">สถานะระบบ:</span>
            <span className="flex items-center gap-1.5">
              <span className="status-indicator" />
              <span className="text-green-700 font-bold">เปิดใช้งาน</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">จุดแสดงผล:</span>
            <span>TV Booth 01</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">งาน:</span>
            <span>Bye Bye Party 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">ภาควิชา:</span>
            <span>IT</span>
          </div>
          <div className="border-b border-dashed border-[#d0cec8]" />
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">จำนวนข้อความทั้งหมด:</span>
            <span className="font-mono font-bold text-[#6b1a1a]">
              {String(stats.totalMessages).padStart(3, "0")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5c3a24] font-bold">จำนวนคำอวยพรทั้งหมด:</span>
            <span className="font-mono font-bold text-[#6b1a1a]">
              {String(stats.totalWishes).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Usage Steps */}
      <div className="portal-section">
        <div className="portal-section-header">วิธีการใช้งานระบบ</div>
        <div className="orange-bar-thin" />
        <div className="p-2.5">
          <ol className="text-xs text-[#3a0a0a] space-y-2 list-none">
            <li className="flex items-start gap-2">
              <span className="bg-[#8b2525] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>อ่านข้อความบนกระดาน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#8b2525] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>ร่วมเล่น IG Story &ldquo;Add Yours&rdquo;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#8b2525] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>กดส่งคำอวยพรให้รุ่นพี่</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-[#8b2525] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">4</span>
              <span>ถ่ายรูปกับจอได้เลย 📷</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Quick Links */}
      <div className="portal-section">
        <div className="portal-section-header">ลิงก์ด่วน</div>
        <div className="orange-bar-thin" />
        <div className="p-2.5 text-xs space-y-1">
          <div className="text-[#6b1a1a] hover:underline cursor-pointer">📋 ข้อมูลกิจกรรม</div>
          <div className="text-[#6b1a1a] hover:underline cursor-pointer">📝 ข้อความล่าสุด</div>
          <div className="text-[#6b1a1a] hover:underline cursor-pointer">📸 Moment กับรุ่นพี่</div>
          <div className="text-[#6b1a1a] hover:underline cursor-pointer">🎓 Good Journey Wishes</div>
        </div>
      </div>
    </div>
  );
}
