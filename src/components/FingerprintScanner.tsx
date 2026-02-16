import { useState } from "react";
import { Fingerprint } from "lucide-react";

interface FingerprintScannerProps {
  onScan: () => void;
  status: "idle" | "scanning" | "success" | "error";
}

const FingerprintScanner = ({ onScan, status }: FingerprintScannerProps) => {
  const [pressing, setPressing] = useState(false);

  const statusColors = {
    idle: "text-muted-foreground border-muted-foreground/30",
    scanning: "text-primary border-primary animate-pulse-ring glow-primary",
    success: "text-success border-success glow-success",
    error: "text-destructive border-destructive",
  };

  const statusLabels = {
    idle: "PLACE FINGER TO SCAN",
    scanning: "SCANNING...",
    success: "FINGERPRINT VERIFIED",
    error: "NOT RECOGNIZED",
  };

  const handlePress = () => {
    if (status === "scanning") return;
    setPressing(true);
    onScan();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onMouseDown={handlePress}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
        onTouchStart={handlePress}
        onTouchEnd={() => setPressing(false)}
        disabled={status === "scanning"}
        className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center
          transition-all duration-300 cursor-pointer select-none
          ${statusColors[status]}
          ${pressing ? "scale-95" : "hover:scale-105"}
          disabled:cursor-wait`}
      >
        {/* Scan line effect */}
        {status === "scanning" && (
          <div className="absolute inset-4 overflow-hidden rounded-full">
            <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan-line" />
          </div>
        )}
        <Fingerprint className="w-12 h-12" />
      </button>
      <p className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
        status === "success" ? "text-success text-glow-success" :
        status === "error" ? "text-destructive" :
        "text-muted-foreground"
      }`}>
        {statusLabels[status]}
      </p>
    </div>
  );
};

export default FingerprintScanner;
