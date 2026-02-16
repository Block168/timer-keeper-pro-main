import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../src/lib/db'

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        employeeId: true,
        name: true,
        passKey: true,
        department: true,
      }
    })
    
    return NextResponse.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, name, passKey, department } = await request.json()
    
    const employee = await prisma.employee.create({
      data: {
        employeeId,
        name,
        passKey,
        department,
      }
    })
    
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}
