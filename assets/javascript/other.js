var boxLoveProduct = document.getElementsByClassName('containerLoveProduct')[0];
var boxBag = document.getElementById('containerBag');
var boxProduct = document.getElementById('container-main');
var yeuthich = document.getElementById('love-product');
var giohang = document.getElementById('gio-hang');

giohang.addEventListener('click', function(e){
    boxLoveProduct.style = "display: none ;"
    boxBag.style = "display: block ;"
    boxProduct.style = "display: none;"
});

yeuthich.addEventListener('click', function(e){
    boxBag.style = "display: none ;"
    boxLoveProduct.style = "display: block ;"
    boxProduct.style = "display: none;"
});

//js for login, register
var formLogin = document.getElementsByClassName('content-body-login')[0];
var formRegister = document.getElementsByClassName('content-body-register')[0];
var loginBtn = document.getElementsByClassName('login-link')[0];
var registerBtn = document.getElementsByClassName('link-register')[0];
var nenDen = document.getElementById('nen-den');
loginBtn.addEventListener('click', function(e){
    formLogin.style = "display: block; z-index: 100;"
    nenDen.style = "display: block; z-index: 99; position: absolute; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);"
    registerBtn.addEventListener('click', function(e){
        formRegister.style= "display: block; z-index: 101;"
    })
});
nenDen.addEventListener("click", function(e){
    formLogin.style.display = 'none';
    formRegister.style.display = 'none';
    nenDen.style.display = 'none';
});