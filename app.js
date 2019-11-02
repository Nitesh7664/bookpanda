const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/bookpanda', { useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log('connection made successfully');
}).on('error' , (err) => {
    console.log(err);
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(multer({storage: fileStorage}).single('image'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/photos',express.static(__dirname + '/photos'));
app.use('/photos/',express.static(__dirname + '/photos'));



app.listen(PORT, () => {
    console.log("server created......now make fireworks");
});
