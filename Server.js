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
const productManager = require("./public/js/Product");
const e = require('express');

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
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
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
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let userList = await userManager.find().lean();

    res.render('ListUser', {
        layout: 'main',
        data: userList,
    });
});
//,upload.single("img")
app.post('/userManager', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let userList = await userManager.find().lean();

    let name = req.body.fullname;
    let email = req.body.email;
    let pass = req.body.pass;
    let img = req.files.img;
    // console.log(img);
    // let check = false;

    let check = true;
    let textErr = "";
    await userList.forEach((value) => {
        if (value.email == email) {
            check = false;
        }
    })

    if (check) {
        let pathImg = "",
            dataImg = "",
            file_ext = "",
            imgBase64 = "";

        pathImg = img.data;
        dataImg = pathImg.toString('base64');
        file_ext = img.name.substring(img.name.lastIndexOf('.') + 1);
        imgBase64 = `data:image/${file_ext};base64,${dataImg}`;

        let addUser = new userManager({
            name: name,
            email: email,
            password: pass,
            img: imgBase64,
            permission: "USER"
        })

        await addUser.save();
        res.redirect("/userManager");

    } else {
        res.send('<script>alert("Email đã tồn tại!"); window.location.href = "/userManager";</script>');
    }
});
app.post("/deleteUser", async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let id = req.body.id;
    console.log(id);
    let userId = await userManager.findOne({ _id: id }).lean();
    console.log(userId.permission);
    if (userId.permission === 'ADMIN') {
        res.send('<script>alert("Không thể xóa Admin !"); window.location.href = "/userManager";</script>');
    } else {
        await userManager.deleteOne({ _id: id });
        res.redirect("/userManager");
    }

});
app.post("/editUser", async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let id = req.body.id;
    let name = req.body.fullname;
    let email = req.body.email;
    let pass = req.body.pass;
    let img = req.files;

    let userList = await userManager.find().lean();

    let data = [...userList];
    let userEdit = await userManager.findOne({ _id: id }).lean();

    let check = true;
    for (let i = 0; i < data.length; i++) {
        if (userEdit.email == data[i].email) {
            continue;
        }

        if (email == userList[i].email) {
            check = false;
            break;
        }
    }

    console.log(check);
    if (check) {
        let userUpdate = new userManager({
            _id: id,
        })
        let imgUpdate = "";

        if (img == null) {
            imgUpdate = userEdit.img;
        } else {
            let pathImg = "",
                dataImg = "",
                file_ext = "";

            pathImg = img.img.data;
            dataImg = pathImg.toString('base64');
            file_ext = img.img.name.substring(img.img.name.lastIndexOf('.') + 1);
            imgUpdate = `data:image/${file_ext};base64,${dataImg}`;
        }
        console.log(imgUpdate);
        await userUpdate.updateOne({ name: name, email: email, password: pass, img: imgUpdate, permission: "USER" })
        res.redirect("/userManager");
    }
})



app.get('/productManager', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let productList = await productManager.find().lean();

    res.render('ProductManager', {
        layout: 'main',
        data: productList,
    });
});
app.post('/productManager', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let name = req.body.fullname;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let color = req.body.color;
    let img = req.files.img;

    let pathImg = "",
        dataImg = "",
        file_ext = "",
        imgBase64 = "";

    pathImg = img.data;
    dataImg = pathImg.toString('base64');
    file_ext = img.name.substring(img.name.lastIndexOf('.') + 1);
    imgBase64 = `data:image/${file_ext};base64,${dataImg}`;

    let addProduct = new productManager({
        name: name,
        price: price,
        quantity: quantity,
        color: color,
        img: imgBase64,
    })

    await addProduct.save();

    let productList = await productManager.find().lean();

    res.render('ProductManager', {
        layout: 'main',
        data: productList,
    });
});
app.post('/deleteProduct', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let id = req.body.id;
    await productManager.deleteOne({ _id: id });

    res.redirect("/productManager")
})
app.post('/editProduct', async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let id = req.body.id;
    let name = req.body.fullname;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let color = req.body.color;
    let img = req.files;
    let imgUpdate = "";

    let userEdit = await productManager.findOne({ _id: id }).lean();
    if (img == null) {
        imgUpdate = userEdit.img;
    } else {
        let pathImg = "",
            dataImg = "",
            file_ext = "";
            
        pathImg = img.img.data;
        dataImg = pathImg.toString('base64');
        file_ext = img.img.name.substring(img.img.name.lastIndexOf('.') + 1);
        imgUpdate = `data:image/${file_ext};base64,${dataImg}`;
    };
    let userUpdate = new productManager({
        _id:id,
    });
    await userUpdate.updateOne({name:name,price:price,quantity:quantity,color:color,img:imgUpdate});

    res.redirect("/productManager")
})



app.get("/userAPI", async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let api = await userManager.find().lean();
    console.log(api);
    res.json(api);
});
app.get("/productAPI", async (req, res) => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let api = await productManager.find().lean();
    console.log(api);
    res.json(api);
})

