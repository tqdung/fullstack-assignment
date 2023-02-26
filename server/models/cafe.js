'use strict';
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
const { v4 } = require('uuid');

/**
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class Cafe extends Model {
    static associate(models) {
      Cafe.hasMany(models.Employee, { foreignKey: 'cafe_id', onDelete: 'CASCADE' }); // A cafe can have many employees
    }
  }
  Cafe.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: v4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cafe',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Cafe;
};