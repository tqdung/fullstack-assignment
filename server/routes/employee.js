const express = require('express');
const router = express.Router();

const { EmployeeController } = require('../controllers/employeeController');
const controller = new EmployeeController();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const cafe = req.query.cafe;
        const data = await controller.getList(cafe);
        return res.status(200).json({
            message: "Success",
            data: data
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async function (req, res, next) {
    try {
        const { name, email_address, phone_number, gender, cafe_id } = req.body;
        const [employee, existed] = await controller.createNewEmployee({ name, email_address, phone_number, gender, cafe_id });

        if (existed) {
            return res.status(200).json({
                message: "Employee existed",
                data: null,
            })
        }
        return res.status(200).json({
            message: "Success",
            data: employee
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const { name, email_address, phone_number, gender, cafe_id } = req.body;
        await controller.updateExistingEmployee({ id: req.params.id, name, email_address, phone_number, gender, cafe_id });

        return res.status(200).json({
            message: "Success",
            data: null
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await controller.removeExistingEmployee(req.params.id);
        return res.status(200).json({
            message: "Success",
            data: null
        })
    } catch (error) {
        return res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;
