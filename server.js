const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/customers", require("./api/customers.js"));
app.use("/api/reservations", require("./api/reservations.js"));
app.use("/api/restaurants", require("./api/restaurants.js"));

app.use((err, req, res, next) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "Internal server error";
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
