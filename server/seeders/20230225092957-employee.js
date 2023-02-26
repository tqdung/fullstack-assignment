'use strict';

const employees = [
  {
    name: 'Sarah Johnson',
    email_address: 'sarah.johnson@example.com',
    phone_number: '555-123-4567',
    gender: 'Female'
  },
  {
    name: 'Alex Lee',
    email_address: 'alex.lee@example.com',
    phone_number: '555-234-5678',
    gender: 'Male'
  },
  {
    name: 'Emily Davis',
    email_address: 'emily.davis@example.com',
    phone_number: '555-345-6789',
    gender: 'Female'
  },
  {
    name: 'John Smith',
    email_address: 'john.smith@example.com',
    phone_number: '555-456-7890',
    gender: 'Male'
  },
  {
    name: 'Samantha Kim',
    email_address: 'samantha.kim@example.com',
    phone_number: '555-567-8901',
    gender: 'Female'
  },
  {
    name: 'Michael Brown',
    email_address: 'michael.brown@example.com',
    phone_number: '555-678-9012',
    gender: 'Male'
  },
  {
    name: 'Jessica Lee',
    email_address: 'jessica.lee@example.com',
    phone_number: '555-789-0123',
    gender: 'Female'
  },
  {
    name: 'David Jones',
    email_address: 'david.jones@example.com',
    phone_number: '555-890-1234',
    gender: 'Male'
  },
  {
    name: 'Ava Davis',
    email_address: 'ava.davis@example.com',
    phone_number: '555-901-2345',
    gender: 'Female'
  },
  {
    name: 'William Johnson',
    email_address: 'william.johnson@example.com',
    phone_number: '555-012-3456',
    gender: 'Male'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seeds = employees.map((item, index) => ({
      ...item,
      id: "UI" + `000000${index + 1}`.slice(-7),
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()'),
    }));
    await queryInterface.bulkInsert('Employee', seeds);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Employee', null, {});
  }
};
