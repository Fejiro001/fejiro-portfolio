import { useEffect, useState } from "react";

export default function NoiseOverlay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const opts = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Winnipeg"
      };
      setTime(now.toLocaleTimeString("en-CA", opts));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      {/* Peripheral gutter meta — desktop only */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6">
        <span className="vertical-text font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Winnipeg · CA
        </span>
        <div className="w-px h-16 bg-border" />
      </div>
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6">
        <div className="w-px h-16 bg-border" />
        <span className="vertical-text font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {time} CT
        </span>
      </div>
    </>
  );
}
