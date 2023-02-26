const { Op } = require('sequelize');
const models = require('../models');


class CafeController {
    constructor() { }
    /**
     * 
     * @param {string} location 
     */
    async getList(location) {
        try {
            const where = location ? { location: { [Op.like]: `%${location}%` } } : {};
            return await models.Cafe.findAll({
                where: where,
                attributes: {
                    include: [
                        [models.sequelize.fn('COUNT', models.sequelize.col('Employees.id')), 'employees']
                    ]
                },
                include: [{
                    model: models.Employee,
                    attributes: []
                }],
                group: ['Cafe.id']
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @param {{
     *  name: string;
     *  description: string;
     *  location: string;
     *  logo: string;
     * }} params
     */
    async createNewCafe(params) {
        try {
            const { name, description, location, logo = null } = params;
            return await models.Cafe.findOrCreate({
                where: { name, logo, description, location },
                defaults: { logo: "" }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 
     * @param {{
    *  id: string;
    *  name: string;
    *  description: string;
    *  location: string;
    *  logo: string;
    * }} params
    */
    async updateExistingCafe(params) {
        try {
            const { id, name, description, location, logo } = params;
            return await models.Cafe.update(
                { name, description, location, logo },
                { where: { id } }
            );
        } catch (error) {
            return error;
        }
    }

    /**
     * 
     * @param {string} cafe_id
     */
    async removeExistingCafe(cafe_id) {
        try {
            return await models.Cafe.destroy({
                where: { id: cafe_id }
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = { CafeController };