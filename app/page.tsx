import MessageBoard from "./components/MessageBoard";
import IGAddYours from "./components/IGAddYours";
import WishButton from "./components/WishButton";
import Sidebar from "./components/Sidebar";
import ActivityLogTable from "./components/ActivityLogTable";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e5]">
      {/* ============ HEADER ============ */}
      <header>
        {/* Gold stripe top */}
        <div className="portal-header-gold-stripe" />

        {/* Main header */}
        <div className="portal-header-gradient text-[#faf5eb] px-6 py-3">
          <div className="max-w-[1920px] mx-auto flex items-center justify-between">
            {/* Left: Main title */}
            <div className="flex items-center gap-4">
              {/* University crest placeholder */}
              <div className="w-14 h-14 border-2 border-[#d4b05c] rounded-full flex items-center justify-center bg-[#4d1111] shrink-0">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide leading-tight">
                  ระบบสารสนเทศงานเลี้ยงอำลารุ่นพี่
                </h1>
                <div className="text-sm font-bold tracking-[0.15em] text-[#d4b05c]">
                  BYE BYE PARTY INFORMATION SYSTEM
                </div>
                <div className="text-xs text-[#c4c1b8] mt-0.5">
                  KMUTT IT Bye Bye Party 2024
                </div>
              </div>
            </div>

            {/* Right: Organization info */}
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#d4b05c]">
                KMUTT IT Student Team
              </div>
              <div className="text-[10px] text-[#b5b3ac]">
                Farewell Activity System
              </div>
              <div className="text-[10px] text-[#8a8070] mt-1 font-mono">
                v1.0 | 2024
              </div>
            </div>
          </div>
        </div>

        {/* Gold stripe bottom */}
        <div className="portal-header-gold-stripe" />

        {/* Orange bar */}
        <div className="orange-bar" />
      </header>

      {/* ============ NAVIGATION ============ */}
      <nav className="bg-[#e8dcc6] border-b border-[#b5b3ac]">
        <div className="max-w-[1920px] mx-auto flex flex-wrap">
          <span className="nav-tab active">หน้าหลัก</span>
          <span className="nav-tab">กระดานข้อความ</span>
          <span className="nav-tab">IG Add Yours</span>
          <span className="nav-tab">ส่งคำอวยพร</span>
          <span className="nav-tab">รายชื่อผู้ร่วมกิจกรรม</span>
          <span className="nav-tab">ติดต่อทีมงาน</span>
        </div>
      </nav>

      {/* Secondary nav */}
      <div className="bg-[#d0cec8] border-b border-[#b5b3ac]">
        <div className="max-w-[1920px] mx-auto flex flex-wrap px-2">
          <span className="text-[11px] px-3 py-1 text-[#5c3a24] cursor-pointer hover:text-[#3a0a0a] hover:underline">
            ข้อมูลกิจกรรม
          </span>
          <span className="text-[11px] px-3 py-1 text-[#5c3a24] cursor-pointer hover:text-[#3a0a0a] hover:underline">
            ข้อความล่าสุด
          </span>
          <span className="text-[11px] px-3 py-1 text-[#5c3a24] cursor-pointer hover:text-[#3a0a0a] hover:underline">
            Moment กับรุ่นพี่
          </span>
          <span className="text-[11px] px-3 py-1 text-[#5c3a24] cursor-pointer hover:text-[#3a0a0a] hover:underline">
            Good Journey Wishes
          </span>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-3">
        <div className="flex gap-3 flex-col lg:flex-row">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[220px] shrink-0">
            <Sidebar />
          </aside>

          {/* Center: Message Board */}
          <section className="flex-1 min-w-0">
            <div className="portal-section mb-3">
              <div className="portal-section-header text-base">
                กระดานข้อความถึงรุ่นพี่
              </div>
              <div className="orange-bar" />
            </div>
            <MessageBoard />

            {/* Activity Log below message board */}
            <div className="mt-3">
              <ActivityLogTable />
            </div>
          </section>

          {/* Right Panel */}
          <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-3">
            <IGAddYours />
            <WishButton />
          </aside>
        </div>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="mt-auto">
        <div className="orange-bar" />
        <div className="portal-header-gold-stripe" />
        <div className="bg-[#3a0a0a] text-[#b5b3ac] px-6 py-3">
          <div className="max-w-[1920px] mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="text-xs space-y-0.5">
              <div>
                พัฒนาโดย{" "}
                <span className="text-[#d4b05c] font-bold">
                  KMUTT IT Student Team
                </span>
              </div>
              <div>
                สำหรับใช้งานภายในงาน Bye Bye Party 2024
              </div>
            </div>
            <div className="text-right text-[10px] space-y-0.5">
              <div>Best viewed on event Wi-Fi</div>
              <div>Version 1.0 | Last updated: Today</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
