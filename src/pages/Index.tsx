import { useState, useCallback, useEffect } from "react";
import ClockDisplay from "@/components/ClockDisplay";
import Keypad from "@/components/Keypad";
import FingerprintScanner from "@/components/FingerprintScanner";
import AttendanceLog, { AttendanceEntry } from "@/components/AttendanceLog";
import StatusMessage from "@/components/StatusMessage";
import { api, Employee } from "@/lib/api";
import { Shield, Users } from "lucide-react";

type ScanStatus = "idle" | "scanning" | "success" | "error";
type MessageType = "success" | "error" | "info" | "idle";

const Index = () => {
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [authenticatedEmployee, setAuthenticatedEmployee] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "idle" as MessageType });
  const [loading, setLoading] = useState(true);

  // Load employees and attendance data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [employeesData, attendanceData] = await Promise.all([
          api.getEmployees(),
          api.getAttendance()
        ]);
        setEmployees(employeesData);
        setEntries(attendanceData);
      } catch (error) {
        console.error('Error loading data:', error);
        showMessage('Failed to load data. Using fallback data.', 'error');
        // Fallback to local data if API fails
        setEmployees([
          { employeeId: "EMP001", name: "Ahmed Benali", passKey: "1234", department: "Engineering" },
          { employeeId: "EMP002", name: "Sara Mansouri", passKey: "5678", department: "Marketing" },
          { employeeId: "EMP003", name: "Karim Zidane", passKey: "4321", department: "Finance" },
          { employeeId: "EMP004", name: "Nadia Boukhris", passKey: "8765", department: "HR" },
          { employeeId: "EMP005", name: "Youssef Khelifi", passKey: "1111", department: "Operations" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const showMessage = (message: string, type: MessageType, duration = 3000) => {
    setStatusMessage({ message, type });
    if (type !== "idle") setTimeout(() => setStatusMessage({ message: "", type: "idle" }), duration);
  };

  const handlePassKeySubmit = useCallback((code: string) => {
    const employee = employees.find((e) => e.employeeId === code || e.passKey === code);
    if (employee) {
      setAuthenticatedEmployee(employee.employeeId);
      showMessage(`Welcome, ${employee.name}. Please scan fingerprint.`, "info");
    } else {
      showMessage("Invalid pass key. Try again.", "error");
    }
  }, [employees]);

  const handleFingerprintScan = useCallback(() => {
    if (!authenticatedEmployee) {
      showMessage("Enter your pass key first.", "error");
      return;
    }

    setScanStatus("scanning");

    // Simulate fingerprint scan
    setTimeout(async () => {
      const employee = employees.find((e) => e.employeeId === authenticatedEmployee);
      if (!employee) return;

      // Simulate 90% success rate
      const success = Math.random() > 0.1;

      if (success) {
        setScanStatus("success");

        // Determine if clocking in or out
        const lastEntry = [...entries].reverse().find((e) => e.employeeId === employee.employeeId);
        const type = !lastEntry || lastEntry.type === "out" ? "in" : "out";

        try {
          // Save to database
          const newEntry = await api.createAttendance({
            employeeId: employee.employeeId,
            employeeName: employee.name,
            type,
          });

          setEntries((prev) => [newEntry, ...prev]);
          showMessage(
            `${employee.name} clocked ${type === "in" ? "IN" : "OUT"} at ${new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}`,
            "success"
          );
        } catch (error) {
          console.error('Error saving attendance:', error);
          showMessage('Failed to save attendance record', 'error');
        }

        setTimeout(() => {
          setScanStatus("idle");
          setAuthenticatedEmployee(null);
        }, 2000);
      } else {
        setScanStatus("error");
        showMessage("Fingerprint not recognized. Try again.", "error");
        setTimeout(() => setScanStatus("idle"), 2000);
      }
    }, 1500);
  }, [authenticatedEmployee, entries, employees]);

  const emp = authenticatedEmployee ? employees.find((e) => e.employeeId === authenticatedEmployee) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/espro-logo.svg" 
            alt="ESPRO Junior Entreprise Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">PointGuard</h1>
            <p className="text-xs text-muted-foreground font-mono">ATTENDANCE TERMINAL</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-xs font-mono">{employees.length} EMPLOYEES</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Terminal */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
          <ClockDisplay />

          {/* Status */}
          <div className="w-full max-w-sm">
            <StatusMessage message={statusMessage.message} type={statusMessage.type} />
          </div>

          {/* Authenticated employee badge */}
          {emp && (
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-mono text-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {emp.name} — {emp.department}
            </div>
          )}

          {/* Auth controls */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div>
              <Keypad onSubmit={handlePassKeySubmit} disabled={scanStatus === "scanning"} />
            </div>
            <div className="hidden sm:block w-px h-48 bg-border" />
            <div className="block sm:hidden h-px w-48 bg-border" />
            <div>
              <FingerprintScanner onScan={handleFingerprintScan} status={scanStatus} />
            </div>
          </div>
        </div>

        {/* Right: Log */}
        <aside className="lg:w-96 border-t lg:border-t-0 lg:border-l border-border p-6 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground tracking-tight uppercase">Today's Log</h2>
            <span className="text-xs font-mono text-muted-foreground">{entries.length} RECORDS</span>
          </div>
          <AttendanceLog entries={entries} />
        </aside>
      </main>
    </div>
  );
};

export default Index;
