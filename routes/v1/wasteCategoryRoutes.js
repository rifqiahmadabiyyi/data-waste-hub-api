const express = require('express');
const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../../controllers/wasteCategoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;