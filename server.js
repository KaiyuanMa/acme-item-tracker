const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("sequelize");
const { User, Thing } = require("./db/index");

app.use("/dist", express.static("dist"));
app.use("/public", express.static("assets"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//User Routes

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        order: [
          ["updatedAt", "DESC"],
          ["id", "ASC"],
        ],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:userId", async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.userId));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:userId/things", async (req, res, next) => {
  try {
    res.send(
      await Thing.findAll({
        where: {
          userId: req.params.userId,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/users/:userId/things/:thingId", async (req, res, next) => {
  try {
    await Thing.update({ userId: null }, { where: { id: req.params.thingId } });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/users/:userId", async (req, res, next) => {
  try {
    await User.update(req.body, { where: { id: req.params.userId } });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

//Thing Routes

app.get("/api/things", async (req, res, next) => {
  try {
    res.send(
      await Thing.findAll({
        order: [
          ["createdAt", "DESC"],
          ["id", "ASC"],
        ],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/things/unowned", async (req, res, next) => {
  try {
    res.send(
      await Thing.findAll({
        where: {
          userId: null,
        },
        order: [
          ["createdAt", "DESC"],
          ["id", "ASC"],
        ],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/things/:thingId/users", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.thingId);
    res.send(await User.findAll({ where: { id: thing.userId } }));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/things/top", async (req, res, next) => {
  try {
    User.finAll({
      attributes: [
        "Thing.name",
        [
          sequelize.literal(
            "(Select Count(*) From Thing Where Thing.userId = User.id)"
          ),
          "count",
        ],
      ],
      order: [[sequelize.literal("count"), "DESC"]],
      limit: [10],
    });
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/things/:thingId", async (req, res, next) => {
  try {
    const thing = await Thing.findByPk(req.params.thingId);
    await thing.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/things", async (req, res, next) => {
  try {
    res.status(201).send(await Thing.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/things/:thingId", async (req, res, next) => {
  try {
    await Thing.update(req.body, { where: { id: req.params.thingId } });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
