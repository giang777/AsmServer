$(document).ready(function () {
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
});

let arrUser = [
    { id: 1, name: 'Giang', user: 'hihi123', password: '0343729937', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 2, name: 'Hùng', user: 'hihi124', password: '0343729937', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 3, name: 'Hoàng', user: 'hihi125', password: '0343729937', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 4, name: 'Long', user: 'hihi126', password: '0343729937', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' },
    { id: 5, name: 'Hưng', user: 'hihi127', password: '0343729937', img: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160' }
]

let arrProduct = [
    { id: 1, name: 'Áo phao', price: 100000, color: 'Xám', img: 'https://vitimex.com.vn/hinhanh/sanpham/ao-phao-long-vu-akn0123.jpg' },
    { id: 2, name: 'Quần kahi', price: 100000, color: 'Xám', img: 'https://www.akmen.vn/images/2017/01/quan-kaki-xanh-bien-qk163-3555-p.jpg' },
    { id: 3, name: 'Áo Jean', price: 100000, color: 'Xám', img: 'https://cf.shopee.vn/file/3bf98a971a93bda6053cac1c572247f9' },
    { id: 4, name: 'Quần âu', price: 100000, color: 'Xám', img: 'https://360boutique.vn/wp-content/uploads/2021/04/QACTK203-1.jpg' },
    { id: 5, name: 'Áo khoác', price: 100000, color: 'Xám', img: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/m0w2iuvv-1-1hxj-hinh-mat-truoc-0as.jpg' },
]

let tbodyUser = document.getElementById('table_user');
let tbodyProduct = document.getElementById('table_product');

function getDataUser() {
    let dataTableUser = "";
    let i = 1;
    arrUser.forEach((value, index) => {
        dataTableUser += `<tr>
            <td>${i}</td>
            <td>${value.id}</td>
            <td><img src="${value.img}" alt="" width="80" height="80"></td>
            <td>${value.name}</td>
            <td>${value.user}</td>
            <td>${value.password}</td>
            <td>
            <button type="button" class="btn btn-danger" onclick="deleteUser(${Number(index)})">Xóa</button>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal_Edit_User" onclick="editUser(${Number(index)})">Sửa</button>
            </td>
        </tr>`;
        i++;
    });
    tbodyUser.innerHTML = dataTableUser;
}

function getDataProDuct() {
    let dataTableProduct = "";
    let j = 1;

    arrProduct.forEach((value,index) => {
        dataTableProduct += `<tr>
            <td>${j}</td>
            <td>${value.id}</td>
            <td><img src="${value.img}" alt="" width="80" height="80"></td>
            <td>${value.name}</td>
            <td>${value.price}</td>
            <td>${value.color}</td>
            <td>
            <button type="button" class="btn btn-danger" onclick="deleteProduct(${Number(index)})">Xóa</button>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal_Product_Edit" onclick="editProduct(${Number(index)})">Sửa</button>
            </td>
        </tr>`;
        j++;
    });

    tbodyProduct.innerHTML = dataTableProduct;
}

getDataUser();
getDataProDuct();

const addUser = () => {
    let id = new Date().getTime();
    let name = document.getElementById("nameUser");
    let username = document.getElementById("userName");
    let password = document.getElementById('pwd');
    let password2 = document.getElementById('pwd2');
    let img = document.getElementById('imgUser');
    let textErr = document.getElementsByClassName('textErrAdd');
    let check = true;

    if (name.value == '') {
        textErr[0].innerHTML = 'Không được để chống tên';
        textErr[0].style.color = 'red';
        check = false;
    } else {
        textErr[0].innerHTML = 'Tên hợp lệ';
        textErr[0].style.color = 'green';
    }

    if (username.value == '') {
        textErr[1].innerHTML = 'Không được để chống tài khoản';
        textErr[1].style.color = 'red';
        check = false;
    } else {
        let xet = true;
        arrUser.forEach((value) => {
            if (value.user == username.value) {
                xet = false;
            }
        })
        if (xet) {
            textErr[1].innerHTML = 'Tài khoản hợp lệ';
            textErr[1].style.color = 'green';
        } else {
            textErr[1].innerHTML = 'Tài khoản đã tồn tại ';
            textErr[1].style.color = 'red';
            check = false;
        }
    }

    if (password.value == '') {
        textErr[2].innerHTML = 'Không được để chống mật khẩu';
        textErr[2].style.color = 'red';
        check = false;
    } else {
        textErr[2].innerHTML = 'Mật khẩu hợp lệ';
        textErr[2].style.color = 'green';
    }

    if (password2.value == '') {
        textErr[3].innerHTML = 'Không được để chống mật khẩu';
        textErr[3].style.color = 'red';
        check = false;
    } else {
        if (password2.value == password.value) {
            textErr[3].innerHTML = 'Mật khẩu khớp';
            textErr[3].style.color = 'green';
        } else {
            textErr[3].innerHTML = 'Mật khẩu không khớp';
            textErr[3].style.color = 'red';
            check = false;
        }

    }

    if (img.value == '') {
        textErr[4].innerHTML = 'Không được để chống link ảnh';
        textErr[4].style.color = 'red';
        check = false;
    } else {
        textErr[4].innerHTML = 'Mật khẩu hợp lệ';
        textErr[4].style.color = 'green';
    }


    if (check) {
        let user = { id: id, name: name.value, user: username.value, password: password.value, img: img.value }
        arrUser.push(user);
        setTimeout(() => {
            alert("Thêm thành công");
            getDataUser();
        }, 1000)

    }

}

const deleteUser = (index) => {

    console.log(index)
    arrUser.splice(Number(index), 1);
    alert("Xóa thành công !")
    getDataUser();
    console.log(arrUser);

}

const editUser = (index) => {
    let name = document.getElementById("nameUserEdit");
    let password = document.getElementById('pwdEdit');
    let password2 = document.getElementById('pwd2Edit');
    let img = document.getElementById('imgUserEdit');
    let textErr = document.getElementsByClassName('textErrEdit');
    let btn = document.getElementById("btn_editUser")
    let check = true;

    name.value = arrUser[index].name;
    password.value = arrUser[index].password;
    password2.value =  arrUser[index].password;
    img.value = arrUser[index].img;

    if (name.value == '') {
        textErr[0].innerHTML = 'Không được để chống tên';
        textErr[0].style.color = 'red';
        check = false;
    } else {
        textErr[0].innerHTML = 'Tên hợp lệ';
        textErr[0].style.color = 'green';
    }


    if (password.value == '') {
        textErr[1].innerHTML = 'Không được để chống mật khẩu';
        textErr[1].style.color = 'red';
        check = false;
    } else {
        textErr[1].innerHTML = 'Mật khẩu hợp lệ';
        textErr[1].style.color = 'green';
    }

    if (password2.value == '') {
        textErr[2].innerHTML = 'Không được để chống mật khẩu';
        textErr[2].style.color = 'red';
        check = false;
    } else {
        if (password2.value == password.value) {
            textErr[2].innerHTML = 'Mật khẩu khớp';
            textErr[2].style.color = 'green';
        } else {
            textErr[2].innerHTML = 'Mật khẩu không khớp';
            textErr[2].style.color = 'red';
            check = false;
        }

    }

    if (img.value == '') {
        textErr[3].innerHTML = 'Không được để chống link ảnh';
        textErr[3].style.color = 'red';
        check = false;
    } else {
        textErr[3].innerHTML = 'Mật khẩu hợp lệ';
        textErr[3].style.color = 'green';
    }



    btn.onclick = ()=>{
        if (check) {
            arrUser[index].name = String(name.value);
            arrUser[index].password = String(password.value);
            arrUser[index].img = String(img.value);
            
            setTimeout(() => {
                alert("Sửa thành công");
                getDataUser();
            }, 1000)
    
        }
    }

}

const addProduct = () => {
    let id = new Date().getTime();
    let name = document.getElementById("nameProduct");
    let price = document.getElementById("priceProduct");
    let colorArr = document.getElementById("select_addProduct");
    let color = colorArr.options[colorArr.selectedIndex].value;
    let img = document.getElementById('imgProduct');
    let textErr = document.getElementsByClassName('textErrAddProduct');
    let check = true;
    console.log(color);
    if (name.value == '') {
        textErr[0].innerHTML = 'Không được để chống tên';
        textErr[0].style.color = 'red';
        check = false;
    } else {
        textErr[0].innerHTML = 'Tên hợp lệ';
        textErr[0].style.color = 'green';
    }

    if (price.value == '') {
        textErr[1].innerHTML = 'Không được để chống tài khoản';
        textErr[1].style.color = 'red';
        check = false;
    } else {
        if (Number(price.value) <= 0) {
            textErr[1].innerHTML = 'Giá không hợp lệ';
            textErr[1].style.color = 'red';
            check = false;
        } else {
            textErr[1].innerHTML = 'Giá hợp lệ ';
            textErr[1].style.color = 'green';
        }
    }

    if (color == 'Null') {
        textErr[2].innerHTML = 'Không được để chống màu';
        textErr[2].style.color = 'red';
        check = false;
    } else {
        textErr[2].innerHTML = 'Màu hợp lệ';
        textErr[2].style.color = 'green';
    }

    
    if (img.value == '') {
        textErr[3].innerHTML = 'Không được để chống link ảnh';
        textErr[3].style.color = 'red';
        check = false;
    } else {
        textErr[3].innerHTML = 'Mật khẩu hợp lệ';
        textErr[3].style.color = 'green';
    }


    if (check) {
        let products = { id: id, name: name.value, price: price.value, color: color, img: img.value }
        arrProduct.push(products);
        setTimeout(() => {
            alert("Thêm thành công");
            getDataProDuct();
        }, 1000)

    }

}

const deleteProduct = (index) => {

    console.log(index)
    arrProduct.splice(Number(index), 1);
    alert("Xóa thành công !")
    getDataProDuct();
    
}

const editProduct  = (index) => {
    let name = document.getElementById("nameProductEdit");
    let price = document.getElementById("priceProductEdit");
    let colorArr = document.getElementById("edit_colorProduct");
    let color = colorArr.options[colorArr.selectedIndex];
    console.log(color);
   
    let img = document.getElementById('imgProductEdit');
    let textErr = document.getElementsByClassName('textErrEditProduct');
    let btn_edit = document.getElementById("btn_editProduct");
    let check = true;

    name.value = arrProduct[index].name;
    price.value = arrProduct[index].price;
    img.value = arrProduct[index].img;

    console.log(color);
    if (name.value == '') {
        textErr[0].innerHTML = 'Không được để chống tên';
        textErr[0].style.color = 'red';
        check = false;
    } else {
        textErr[0].innerHTML = 'Tên hợp lệ';
        textErr[0].style.color = 'green';
    }

    if (price.value == '') {
        textErr[1].innerHTML = 'Không được để chống tài khoản';
        textErr[1].style.color = 'red';
        check = false;
    } else {
        if (Number(price.value) <= 0) {
            textErr[1].innerHTML = 'Giá không hợp lệ';
            textErr[1].style.color = 'red';
            check = false;
        } else {
            textErr[1].innerHTML = 'Giá hợp lệ ';
            textErr[1].style.color = 'green';
        }
    }

    // if (color.text == 'Null') {
    //     textErr[2].innerHTML = 'Không được để chống màu';
    //     textErr[2].style.color = 'red';
    //     check = false;
    // } else {
    //     textErr[2].innerHTML = 'Màu hợp lệ';
    //     textErr[2].style.color = 'green';
    // }

    if (img.value == '') {
        textErr[3].innerHTML = 'Không được để chống link ảnh';
        textErr[3].style.color = 'red';
        check = false;
    } else {
        textErr[3].innerHTML = 'Mật khẩu hợp lệ';
        textErr[3].style.color = 'green';
    }

    btn_edit.addEventListener('click',()=>{
        console.log(color);
        if (check) {
            arrProduct[index].name = String(name.value);
            arrProduct[index].price = String(price.value);
            arrProduct[index].color = String(color.value);
            arrProduct[index].img = String(img.value);

            setTimeout(() => {
                alert("Sửa thành công");
                getDataProDuct();
            }, 1000)
    
        }
    })


}





