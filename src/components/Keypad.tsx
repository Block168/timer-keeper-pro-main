import { useState } from "react";
import { Delete } from "lucide-react";

interface KeypadProps {
  onSubmit: (code: string) => void;
  disabled?: boolean;
}

const Keypad = ({ onSubmit, disabled }: KeypadProps) => {
  const [code, setCode] = useState("");

  const handleKey = (key: string) => {
    if (disabled) return;
    if (code.length < 6) setCode((prev) => prev + key);
  };

  const handleDelete = () => {
    if (disabled) return;
    setCode((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (code.length >= 4 && !disabled) {
      onSubmit(code);
      setCode("");
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="space-y-4">
      {/* Code display */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
              i < code.length
                ? "bg-primary border-primary glow-primary"
                : "border-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground font-mono">ENTER PASS KEY</p>

      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            disabled={disabled}
            className="h-14 rounded-lg bg-secondary text-secondary-foreground font-mono text-xl font-semibold
              hover:bg-primary hover:text-primary-foreground active:scale-95
              transition-all duration-150 disabled:opacity-30"
          >
            {key}
          </button>
        ))}
        <button
          onClick={handleDelete}
          disabled={disabled}
          className="h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center
            hover:bg-destructive hover:text-destructive-foreground active:scale-95
            transition-all duration-150 disabled:opacity-30"
        >
          <Delete className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleKey("0")}
          disabled={disabled}
          className="h-14 rounded-lg bg-secondary text-secondary-foreground font-mono text-xl font-semibold
            hover:bg-primary hover:text-primary-foreground active:scale-95
            transition-all duration-150 disabled:opacity-30"
        >
          0
        </button>
        <button
          onClick={handleSubmit}
          disabled={disabled || code.length < 4}
          className="h-14 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-bold
            hover:opacity-90 active:scale-95 glow-primary
            transition-all duration-150 disabled:opacity-30 disabled:shadow-none"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Keypad;
