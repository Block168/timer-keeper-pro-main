import { prisma } from '../lib/db'

const employees = [
  { employeeId: "EMP001", name: "Ahmed Benali", passKey: "1234", department: "Engineering" },
  { employeeId: "EMP002", name: "Sara Mansouri", passKey: "5678", department: "Marketing" },
  { employeeId: "EMP003", name: "Karim Zidane", passKey: "4321", department: "Finance" },
  { employeeId: "EMP004", name: "Nadia Boukhris", passKey: "8765", department: "HR" },
  { employeeId: "EMP005", name: "Youssef Khelifi", passKey: "1111", department: "Operations" },
]

async function seed() {
  console.log('Seeding database...')
  
  for (const employee of employees) {
    await prisma.employee.upsert({
      where: { employeeId: employee.employeeId },
      update: employee,
      create: employee,
    })
  }
  
  console.log('Database seeded successfully!')
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
