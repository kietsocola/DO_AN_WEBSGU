function ktradk(){
    var tendn = document.getElementById('tendn');
    var mk = document.getElementById('nhapmk');
    //var dc = document.getElementById('nhapdc');
    var nlmk = document.getElementById('nhaplmk');

    if(tendn.value == ""){
        document.getElementById('thongbaotdn').innerHTML = "Tên đăng nhập không được rỗng";
        document.getElementById('thongbaotdn').style = "color: red";
        return false;
    } else if(tendn.value.length < 6){
        document.getElementById('thongbaotdn').innerHTML = "Tên đăng nhập phải trên 6 kí tự";
        document.getElementById('thongbaotdn').style = "color: red";
        return false;
    } else {
        document.getElementById('thongbaotdn').innerHTML = "";
    }

    if(mk.value == ""){
        console.log('sđ')
        document.getElementById('thongbaomk').innerHTML = "Vui lòng nhập mật khẩu";
        document.getElementById('thongbaomk').style = "color: red";
        return false;
    } else if(mk.value.length < 6){
        document.getElementById('thongbaomk').innerHTML = "Mật khẩu phải trên 6 kí tự";
        document.getElementById('thongbaomk').style = "color: red";
        return false;
    } else {
        document.getElementById('thongbaomk').innerHTML = "";
    }

    if ( nlmk.value !== mk.value){
        document.getElementById('thongbaonhaplmk').innerHTML = "Mật khẩu nhập lại chưa chính xác";
        document.getElementById('thongbaonhaplmk').style = "color: red";
        return false;
    } else {
        document.getElementById('thongbaonhaplmk').innerHTML = "";
    }
    
    return true
}
// var btnRegister = document.getElementById('btn-register');
// btnRegister.addEventListener('click', function(e){
//     e.preventDefault();
//     ktradk();
// });