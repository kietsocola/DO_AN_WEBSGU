document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('.auth-form');

    // Thêm sự kiện submit cho form đăng ký
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveFormData();
    });

    // Thêm sự kiện submit cho form đăng nhập
    const loginForm = document.querySelector('.auth-form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateLogin();
    });

    function validateLogin() {
        const loginUsername = document.getElementById('login-username').value.trim();
        const loginPassword = document.getElementById('login-password').value;

        // Lấy danh sách tài khoản từ localStorage
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        // Kiểm tra xem thông tin đăng nhập có hợp lệ không
        const validAccount = accounts.find(account => account.username === loginUsername && account.password === loginPassword);

        if (validAccount) {
            alert('Đăng nhập thành công!');
            // Thực hiện các hành động khác sau khi đăng nhập thành công
        } else {
            alert('Thông tin đăng nhập không đúng. Vui lòng thử lại.');
        }
    }


    const facebookButton = document.querySelector('.auth-form__socials-facebook');
    const googleButton = document.querySelector('.auth-form__socials-google');
    // Thêm sự kiện click cho nút Facebook
    facebookButton.addEventListener('click', function (event) {
        event.preventDefault();
        showFeatureNotImplementedDialog();
    });

    // Thêm sự kiện click cho nút Google
    googleButton.addEventListener('click', function (event) {
        event.preventDefault();
        showFeatureNotImplementedDialog();
    });

    function showFeatureNotImplementedDialog() {
        alert('Tính năng chưa tồn tại');
    }
});