var login = JSON.parse(localStorage.getItem('login'));
var islogin = login.isLogin;
var users = JSON.parse(localStorage.getItem('users'));
if(islogin == 1){
    var divnameLogin = document.getElementById('UserNameHeader');
    users.forEach(u => {
        if(u.loginName == login.nameLogin){
            divnameLogin.textContent = u.userName;
        }
    });
}
