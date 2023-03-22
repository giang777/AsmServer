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
    arrUser.forEach((value) => {
        dataTableUser += `<tr>
            <td>${i}</td>
            <td>${value.id}</td>
            <td><img src="${value.img}" alt="" width="80" height="80"></td>
            <td>${value.name}</td>
            <td>${value.user}</td>
            <td>${value.password}</td>
            <td>
            <button type="button" class="btn btn-danger">Xóa</button>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal_Edit_User">Sửa</button>
            </td>
        </tr>`;
        i++;
    });
    tbodyUser.innerHTML = dataTableUser;
}

function getDataProDuct() {
    let dataTableProduct = "";
    let j = 1;

    arrProduct.forEach((value) => {
        dataTableProduct += `<tr>
            <td>${j}</td>
            <td>${value.id}</td>
            <td><img src="${value.img}" alt="" width="80" height="80"></td>
            <td>${value.name}</td>
            <td>${value.price}</td>
            <td>${value.color}</td>
            <td>
            <button type="button" class="btn btn-danger">Xóa</button>
            <button type="button" class="btn btn-success">Sửa</button>
            </td>
        </tr>`;
        j++;
    });

    tbodyProduct.innerHTML = dataTableProduct
}

getDataUser();
getDataProDuct();




