const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('./model/product');
const User = require('./model/user');
const mongoose = require('mongoose');


router.get('/', (req, res) => {
    res.render('index' ,{
        loginId: req.cookies.loginId
    });
});


// ---------register------
router.get('/register' , (req, res) => {
    if(req.cookies.loginId != 'false'){
        res.redirect('/content');
    }else{
        res.render('register');
    }
});
router.post('/register' , (req, res) => {
    const {fname, lname, email, password} = req.body;
    User.findOne({email: email}).then((data) => {
        console.log(data);
        if(!data){
            const user = new User({
                fname: fname,
                lname: lname,
                email: email,
                password: password
            }).save().then((data) => {
                console.log(data);
                res.render('login', {data: data.email,registered: 'false'});
            }).catch((err) => {
                console.log(err);
            });
        }else{
            res.render('login',{registered: 'true',data: ''});
        }
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/content', (req, res) => {
    // console.log(req.cookies.loginId);
    Product.find({}).then((data) => {
        res.render('content', {product: data})
    }).catch((err) => {
        console.log(err);
    });
});







// --------login----------
router.get('/login', (req, res) => {
    if(req.cookies.loginId == 'false'){
        res.render('login', {registered : 'false', data: ''});
    }else{
        res.redirect('content');        
    }
    // res.json('nitesh');
});
router.post('/login', (req, res) => {
    if(!req.body.loginId){
        User.findOne({email: req.body.email}).then((data) => {
            res.setHeader('Set-Cookie', 'loginId=' + data._id);
            res.redirect('content');
        }).catch((err) => {
            console.log(err);
        });
    }
});

router.get('/addproduct', (req, res) => {
    res.render('addproduct');
});
router.post('/addproduct', (req, res) => {
    // console.log(req.file);
    // // res.send(req.body.image);
    // console.log(req.body);
    const {title, price, section, subject, description} = req.body;
    const image = req.file;
    const product = new Product({
        title: title,
        price: price,
        subject: subject,
        section: section,
        description: description,
        path: image.path
    }).save().then((data) => {
        console.log(data);
        res.redirect('/content')
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/buynow/:id', (req, res) => {
    res.json('jaadu');
});



// -------product-----------

router.get('/product/:id', (req, res) => {
    Product.findOne({_id: req.params.id}).then((data) => {
        res.render('product', {product: data});
    }).catch((err) => {
        console.log(err);
    });
});


// ----------about---------
router.get('/about', (req, res) => {
    res.render('about', {loginId: req.cookies.loginId});
});



// ------logout------
router.get('/logout', (req, res) => { 
    res.setHeader('Set-Cookie', 'loginId=false');
    res.redirect('/home');
});


module.exports = router;