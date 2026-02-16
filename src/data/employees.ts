export interface Employee {
  id: string;
  name: string;
  passKey: string;
  department: string;
}

export const employees: Employee[] = [
  { id: "EMP001", name: "Ahmed Benali", passKey: "1234", department: "Engineering" },
  { id: "EMP002", name: "Sara Mansouri", passKey: "5678", department: "Marketing" },
  { id: "EMP003", name: "Karim Zidane", passKey: "4321", department: "Finance" },
  { id: "EMP004", name: "Nadia Boukhris", passKey: "8765", department: "HR" },
  { id: "EMP005", name: "Youssef Khelifi", passKey: "1111", department: "Operations" },
];
