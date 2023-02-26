'use strict';
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
const uuid = require('uuid');

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Cafe, {
        targetKey: 'id',
        foreignKey: 'cafe_id',
        allowNull: true,
        references: {
          model: 'Cafe',
          key: 'id'
        }
      });
    }
    static generateId = async () => {
      const lastEmployee = await this.findOne({
        order: [['id', 'DESC']],
      });

      if (!lastEmployee) {
        return 'UI0000001';
      }

      const id = parseInt(lastEmployee.id.substring(2)) + 1;
      return 'UI' + `000000${id}`.slice(-7);
    };

  }
  Employee.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['Male', 'Female'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Employee.addHook('beforeCreate', async (employee) => {
    const id = await Employee.generateId();
    employee.id = id;
  })
  return Employee;
};