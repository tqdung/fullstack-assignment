const { Op } = require('sequelize');
const models = require('../models');


class EmployeeController {
    constructor() { }

    async getList(cafe_name) {
        try {
            const whereClause = {};
            if (cafe_name) {
                whereClause[Op.or] = [
                    { '$Cafe.name$': { [Op.like]: `%${cafe_name}%` } }
                ]
            }

            const list = await models.Employee.findAll({
                attributes: [
                    'id',
                    'name',
                    'email_address',
                    'phone_number',
                    [models.Sequelize.literal('IF(Employee.cafe_id = NULL, 0, DATEDIFF(now(), Employee.updated_at))'), 'days_worked'],
                    [models.Sequelize.literal('Cafe.name'), 'cafe'],
                ],
                include: [{
                    model: models.Cafe,
                    attributes: [],
                }],
                raw: true,
                nest: true,
                where: whereClause,
                order: [
                    [models.Sequelize.literal('days_worked DESC')]
                ]
            });
            return list;
        } catch (error) {
            return error;
        }
    }

    async getEmployeeAtCafe(cafe_name) {
        try {
            if (!cafe_name) {
                return this.getAllEmployee();
            }
            const cafe = await models.Cafe.findOne({ where: { name: { [Op.like]: `${cafe_name}%` } } });
            if (!cafe) {
                return Promise.resolve([]);
            }
            return await models.Employee.findAll({ where: { cafe_id: cafe.id } })
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @param {{
     *  name: string;
     *  email_address: string;
     *  phone_number: string;
     *  gender: number
     *  cafe_id: string
    * }} params
    * @returns {Promise<[employee, existed]>}
    */
    async createNewEmployee(params) {
        try {
            const { name, email_address, phone_number, gender, cafe_id } = params;
            const existed = await models.Employee.findOne({ where: { email_address } });
            if (existed) {
                return Promise.resolve([existed, true]);
            }
            const newEmployee = await models.Employee.create({ name, email_address, phone_number, gender, cafe_id });
            return Promise.resolve([newEmployee, false]);
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @param {{
     *  id: string;
     *  name: string;
     *  email_address: string;
     *  phone_number: string;
     *  gender: number;
     *  cafe_id: number;
     * }} params 
     * @returns 
     */
    async updateExistingEmployee(params) {
        try {
            const { id, name, email_address, phone_number, gender, cafe_id } = params;
            return await models.Employee.update(
                { name, email_address, phone_number, gender, cafe_id },
                { where: { id } }
            );
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @param {string} employee_id 
     * @returns 
     */
    async removeExistingEmployee(employee_id) {
        try {
            return models.Employee.destroy({
                where: { id: employee_id },
                truncate: true
            })
        } catch (error) {
            return error;
        }
    }
}

module.exports = { EmployeeController };