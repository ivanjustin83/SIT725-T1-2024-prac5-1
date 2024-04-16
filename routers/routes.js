const express = require('express');
const router = express.Router();
const formController = require('../controllers/FormController');

router.post('/postcards', (req, res) => {
    formController.submitNewCat(req, res)
        .catch((error) => {
            console.error('Error submitting new cat:', error);
            res.send('Error submitting new cat');
        });
});

router.get('/cards', (req, res) => {
    formController.getCat(req, res)
        .catch((error) => {
            console.error('Error getting cats:', error);
            res.send('Error getting cats');
        });
});

module.exports = router;