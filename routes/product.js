const express = require('express');
const router = express.Router();
const db = require('../models/index');

// create product
router.post('/create',async(req,res) => {
    const {Gender,Style,Size,Price} = req.body;

    try {
        db.query(
            'INSERT INTO products(Gender,Style,Size,Price) VALUES(?,?,?,?)',
            [Gender,Style,Size,Price],
            (err,results,fields) => {
                if(err){
                    console.log('error while inserting = ',err);
                    return res.status(400).send();
                }
                return res.status(201).json({messege:'new product sucessfully created.'});
            }
        )
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})

// get all products
router.get("/read", async (req, res) => {
    try {
        db.query("SELECT * FROM products", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// get product 
router.get("/read/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.params['id']);
    try {
        db.query("SELECT * FROM products WHERE id = ?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// get products by pagination
router.get("/pagination", async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
        db.query("SELECT * FROM products", (err, data, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } 
            const results = {}

            if(endIndex < data.length){
                results.next = {
                    page: page+ 1,
                    limit: limit 
                }
            }

            if(startIndex > 0){
                results.previous = {
                    page: page- 1,
                    limit: limit 
                }
            }

            results.results = data.slice(startIndex, endIndex)

            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// update product 
router.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const Gender = req.body.Gender;
    const Style = req.body.Style;
    const Size = req.body.Size;
    const Price = req.body.Price;

    try {
        db.query("UPDATE products SET Gender = ?, Style = ?, Size = ?, Price = ? WHERE id = ?", [Gender,Style,Size,Price,id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "product updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// delete product 
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        db.query("DELETE FROM products WHERE id = ?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No product with that id."});
            }
            return res.status(200).json({ message: "product deleted successfully."});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})


module.exports = router;