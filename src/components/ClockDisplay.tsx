import { useState, useEffect } from "react";

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="text-center select-none">
      <div className="font-mono text-6xl font-bold text-foreground text-glow-primary tracking-widest">
        {formatTime(time)}
      </div>
      <div className="mt-2 text-sm text-muted-foreground font-mono tracking-wide uppercase">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default ClockDisplay;
