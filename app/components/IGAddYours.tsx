"use client";

export default function IGAddYours() {
  return (
    <div className="portal-section">
      <div className="portal-section-header">ร่วมเล่น IG Story: Add Yours</div>
      <div className="orange-bar-thin" />
      <div className="p-4 flex flex-col items-center gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-[#6b1a1a] tracking-wide">📸 Moment with Seniors</div>
          <div className="text-xs text-[#8a8070] mt-1">IG Story &ldquo;Add Yours&rdquo; Campaign</div>
        </div>
        <div className="text-sm text-[#5c3a24] text-center leading-relaxed bg-[#f3ebda] border border-[#d0cec8] px-3 py-2 w-full">
          โพสต์รูปหรือวิดีโอโมเมนต์ที่คุณมีกับรุ่นพี่<br />แล้วร่วมเล่น Add Yours ใน IG Story
        </div>
        <div className="qr-container">
          <div className="w-[140px] h-[140px] bg-[#f5f0e5] border border-[#d0cec8] flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-[#3a0a0a]">
              <rect x="8" y="8" width="28" height="28" fill="currentColor" />
              <rect x="12" y="12" width="20" height="20" fill="white" />
              <rect x="16" y="16" width="12" height="12" fill="currentColor" />
              <rect x="84" y="8" width="28" height="28" fill="currentColor" />
              <rect x="88" y="12" width="20" height="20" fill="white" />
              <rect x="92" y="16" width="12" height="12" fill="currentColor" />
              <rect x="8" y="84" width="28" height="28" fill="currentColor" />
              <rect x="12" y="88" width="20" height="20" fill="white" />
              <rect x="16" y="92" width="12" height="12" fill="currentColor" />
              <rect x="44" y="8" width="4" height="4" fill="currentColor" />
              <rect x="52" y="12" width="4" height="4" fill="currentColor" />
              <rect x="60" y="8" width="4" height="4" fill="currentColor" />
              <rect x="48" y="20" width="4" height="4" fill="currentColor" />
              <rect x="44" y="44" width="8" height="8" fill="currentColor" />
              <rect x="56" y="48" width="4" height="4" fill="currentColor" />
              <rect x="64" y="44" width="4" height="8" fill="currentColor" />
              <rect x="84" y="44" width="4" height="4" fill="currentColor" />
              <rect x="96" y="52" width="4" height="4" fill="currentColor" />
              <rect x="44" y="84" width="4" height="4" fill="currentColor" />
              <rect x="56" y="88" width="4" height="4" fill="currentColor" />
              <rect x="68" y="92" width="8" height="4" fill="currentColor" />
              <rect x="84" y="84" width="4" height="4" fill="currentColor" />
              <rect x="96" y="96" width="4" height="4" fill="currentColor" />
              <rect x="104" y="88" width="4" height="4" fill="currentColor" />
            </svg>
          </div>
          <div className="text-center text-[10px] text-[#8a8070] mt-1.5 font-bold">SCAN QR CODE</div>
        </div>
        <div className="portal-section w-full">
          <div className="bg-gradient-to-r from-[#e5e2da] to-[#d0cec8] px-3 py-1 text-[11px] font-bold text-[#3a0a0a] border-b border-[#b5b3ac]">
            ขั้นตอนการร่วมกิจกรรม:
          </div>
          <ol className="text-xs text-[#3a0a0a] px-3 py-2 space-y-1 list-decimal list-inside">
            <li>เปิด Instagram</li>
            <li>เข้า Story ของเพจ / ทีมงาน</li>
            <li>กด Add Yours</li>
            <li>ใส่รูปหรือวิดีโอโมเมนต์กับรุ่นพี่</li>
            <li>แท็กเพื่อนให้มาร่วมเล่นต่อ</li>
          </ol>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <span className="text-xs font-bold text-[#8b2525] bg-[#fde2c8] border border-[#f0c090] px-2 py-0.5">#MomentWithSeniors</span>
          <span className="text-xs font-bold text-[#8b2525] bg-[#fde2c8] border border-[#f0c090] px-2 py-0.5">#KMUTTITByeByeParty</span>
        </div>
      </div>
    </div>
  );
}
