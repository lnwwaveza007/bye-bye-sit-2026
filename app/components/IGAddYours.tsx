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
        <div className="flex justify-center gap-3 w-full">
          {/* Example Image */}
          <div className="flex flex-col items-center">
            <div className="w-[110px] h-[180px] bg-white border border-[#d0cec8] p-1 shadow-sm">
              <img src="/imgs/ig_story_example.png" alt="Example IG Story" className="w-full h-full object-cover" />
            </div>
            <div className="text-center text-[10px] text-[#8a8070] mt-1.5 font-bold">ตัวอย่างภาพ</div>
          </div>
        </div>
        <div className="portal-section w-full">
          <div className="bg-gradient-to-r from-[#e5e2da] to-[#d0cec8] px-3 py-1 text-[11px] font-bold text-[#3a0a0a] border-b border-[#b5b3ac]">
            ขั้นตอนการร่วมกิจกรรม:
          </div>
          <ol className="text-xs text-[#3a0a0a] px-3 py-2 space-y-1 list-decimal list-inside">
            <li>เปิด IG : samosit.kmutt</li>
            <li>เข้า Hightlight : Bye Bye IT 2026</li>
            <li>กด Add Yours</li>
            <li>ใส่รูปหรือวิดีโอโมเมนต์กับรุ่นพี่</li>
            <li>แชร์ความทรงจำดีๆ กันเยอะๆ เลย เย่ะ !</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
