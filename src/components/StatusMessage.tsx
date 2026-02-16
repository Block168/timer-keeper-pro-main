import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface StatusMessageProps {
  message: string;
  type: "success" | "error" | "info" | "idle";
}

const StatusMessage = ({ message, type }: StatusMessageProps) => {
  if (type === "idle") return null;

  const config = {
    success: { icon: CheckCircle2, class: "text-success border-success/30 bg-success/5" },
    error: { icon: XCircle, class: "text-destructive border-destructive/30 bg-destructive/5" },
    info: { icon: AlertCircle, class: "text-primary border-primary/30 bg-primary/5" },
  };

  const { icon: Icon, class: cls } = config[type];

  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-mono ${cls} transition-all duration-300`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default StatusMessage;
