const prisma = require("../prisma/index.js");
const router = require("express").Router();
module.exports = router;

router.get("/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservations.findMany();
    res.json(reservations);
  } catch {
    next({});
  }
});

router.post("/customers/:customerId/reservations", async (req, res, next) => {
  try {
    const { party_count, restaurantId } = req.body;
    const { customerId } = req.params;
    const newReservation = await prisma.reservations.create({
      data: {
        party_count: +party_count,
        customerId: +customerId,
        restaurantId: +restaurantId,
      },
    });
    res.status(201).json(newReservation);
  } catch (e) {
    console.error(e);
    next({});
  }
});

router.delete(
  "/customers/:customerId/reservations/:id",
  async (req, res, next) => {
    try {
      const { customerId, id } = req.params;
      const deletedReservation = await prisma.reservations.delete({
        where: {
          customerId: +customerId,
          id: +id,
        },
      });
      res.status(204).json(deletedReservation);
    } catch (e) {
      console.error(e);
      next({});
    }
  }
);
