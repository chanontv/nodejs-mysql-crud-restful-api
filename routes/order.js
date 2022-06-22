const express = require('express');
const router = express.Router();
const db = require('../models/index');


// create 
router.post('/create',async(req,res) => {
    const {products_id,total_price,address} = req.body;
    try {
        db.query(
            'INSERT INTO orders(products_id,total_price,address) VALUES(?,?,?)',
            [products_id,total_price,address],
            (err,results,fields) => {
                if(err){
                    console.log('error while inserting = ',err);
                    return res.status(400).send();
                }
                return res.status(201).json({messege:'new order sucessfully created.'});
            }
        )
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
})

// update 
router.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    try {
        db.query("UPDATE orders SET status = ? WHERE id = ?", [status,id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "order updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// get order by filter status
router.get("/filter", async (req, res) => {

    const status = req.query.status
    try {
        db.query("SELECT * FROM orders WHERE status = ?", [status],(err, results, fields) => {
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

// get order by pagination
router.get("/pagination", async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    try {
        db.query("SELECT * FROM orders", (err, data, fields) => {
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

// delete 
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        db.query("DELETE FROM orders WHERE id = ?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No product with that id."});
            }
            return res.status(200).json({ message: "order deleted successfully."});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;