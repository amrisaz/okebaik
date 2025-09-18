const express = require('express');
const router = express.Router();
const manualPoController = require('../controllers/manualPoController');

router.get('/', manualPoController.getAll);
router.get('/export/excel', manualPoController.exportExcel);
router.get('/:id', manualPoController.getById);
router.post('/', manualPoController.create);
router.put('/:id', manualPoController.update);
router.delete('/:id', manualPoController.delete);
router.get('/search/global', manualPoController.searchGlobal);

module.exports = router;
