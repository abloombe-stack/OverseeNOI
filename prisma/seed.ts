import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create or find company
  const company = await prisma.company.upsert({
    where: { name: "Premium Asset Management" },
    update: {},
    create: { name: "Premium Asset Management" }
  });

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      email: "sarah@example.com",
      displayName: "Sarah Johnson",
      role: "asset_manager",
      companyId: company.id
    }
  });

  // Create demo property
  const prop = await prisma.property.upsert({
    where: { id: "demo-property" },
    update: {},
    create: {
      id: "demo-property",
      companyId: company.id,
      name: "Sunset Gardens",
      address: "123 Main St, Austin, TX",
      unitCount: 245
    }
  });

  // Create channels
  const chLeasing = await prisma.channel.upsert({
    where: { id: "ch-leasing" },
    update: {},
    create: { 
      id: "ch-leasing",
      propertyId: prop.id, 
      key: "leasing", 
      name: "Leasing" 
    }
  });
  
  const chMaint = await prisma.channel.upsert({
    where: { id: "ch-maintenance" },
    update: {},
    create: { 
      id: "ch-maintenance",
      propertyId: prop.id, 
      key: "maintenance", 
      name: "Maintenance" 
    }
  });
  
  const chAR = await prisma.channel.upsert({
    where: { id: "ch-ar" },
    update: {},
    create: { 
      id: "ch-ar",
      propertyId: prop.id, 
      key: "ar", 
      name: "AR & Collections" 
    }
  });

  // Create demo task
  await prisma.task.upsert({
    where: { id: "demo-task" },
    update: {},
    create: {
      id: "demo-task",
      channelId: chAR.id,
      title: "Review rent roll anomalies",
      description: "Units showing unusual balance changes",
      priority: "HIGH",
      status: "OPEN",
      createdById: user.id,
      assigneeId: user.id,
      tags: ["anomaly"]
    }
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });