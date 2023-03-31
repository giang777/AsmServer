console.log("Add user");


const addUser = () => {
    let name = document.getElementById("fullname");
    let email = document.getElementById("email");
    let pass = document.getElementById("pass");
    let img = document.getElementById("files");
    let textErr = document.getElementsByClassName('texterr');
    let check
    if (name.value == "") {
        textErr[0].innerHTML = "Không được để chống tên";
        textErr[0].style.color = "red";
    } else {
        textErr[0].innerHTML = "";
    }

    if (email.value == "") {
        textErr[1].innerHTML = "Không được để chống email";
        textErr[1].style.color = "red";
    } else {
        textErr[1].innerHTML = "";
    }

    if (pass.value == "") {
        textErr[2].innerHTML = "Không được để chống mật khẩ";
        textErr[2].style.color = "red";
    } else {
        textErr[2].innerHTML = "";
    }

    img.addEventListener('change', () => {
        const file = img.files[0]; // Lấy đối tượng File đầu tiên trong mảng files
        if (file == null) {
            textErr[3].innerHTML = "Bạn chưa chọn file";
            textErr[3].style.color = "red";
        }else{
            textErr[3].innerHTML = "";
        }
    });


}