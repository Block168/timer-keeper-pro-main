const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://time-keeper-pro-tau.vercel.app/api' 
  : '/api'

export interface Employee {
  employeeId: string
  name: string
  passKey: string
  department: string
}

export interface AttendanceEntry {
  id: string
  employeeId: string
  employeeName: string
  type: 'in' | 'out'
  timestamp: Date
}

export const api = {
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`)
    if (!response.ok) throw new Error('Failed to fetch employees')
    return response.json()
  },

  async createAttendance(data: {
    employeeId: string
    employeeName: string
    type: 'in' | 'out'
  }): Promise<AttendanceEntry> {
    const response = await fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create attendance record')
    return response.json()
  },

  async getAttendance(): Promise<AttendanceEntry[]> {
    const response = await fetch(`${API_BASE_URL}/attendance`)
    if (!response.ok) throw new Error('Failed to fetch attendance')
    return response.json()
  }
}
