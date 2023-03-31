const express = require('express');
const express_handlebars = require('express-handlebars');
const upload = require("express-fileupload")
//const multer = require("multer");
const mongoose = require('mongoose');
const fs = require('fs');
const axios = require('axios');
const app = express();
const uri = "mongodb+srv://cucosieu:B8tA6vWuFhVuO60y@cluster0.jnksopi.mongodb.net/SimpleServer?retryWrites=true&w=majority";
const userManager = require("./public/js/User");

app.listen(3000, (err) => {
    console.log("Server đang chạy 3000 ");
});

app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.engine('.hbs', express_handlebars.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'D:/Server/data_img/user/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// const upload = multer({ storage: storage })

app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    res.render('index', {
        layout: 'Login',
    });
});

app.get('/home', (req, res) => {
    res.render('home', {
        layout: 'main',
    });
});
app.post('/home', (req, res) => {
    res.render('home', {
        layout: 'main',
    });
});



app.get('/userManager', async (req, res) => {
    await mongoose.connect(uri);
    let userList = await userManager.find().lean();

    res.render('ListUser', {
        layout: 'main',
        data: userList,
    });
});
//,upload.single("img")
app.post('/userManager', async (req, res) => {

    let name = req.body.fullname;
    let email = req.body.email;
    let pass = req.body.pass;
    let img = req.files.img;
    // console.log(img);
    // let check = false;
    
    let pathImg = "",
        dataImg = "",
        file_ext = "",
        imgBase64  = "";

    pathImg = img.data;
    dataImg = pathImg.toString('base64');
    file_ext = img.name.substring(img.name.lastIndexOf('.') + 1);
    imgBase64 = `data:image/${file_ext};base64,${dataImg}`;
    
    let addUser = new userManager({
        name:name,
        email:email,
        password:pass,
        img:imgBase64,
    })

    await addUser.save();
    await mongoose.connect(uri);
    let userList = await userManager.find().lean();

    res.render('ListUser', {
        layout: 'main',
        data: userList,
    });
});



app.get('/productManager', (req, res) => {
    res.render('ProductManager', {
        layout: 'main',
    });
});
app.post('/productManager', (req, res) => {
    res.render('ProductManager', {
        layout: 'main',
    });
});


app.get('/order', (req, res) => {
    res.render('Order', {
        layout: 'main',
    });
});
app.post('/order', (req, res) => {
    res.render('Order', {
        layout: 'main',
    });
});


app.get('/statistical', (req, res) => {
    res.render('Statistical', {
        layout: 'main',
    });
});
app.post('/statistical', (req, res) => {
    res.render('Statistical', {
        layout: 'main'
    });
});

