import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../src/lib/db'

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const attendance = await prisma.attendance.findMany({
      where: {
        timestamp: {
          gte: today
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    })
    
    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, employeeName, type } = await request.json()
    
    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        employeeName,
        type,
        timestamp: new Date(),
      }
    })
    
    return NextResponse.json(attendance)
  } catch (error) {
    console.error('Error creating attendance record:', error)
    return NextResponse.json({ error: 'Failed to create attendance record' }, { status: 500 })
  }
}
