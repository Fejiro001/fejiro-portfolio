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
      {/* Desktop only */}
      <div className="hidden lg:flex fixed left-2 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6">
        <div className="w-px h-16 bg-border" />
        <span className="noise-text">Winnipeg · CA</span>
        <div className="w-px h-16 bg-border" />
      </div>
      <div className="hidden lg:flex fixed right-2 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6">
        <div className="w-px h-16 bg-border" />
        <span className="noise-text">{time} CT</span>
        <div className="w-px h-16 bg-border" />
      </div>
    </>
  );
}
