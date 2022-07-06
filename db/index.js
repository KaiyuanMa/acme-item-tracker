const Sequelize = require("sequelize");
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/the-acme-item-tracker"
);

const { STRING, TEXT } = Sequelize;

const User = conn.define("user", {
  name: {
    type: STRING,
  },
  description: {
    type: TEXT,
  },
});

const Thing = conn.define("thing", {
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
  },
});

User.hasMany(Thing);

module.exports = {
  conn,
  User,
  Thing,
};
