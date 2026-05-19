"use client";

import { useState, useEffect, useCallback } from "react";
import type { ActivityLog } from "@/app/lib/types";

export default function ActivityLogTable() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data.logs);
    } catch {
      console.error("Failed to fetch logs");
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Message Board": return "📝";
      case "IG Add Yours": return "📸";
      case "Good Journey": return "🎓";
      default: return "📋";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "สำเร็จ": return "badge-success";
      case "พร้อมใช้งาน": return "badge-active";
      case "รอดำเนินการ": return "badge-pending";
      default: return "badge-success";
    }
  };

  return (
    <div className="portal-section">
      <div className="portal-section-header">บันทึกกิจกรรมระบบ (Activity Log)</div>
      <div className="orange-bar-thin" />
      <div className="max-h-[250px] overflow-y-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="w-[60px]">เวลา</th>
              <th className="w-[120px]">ประเภทกิจกรรม</th>
              <th>รายละเอียด</th>
              <th className="w-[80px]">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-[#8a8070] py-4 text-sm">
                  ยังไม่มีบันทึกกิจกรรม
                </td>
              </tr>
            ) : (
              logs.slice(0, 15).map((log) => (
                <tr key={log.id}>
                  <td className="font-mono text-xs">{formatTime(log.time)}</td>
                  <td className="text-xs">{getTypeIcon(log.type)} {log.type}</td>
                  <td className="text-xs">{log.detail}</td>
                  <td><span className={`badge ${getStatusBadge(log.status)}`}>{log.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
