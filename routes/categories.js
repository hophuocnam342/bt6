const express = require('express');
const router = express.Router();
const Category = require('../schemas/categories');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Create a new category
router.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        return successResponse(res, 201, 'Category created successfully', savedCategory);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
});

// Get all categories (non-deleted)
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({ isDeleted: false });
        return successResponse(res, 200, 'Categories retrieved successfully', categories);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id, isDeleted: false });
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        return successResponse(res, 200, 'Category retrieved successfully', category);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        return successResponse(res, 200, 'Category updated successfully', category);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
});

// Soft delete category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        if (!category) {
            return errorResponse(res, 404, 'Category not found');
        }
        return successResponse(res, 200, 'Category deleted successfully', category);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
});

module.exports = router; 