"use client";

import { useState, useEffect, useCallback } from "react";
import { PARTICLE_EMOJIS } from "@/app/lib/types";

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

interface WishButtonProps {
  onWishSent?: () => void;
}

export default function WishButton({ onWishSent }: WishButtonProps) {
  const [totalWishes, setTotalWishes] = useState<number | null>(null);
  const [wishMessage, setWishMessage] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);

  // Fetch initial count
  useEffect(() => {
    fetch("/api/wishes")
      .then((res) => res.json())
      .then((data) => setTotalWishes(data.totalWishes))
      .catch(() => {});
  }, []);

  const spawnParticles = useCallback(
    (clientX: number, clientY: number) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 8; i++) {
        const emoji =
          PARTICLE_EMOJIS[
            Math.floor(Math.random() * PARTICLE_EMOJIS.length)
          ];
        newParticles.push({
          id: particleCounter + i,
          emoji,
          x: clientX + (Math.random() - 0.5) * 120,
          y: clientY + (Math.random() - 0.5) * 60,
        });
      }
      setParticleCounter((c) => c + 8);
      setParticles((prev) => [...prev, ...newParticles]);

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 2200);
    },
    [particleCounter]
  );

  const handleWish = async (e: React.MouseEvent) => {
    if (isClicking) return;
    setIsClicking(true);

    spawnParticles(e.clientX, e.clientY);

    try {
      const res = await fetch("/api/wishes", { method: "POST" });
      const data = await res.json();
      setTotalWishes(data.totalWishes);
      setWishMessage(data.wishMessage);
      onWishSent?.();
    } catch {
      console.error("Failed to send wish");
    } finally {
      setTimeout(() => setIsClicking(false), 500);
    }
  };

  return (
    <div className="portal-section">
      <div className="portal-section-header">ส่งคำอวยพร Good Journey</div>
      <div className="orange-bar-thin" />
      <div className="p-4 flex flex-col items-center gap-3 text-center">
        <div className="text-sm text-[#5c3a24] leading-relaxed">
          กดปุ่มนี้เพื่อส่งพลังใจให้รุ่นพี่
          <br />
          เริ่มต้นการเดินทางครั้งใหม่
        </div>

        <button
          onClick={handleWish}
          disabled={isClicking}
          className="btn-orange wish-button-pulse text-base px-8 py-3 rounded-sm disabled:opacity-70 cursor-pointer select-none"
          id="wish-button"
        >
          🎓 Wish Them a Good Journey
        </button>

        {wishMessage && (
          <div className="wish-reveal border border-[#d4b05c] bg-[#fff9ed] rounded-sm px-4 py-2.5 text-sm text-[#5c3a24] max-w-[280px] italic">
            &ldquo;{wishMessage}&rdquo;
          </div>
        )}

        <div className="portal-section w-full mt-1">
          <div className="bg-gradient-to-r from-[#e5e2da] to-[#d0cec8] px-3 py-1.5 text-xs font-bold text-[#3a0a0a] border-b border-[#b5b3ac]">
            จำนวนคำอวยพรทั้งหมด
          </div>
          <div className="px-3 py-2 text-center">
            <span className="text-3xl font-bold text-[#8b2525] counter-tick" key={totalWishes}>
              {totalWishes !== null
                ? String(totalWishes).padStart(3, "0")
                : "---"}
            </span>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{ left: p.x, top: p.y }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
