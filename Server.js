const express = require('express');
const express_handlebars = require('express-handlebars');
const uploadFile = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();
const uri ="mongodb+srv://cucosieu:B8tA6vWuFhVuO60y@cluster0.jnksopi.mongodb.net/SimpleServer?retryWrites=true&w=majority";
const userManager = require("./public/js/User");

app.listen(3000,(err)=>{
    console.log("Server đang chạy 3000 ");
});
app.use(uploadFile());
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.engine('.hbs',express_handlebars.engine({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');
app.set('views', './views');


app.get('/', async (req,res)=>{
    await mongoose.connect(uri).then(console.log("Thành công"));
    res.render('index',{
        layout : 'Login',
    });
});



app.get('/home',(req,res)=>{
    res.render('home',{
        layout : 'main',
    });
});
app.post('/home',(req,res)=>{
    res.render('home',{
        layout : 'main',
    });
});



app.get('/userManager',async (req,res)=>{
    await mongoose.connect(uri).then(console.log("Thành công"));
    let userList = await userManager.find().lean();

    res.render('ListUser',{
        layout : 'main',
        data:userList,
    });
});
app.post('/userManager',(req,res)=>{
    res.render('ListUser',{
        layout : 'main',
    });
});



app.get('/productManager',(req,res)=>{
    res.render('ProductManager',{
        layout : 'main',
    });
});
app.post('/productManager',(req,res)=>{
    res.render('ProductManager',{
        layout : 'main',
    });
});


app.get('/order',(req,res)=>{
    res.render('Order',{
        layout : 'main',
    });
});
app.post('/order',(req,res)=>{
    res.render('Order',{
        layout : 'main',
    });
});


app.get('/statistical',(req,res)=>{
    res.render('Statistical',{
        layout : 'main',
    });
});
app.post('/statistical',(req,res)=>{
    res.render('Statistical',{
        layout : 'main',
    });
});