const express = require('express');
const router = express.Router();

const { CafeController } = require('../controllers/cafeController');

const controller = new CafeController();

/* GET cafe listing. */
router.get('/', async function (req, res, next) {
    try {
        const location = req.query.location;
        const data = await controller.getList(location);
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
        const { name, logo, description, location } = req.body;
        const [cafe, created] = await controller.createNewCafe({ name, logo, description, location });
        if (!created) {
            return res.status(200).json({
                message: "Cafe existed",
                data: null,
            })
        }
        return res.status(200).json({
            message: "Success",
            data: cafe
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.put('/:id', async function (req, res, next) {
    try {
        const { name, logo, description, location } = req.body;
        await controller.updateExistingCafe({ id: req.params.id, name, logo, description, location });
        return res.status(200).json({
            message: "Success",
            data: null
        })
    } catch (error) {
        return res.status(500).json({ message: "Update failed" });
    }
});


router.delete('/:id', async function (req, res, next) {
    try {
        await controller.removeExistingCafe(req.params.id);
        return res.status(200).json({
            message: "Success",
            data: null
        })
    } catch (error) {
        return res.status(500).json({ message: "Dete failed" });
    }
});

module.exports = router;
