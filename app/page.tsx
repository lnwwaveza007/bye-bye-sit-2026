import MessageBoard from "./components/MessageBoard";
import IGAddYours from "./components/IGAddYours";
import WishButton from "./components/WishButton";
import Sidebar from "./components/Sidebar";
import ActivityLogTable from "./components/ActivityLogTable";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col font-sans text-[13px]"
      style={{
        background: "url('/imgs/bg-main.gif') 0 0 repeat-x #E7E7DC",
      }}
    >
      <div className="w-full max-w-[1045px] mx-auto bg-white min-h-screen">
        {/* ============ HEADER ============ */}
        <header className="flex flex-col w-full">
          <img src="/imgs/kmutt-academic_01.gif" alt="Header 1" className="w-full block h-[76px]" />
          <img src="/imgs/kmutt-academic_02.gif" alt="Header 2" className="w-full block h-auto" />
          <img src="/imgs/kmutt-academic_03.gif" alt="Header 3" className="w-full block h-auto" />
        </header>

        {/* ============ NAVIGATION ============ */}
        <nav
          className="border-y border-[#b8730f] mt-1"
          style={{ background: "url('/imgs/header-tab.png') repeat-x left top" }}
        >
          {/* Primary nav */}
          <div className="flex flex-wrap border-b border-[#b8730f]">
            <span className="nav-tab active">หน้าหลัก</span>
            <span className="nav-tab">กระดานข้อความ</span>
            <span className="nav-tab">IG Add Yours</span>
            <span className="nav-tab">ส่งคำอวยพร</span>
            <span className="nav-tab">ขอให้มีความสุข</span>
            <span className="nav-tab border-r-0">อย่าลืมกลับมาหากันนะ</span>
          </div>

          {/* Secondary nav
          <div className="flex flex-wrap px-2 py-1">
            <span className="text-[12px] px-3 font-bold text-white border-r border-[#b8730f] cursor-pointer hover:underline">
              ข้อมูลกิจกรรม
            </span>
            <span className="text-[12px] px-3 font-bold text-white border-r border-[#b8730f] cursor-pointer hover:underline">
              ข้อความล่าสุด
            </span>
            <span className="text-[12px] px-3 font-bold text-white border-r border-[#b8730f] cursor-pointer hover:underline">
              Moment กับรุ่นพี่
            </span>
            <span className="text-[12px] px-3 font-bold text-white cursor-pointer hover:underline">
              Good Journey Wishes
            </span>
          </div> */}
        </nav>

        {/* ============ MAIN CONTENT ============ */}
        <main className="flex-1 w-full p-3">
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-[220px] shrink-0 order-1 lg:order-1">
              <Sidebar />
            </aside>

            {/* Center: Message Board */}
            <section className="flex-1 min-w-0 order-3 lg:order-2">
              <div className="portal-section mb-3">
                <div className="portal-section-header text-base">
                  กระดานข้อความถึงรุ่นพี่
                </div>
                <div className="orange-bar" />
              </div>
              <MessageBoard />

              {/* Activity Log below message board */}
              {/* <div className="mt-3">
                <ActivityLogTable />
              </div> */}
            </section>

            {/* Right Panel */}
            <aside className="contents lg:flex lg:w-[300px] lg:shrink-0 lg:flex-col lg:gap-3 lg:order-3">
              <div className="order-2 lg:order-none w-full">
                <IGAddYours />
              </div>
              <div className="order-4 lg:order-none w-full">
                <WishButton />
              </div>
            </aside>
          </div>
        </main>

        {/* ============ FOOTER ============ */}
        <footer className="mt-auto">
          <div className="orange-bar" />
          <div className="bg-[#3a0a0a] text-[#b5b3ac] px-6 py-3 text-xs">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="space-y-0.5">
                <div>
                  พัฒนาโดย{" "}
                  <span className="text-[#d4b05c] font-bold">
                    KMUTT IT Student Team
                  </span>
                </div>
                <div>สำหรับใช้งานภายในงาน Bye Bye Party 2024</div>
              </div>
              <div className="text-right text-[10px] space-y-0.5">
                <div>Best viewed on event Wi-Fi</div>
                <div>Version 1.0 | Last updated: Today</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
