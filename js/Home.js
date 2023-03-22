$(document).ready(function () {
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
});

let arrUser = [
    {id:1,name:'Giang',user:'hihi123',password:'0343729937',img:'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160'},
    {id:2,name:'Hùng',user:'hihi124',password:'0343729937',img:'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160'},
    {id:3,name:'Hoàng',user:'hihi125',password:'0343729937',img:'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160'},
    {id:4,name:'Long',user:'hihi126',password:'0343729937',img:'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160'},
    {id:5,name:'Hưng',user:'hihi127',password:'0343729937',img:'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/zhongli/image.png?strip=all&quality=100&w=160'}
]

let tbody = document.querySelector('tbody');
let dataTable = "";
let i =1;
arrUser.forEach((value)=>{
    dataTable += `<tr>
        <td>${i}</td>
        <td>${value.id}</td>
        <td><img src="${value.img}" alt="" width="80" height="80"></td>
        <td>${value.name}</td>
        <td>${value.user}</td>
        <td>${value.password}</td>
        <td>
        <button type="button" class="btn btn-danger"  onclick="btnDeleteUser(${{value}})">Xóa</button>
        <button type="button" class="btn btn-success">Sửa</button>
        </td>
    </tr>`;
    i++;
});

function btnDeleteUser({user}){
    console.log(user.name);
}
tbody.innerHTML = dataTable;


