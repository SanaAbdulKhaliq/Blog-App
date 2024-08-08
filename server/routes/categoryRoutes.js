const express = require('express')
const router = express.Router();
const Category = require('../models/categoryModel');

//Getting all the category
router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category)
    } catch (error) {
        console.log('Error getting categories',error);
        res.status(500).json({message: 'Error getting categories', error})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category)
    } catch (error) {
        console.log('Error getting categories',error);
        res.status(500).json({message: 'Error getting categories', error})
    }
})

//Adding the category
router.post('/add-category', async (req, res) => {
    try {
        const {categoryName} = req.body;
        const category = new Category({categoryName});
        await category.save();
        res.status(201).json({message: 'Category has been added'})
    } catch (error) {
        console.log('Error in adding categories',error);
        res.status(500).json({message: 'Error in adding category', error})
    }
})

//Deleting Category
router.delete('/delete-category', async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id,{...req?.body});
        if(!category){
            return res.status(404).json({message: 'Category not found'})
        }
        res.status(201).json({message: 'Deleting the category'})
    } catch (error) {
        console.log('Error in deleting category', error);
        res.status(500).json({message: 'Error in deleting category', error})
    }
})

module.exports = router;