var pgtools = require("pgtools");
const config = {
  user: process.env.USER || "postgress",
  host: process.env.HOST || "localhost",
  password: process.env.PASSWORD || "",
  port: process.env.PORT || 5432,
};

const { conn, User, Thing } = require("./db");
const { USERS, THINGS } = require("./seed-data");

(async function seedDatabase() {
  try {
    await pgtools.dropdb(config, "the-acme-item-tracker", function (err, res) {
      if (err) {
        console.log("Something went wrong");
      }
    });
    await pgtools.createdb(
      config,
      "the-acme-item-tracker",
      function (err, res) {
        if (err) {
          console.log(err);
        }
        if (res) {
          console.log("db created");
        }
      }
    );

    await conn.sync({ force: true });
    await Promise.all(USERS.map((user) => User.create(user)));
    await Promise.all(THINGS.map((thing) => Thing.create(thing)));
  } catch (e) {
    console.log(e);
  }
})();
