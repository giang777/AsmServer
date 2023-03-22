const express = require('express');
const express_handlebars = require('express-handlebars');
const uploadFile = require('express-fileupload');


const app = express();

app.listen(3000,(err)=>{
    console.log("Server đang chạy 3000 ");
});

app.use(uploadFile());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.engine('.hbs',express_handlebars.engine({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');
app.set('views', './views');

app.get('/',(req,res)=>{
    res.render('index',{
        layout : 'main',
        helpers : {
            foo() {return 'HIHI'}
        }
    })
})

app.post('/home',(req,res)=>{
    res.render('home',{
        layout : 'main',
        helpers : {
            foo() {return 'HIHI'}
        }
    })
})