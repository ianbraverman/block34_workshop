const prisma = require("../prisma/index.js");
const router = require("express").Router();
module.exports = router;

router.get("/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch {
    next({});
  }
});
