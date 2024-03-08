const prisma = require("../prisma/index.js");
const router = require("express").Router();
module.exports = router;

router.get("/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch {
    next({});
  }
});
