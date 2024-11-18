const express = require('express');
const {
  getAllDepartements,
  createDepartement,
  getDepartementById,
  updateDepartement,
  deleteDepartement
} = require('../../controllers/departementController');

const router = express.Router();

router.get('/', getAllDepartements);
router.post('/', createDepartement);
router.get('/:id', getDepartementById);
router.put('/:id', updateDepartement);
router.delete('/:id', deleteDepartement);

module.exports = router;