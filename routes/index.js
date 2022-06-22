const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/',(req,res,next) => {

    db.query('SELECT * FROM products ORDER BY id asc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('search', { data: '' });
        } else {
            res.render('search', { data: rows });
        }
    })
});

router.get('/search',function(req,res){
    var gender = req.query.gender;
    var style = req.query.style;
    var size = req.query.size;
    var price = req.query.price;
    var sql = `SELECT * FROM products where Gender LIKE '%${gender}%' AND Style LIKE '%${style}%' AND Size LIKE '%${size}%' AND Price LIKE '%${price}%'`;
    
    db.query(sql, function(err,result){
        if(err) console.log(err);
        res.render('search',{ data: result });
    })
   
})


module.exports = router;