const { faker } = require("@faker-js/faker");

const USERS = [];
const THINGS = [];

function createRandomUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    description: faker.lorem.paragraphs(1),
  };
}

function createRandomThing() {
  return {
    name: `${faker.random.words(1)}`,
    userId:
      Math.ceil(Math.random() * 101) - 1 == 0
        ? null
        : Math.ceil(Math.random() * 101) - 1,
    description: faker.lorem.paragraphs(1),
  };
}

Array.from({ length: 100 }).forEach(() => USERS.push(createRandomUser()));
Array.from({ length: 200 }).forEach(() => THINGS.push(createRandomThing()));

module.exports = { USERS, THINGS };
