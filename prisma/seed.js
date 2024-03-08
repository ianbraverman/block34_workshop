const prisma = require("../prisma/index.js");

const seed = async (number = 20) => {
  for (let i = 1; i < number; i++) {
    await prisma.customer.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Person ${i}`,
      },
    });
    await prisma.restaurant.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Restaurant ${i}`,
      },
    });
    await prisma.reservations.upsert({
      where: { id: i },
      update: {},
      create: {
        party_count: Math.floor(Math.random() * 5),
        customerId: i,
        restaurantId: i,
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
