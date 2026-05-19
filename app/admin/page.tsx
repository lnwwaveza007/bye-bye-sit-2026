"use client";

import { useState, useEffect, useCallback } from "react";
import type { Message } from "@/app/lib/types";

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin data state
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({ totalMessages: 0, totalWishes: 0 });
  const [actionFeedback, setActionFeedback] = useState("");

  // Check session on mount
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError("กรุณากรอกรหัสผ่าน");
      return;
    }
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        const data = await res.json();
        setLoginError(data.error || "รหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setLoginError("ไม่สามารถเชื่อมต่อระบบได้");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  // Fetch admin data
  const fetchData = useCallback(async () => {
    try {
      const [msgRes, statsRes] = await Promise.all([
        fetch("/api/messages?all=true"),
        fetch("/api/stats"),
      ]);
      const msgData = await msgRes.json();
      const statsData = await statsRes.json();
      setMessages(msgData.messages);
      setStats(statsData);
    } catch {
      console.error("Failed to fetch admin data");
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData, isAuthenticated]);

  const updateStatus = async (id: string, status: Message["status"]) => {
    try {
      await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setActionFeedback(`อัพเดทสถานะเป็น "${status}" สำเร็จ`);
      fetchData();
      setTimeout(() => setActionFeedback(""), 3000);
    } catch {
      setActionFeedback("เกิดข้อผิดพลาด");
    }
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("ต้องการลบข้อความนี้?")) return;
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setActionFeedback("ลบข้อความสำเร็จ");
      fetchData();
      setTimeout(() => setActionFeedback(""), 3000);
    } catch {
      setActionFeedback("เกิดข้อผิดพลาด");
    }
  };

  const resetWishes = async () => {
    if (!confirm("ต้องการรีเซ็ตตัวนับคำอวยพร?")) return;
    try {
      await fetch("/api/wishes?action=reset", { method: "POST" });
      setActionFeedback("รีเซ็ตตัวนับสำเร็จ");
      fetchData();
      setTimeout(() => setActionFeedback(""), 3000);
    } catch {
      setActionFeedback("เกิดข้อผิดพลาด");
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      timeZone: "Asia/Bangkok",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "visible": return "badge-visible";
      case "approved": return "badge-success";
      case "hidden": return "badge-pending";
      case "pending": return "badge-active";
      default: return "";
    }
  };

  // ============ LOADING STATE ============
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#f5f0e5] flex items-center justify-center">
        <div className="portal-section p-6 text-center">
          <div className="text-sm text-[#5c3a24]">กำลังตรวจสอบสิทธิ์...</div>
        </div>
      </div>
    );
  }

  // ============ LOGIN SCREEN ============
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f0e5] flex flex-col">
        {/* Header */}
        <div className="portal-header-gold-stripe" />
        <div className="portal-header-gradient text-[#faf5eb] px-6 py-3">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-lg font-bold">🔐 ระบบจัดการ (Admin Panel)</h1>
            <div className="text-xs text-[#b5b3ac]">
              KMUTT IT Bye Bye Party 2024 — Message Moderation
            </div>
          </div>
        </div>
        <div className="portal-header-gold-stripe" />
        <div className="orange-bar" />

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="portal-section w-full max-w-[400px]">
            <div className="portal-section-header text-sm">
              เข้าสู่ระบบจัดการ (Admin Login)
            </div>
            <div className="orange-bar-thin" />
            <div className="p-6">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                {/* Lock icon */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto border-2 border-[#8b2525] rounded-full flex items-center justify-center bg-[#f3ebda] mb-2">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <div className="text-sm text-[#5c3a24] font-bold">
                    กรุณากรอกรหัสผ่านเพื่อเข้าใช้งาน
                  </div>
                  <div className="text-[11px] text-[#8a8070] mt-1">
                    Admin authentication required
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="admin-password"
                    className="text-xs font-bold text-[#5c3a24]"
                  >
                    รหัสผ่าน (Password):
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    className="portal-input w-full text-sm py-2"
                    placeholder="กรอกรหัสผ่าน..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    autoComplete="current-password"
                  />
                </div>

                {/* Error message */}
                {loginError && (
                  <div className="bg-[#f8d7da] border border-[#f5c6cb] text-[#721c24] px-3 py-2 text-xs font-bold">
                    ❌ {loginError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-maroon w-full py-2.5 text-sm disabled:opacity-50"
                  disabled={isLoggingIn}
                  id="admin-login-btn"
                >
                  {isLoggingIn ? "กำลังเข้าสู่ระบบ..." : "🔓 เข้าสู่ระบบ"}
                </button>

                {/* Back link */}
                <a
                  href="/"
                  className="text-center text-xs text-[#6b1a1a] hover:underline"
                >
                  ← กลับหน้าหลัก
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ ADMIN DASHBOARD ============
  return (
    <div className="min-h-screen bg-[#f5f0e5]">
      {/* Header */}
      <div className="portal-header-gold-stripe" />
      <div className="portal-header-gradient text-[#faf5eb] px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">🔐 ระบบจัดการ (Admin Panel)</h1>
            <div className="text-xs text-[#b5b3ac]">KMUTT IT Bye Bye Party 2024 — Message Moderation</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#d4b05c]">✅ เข้าสู่ระบบแล้ว</span>
            <button onClick={handleLogout} className="btn-portal text-xs">
              🚪 ออกจากระบบ
            </button>
            <a href="/" className="btn-portal text-xs no-underline">← กลับหน้าหลัก</a>
          </div>
        </div>
      </div>
      <div className="portal-header-gold-stripe" />
      <div className="orange-bar" />

      <main className="max-w-[1400px] mx-auto p-4 space-y-4">
        {/* Feedback */}
        {actionFeedback && (
          <div className="bg-[#d4edda] border border-[#a8d5b5] text-[#155724] px-4 py-2 text-sm font-bold">
            ✅ {actionFeedback}
          </div>
        )}

        {/* Stats & Actions */}
        <div className="flex flex-wrap gap-4">
          <div className="portal-section flex-1 min-w-[200px]">
            <div className="portal-section-header">สถิติระบบ</div>
            <div className="p-3 text-sm space-y-1">
              <div>📝 ข้อความทั้งหมด: <strong>{messages.length}</strong></div>
              <div>🎓 คำอวยพรทั้งหมด: <strong>{stats.totalWishes}</strong></div>
            </div>
          </div>
          <div className="portal-section flex-1 min-w-[200px]">
            <div className="portal-section-header">การจัดการ</div>
            <div className="p-3 flex flex-wrap gap-2">
              <button onClick={resetWishes} className="btn-maroon text-xs">
                🔄 รีเซ็ตตัวนับคำอวยพร
              </button>
              <a href="/api/export" className="btn-portal text-xs inline-block no-underline" download>
                📥 Export CSV
              </a>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="portal-section">
          <div className="portal-section-header">
            จัดการข้อความ ({messages.length} รายการ)
          </div>
          <div className="orange-bar-thin" />
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="w-[80px]">เวลา</th>
                  <th className="w-[100px]">ผู้ส่ง</th>
                  <th className="w-[100px]">ผู้รับ</th>
                  <th>ข้อความ</th>
                  <th className="w-[70px]">สถานะ</th>
                  <th className="w-[200px]">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id}>
                    <td className="font-mono text-[11px]">{formatTime(msg.createdAt)}</td>
                    <td className="text-xs font-bold">{msg.senderName}</td>
                    <td className="text-xs">{msg.recipient}</td>
                    <td className="text-xs max-w-[300px]">{msg.message}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(msg.status)}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1 flex-wrap">
                        {msg.status !== "visible" && (
                          <button
                            onClick={() => updateStatus(msg.id, "visible")}
                            className="btn-portal text-[10px] px-2 py-0.5"
                          >
                            ✅ แสดง
                          </button>
                        )}
                        {msg.status !== "hidden" && (
                          <button
                            onClick={() => updateStatus(msg.id, "hidden")}
                            className="btn-portal text-[10px] px-2 py-0.5"
                          >
                            🙈 ซ่อน
                          </button>
                        )}
                        <button
                          onClick={() => deleteMsg(msg.id)}
                          className="btn-portal text-[10px] px-2 py-0.5 text-red-700"
                        >
                          🗑️ ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
