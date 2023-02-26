'use strict';
const { v4 } = require('uuid');

const cafes = [
  {
    name: "Coffee House",
    description: "A cozy cafe with a variety of coffee options",
    location: "123 Main Street",
    logo: "https://example.com/coffee-house-logo.png"
  },
  {
    name: "Java Junction",
    description: "A local favorite for espresso drinks and pastries",
    location: "456 Oak Avenue",
    logo: "https://example.com/java-junction-logo.png"
  },
  {
    name: "Brewed Awakening",
    description: "A rustic cafe with outdoor seating and homemade pastries",
    location: "789 Elm Street",
    logo: null
  },
  {
    name: "The Daily Grind",
    description: "A popular cafe with a laid-back atmosphere and free WiFi",
    location: "321 Maple Road",
    logo: "https://example.com/daily-grind-logo.png"
  },
  {
    name: "Cafe Latte",
    description: "A charming little cafe with a wide selection of lattes and teas",
    location: "567 Pine Street",
    logo: null
  },
  {

    name: "Perks & Beans",
    description: "A cozy cafe that specializes in artisanal coffee and homemade baked goods",
    location: "890 Oak Lane",
    logo: "https://example.com/perks-and-beans-logo.png"
  },
  {
    name: "Cuppa Joe's",
    description: "A casual coffeehouse with a funky vibe and live music",
    location: "432 Elm Street",
    logo: null
  },
  {
    name: "The Roasted Bean",
    description: "A trendy cafe that roasts their own beans and serves a mean cappuccino",
    location: "765 Main Street",
    logo: "https://example.com/roasted-bean-logo.png"
  },
  {
    name: "Java Express",
    description: "A fast-paced cafe with drive-through service and a loyalty program",
    location: "234 Maple Road",
    logo: null
  },
  {
    name: "Cafe Mocha",
    description: "A cozy spot for a rich and creamy mocha, with free WiFi and board games",
    location: "901 Pine Street",
    logo: "https://example.com/cafe-mocha-logo.png"
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seeds = cafes.map(item => ({
      ...item,
      id: v4(),
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()'),
    }));

    await queryInterface.bulkInsert('Cafe', seeds);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Cafe', null, {});
  }
};
