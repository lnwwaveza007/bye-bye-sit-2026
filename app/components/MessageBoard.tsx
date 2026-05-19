"use client";

import { useState, useEffect, useCallback } from "react";
import type { Message } from "@/app/lib/types";
import { RECIPIENT_OPTIONS } from "@/app/lib/types";

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderName, setSenderName] = useState("");
  const [recipient, setRecipient] = useState<string>(RECIPIENT_OPTIONS[0]);
  const [specificRecipient, setSpecificRecipient] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data.messages);
    } catch {
      console.error("Failed to fetch messages");
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Auto-refresh every 5s
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !messageText.trim()) {
      setError("กรุณากรอกชื่อและข้อความ");
      return;
    }
    if (recipient === "ระบุเจาะจง" && !specificRecipient.trim()) {
      setError("กรุณาระบุชื่อผู้รับให้ชัดเจน");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let finalRecipient = recipient;
      if (recipient === "ระบุเจาะจง") {
        finalRecipient = specificRecipient.trim();
      } else if (specificRecipient.trim()) {
        finalRecipient = `${recipient} ${specificRecipient.trim()}`;
      }

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: senderName.trim(),
          recipient: finalRecipient,
          message: messageText.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "เกิดข้อผิดพลาด");
        return;
      }

      setSenderName("");
      setMessageText("");
      setRecipient(RECIPIENT_OPTIONS[0]);
      setSpecificRecipient("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      fetchMessages();
    } catch {
      setError("ไม่สามารถส่งข้อความได้ กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Message Form */}
      <div className="portal-section">
        <div className="portal-section-header">เพิ่มข้อความใหม่</div>
        <div className="p-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <div className="flex gap-2.5 items-end flex-wrap">
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <label className="text-xs font-bold text-[#5c3a24]">
                  ชื่อ / นามแฝง:
                </label>
                <input
                  type="text"
                  className="portal-input w-full"
                  placeholder="กรอกชื่อของคุณ"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={50}
                  id="sender-name-input"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-[140px]">
                <label className="text-xs font-bold text-[#5c3a24]">
                  ผู้รับ:
                </label>
                <select
                  className="portal-select w-full"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  id="recipient-select"
                >
                  {RECIPIENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {recipient !== "พี่ปี 4 ทั้งหมด" && (
                <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                  <label className="text-xs font-bold text-[#5c3a24]">
                    {recipient === "ระบุเจาะจง" ? "ระบุชื่อเล่นพี่:" : "ระบุชื่อเล่น (ถ้ามี):"}
                  </label>
                  <input
                    type="text"
                    className="portal-input w-full"
                    placeholder={recipient === "เพื่อน" ? "เช่น ปาล์ม" : "เช่น พี่โอ๊ต"}
                    value={specificRecipient}
                    onChange={(e) => setSpecificRecipient(e.target.value)}
                    maxLength={50}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#5c3a24]">
                ข้อความ:
              </label>
              <textarea
                className="portal-textarea w-full"
                placeholder="เขียนข้อความอำลาของคุณที่นี่..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                maxLength={500}
                rows={3}
                id="message-textarea"
              />
              <div className="text-right text-[10px] text-[#8a8070]">
                {messageText.length}/500
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="btn-maroon disabled:opacity-50"
                disabled={isSubmitting}
                id="submit-message-btn"
              >
                {isSubmitting ? "กำลังส่ง..." : "📩 ส่งข้อความ"}
              </button>
              {submitSuccess && (
                <span className="text-xs text-green-700 font-bold">
                  ✅ ส่งข้อความสำเร็จ!
                </span>
              )}
              {error && (
                <span className="text-xs text-red-700 font-bold">
                  ❌ {error}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Messages Display */}
      <div className="portal-section">
        <div className="portal-section-header">
          <span className="flex-1">
            ข้อความทั้งหมด ({messages.length} รายการ)
          </span>
          <button
            className="text-[10px] px-2 py-0.5 border border-[#b5b3ac] bg-[#faf5eb] rounded-none cursor-pointer hover:bg-[#e8dcc6] transition-colors"
            onClick={() => setAutoScroll(!autoScroll)}
            id="toggle-scroll-btn"
          >
            {autoScroll ? "⏸ หยุด Auto-scroll" : "▶ Auto-scroll"}
          </button>
        </div>
        <div className="orange-bar-thin" />
        <div
          className={`max-h-[420px] p-2 relative ${autoScroll ? "overflow-hidden auto-scroll-container" : "overflow-y-auto"}`}
          id="messages-container"
        >
          {messages.length === 0 ? (
            <div className="text-center py-8 text-[#8a8070] text-sm">
              <div className="text-3xl mb-2">📭</div>
              <div>ยังไม่มีข้อความ — มาเป็นคนแรกที่ส่งข้อความสิ!</div>
            </div>
          ) : (
            <div
              className={autoScroll && messages.length > 2 ? "auto-scroll-content scrolling" : ""}
              style={
                autoScroll && messages.length > 2
                  ? ({ "--scroll-duration": `${messages.length * 6}s` } as React.CSSProperties)
                  : undefined
              }
            >
              {messages.map((msg) => (
                <div key={msg.id} className="message-card">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="sender">👤 {msg.senderName}</span>
                    <span className="text-[#8a8070] text-xs">▸</span>
                    <span className="recipient-tag">{msg.recipient}</span>
                    <span className="text-[#8a8070] text-xs ml-auto">
                      🕐 {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <p className="message-text">{msg.message}</p>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {autoScroll &&
                messages.length > 2 &&
                messages.map((msg) => (
                  <div key={`dup-${msg.id}`} className="message-card">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="sender">👤 {msg.senderName}</span>
                      <span className="text-[#8a8070] text-xs">▸</span>
                      <span className="recipient-tag">{msg.recipient}</span>
                      <span className="text-[#8a8070] text-xs ml-auto">
                        🕐 {formatTime(msg.createdAt)}
                      </span>
                      {/* <span className="badge badge-visible">แสดงบนจอแล้ว</span> */}
                    </div>
                    <p className="message-text">{msg.message}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
