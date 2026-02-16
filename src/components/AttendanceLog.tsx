import { LogIn, LogOut } from "lucide-react";

export interface AttendanceEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "in" | "out";
  timestamp: Date;
}

interface AttendanceLogProps {
  entries: AttendanceEntry[];
}

const AttendanceLog = ({ entries }: AttendanceLogProps) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm font-mono">
        NO RECORDS TODAY
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 border border-border/50"
        >
          <div className={`p-1.5 rounded-full ${
            entry.type === "in" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
          }`}>
            {entry.type === "in" ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{entry.employeeName}</p>
            <p className="text-xs text-muted-foreground font-mono">ID: {entry.employeeId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-foreground">
              {entry.timestamp.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className={`text-xs font-mono font-semibold ${
              entry.type === "in" ? "text-success" : "text-warning"
            }`}>
              {entry.type === "in" ? "CLOCK IN" : "CLOCK OUT"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceLog;
