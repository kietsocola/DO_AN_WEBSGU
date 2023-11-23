document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        saveFormData();
        validateForm();
    });

    function validateForm() {
        const username = document.getElementById('username').value.trim();
        const address = document.getElementById('address').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Reset errors
        clearErrors();

        // Validate username
        if (username === '') {
            setError('username', 'Vui lòng nhập Username');
        }

        // Validate address
        if (address === '') {
            setError('address', 'Vui lòng nhập địa chỉ');
        }

        // Validate password
        if (password === '') {
            setError('password', 'Vui lòng nhập mật khẩu');
        } else if (password.length < 5 || password.length > 15) {
            setError('password', 'Mật khẩu phải từ 5 đến 15 kí tự');
        }

        // Validate confirm password
        if (confirmPassword === '') {
            setError('confirm-password', 'Vui lòng nhập lại mật khẩu');
        } else if (confirmPassword !== password) {
            setError('confirm-password', 'Mật khẩu không khớp');
        }

        // Check if there are any errors
        if (document.querySelectorAll('.auth-form__group.error').length === 0) {
            // If no errors, submit the form or perform other actions
            form.saveFormData();
        }
    }

    function setError(field, message) {
        const inputField = document.getElementById(field);
        const errorElement = inputField.nextElementSibling;
        inputField.classList.add('error-border');
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        const errorFields = document.querySelectorAll('.auth-form__group.error');
        errorFields.forEach(function (errorField) {
            const inputField = errorField.querySelector('.auth-form__input');
            const errorElement = errorField.querySelector('small');
            inputField.classList.remove('error-border');
            errorElement.innerText = '';
            errorElement.style.display = 'none';
        });
    }

    function saveFormData() {
        const username = document.getElementById('username').value.trim();
        const address = document.getElementById('address').value.trim();
        const password = document.getElementById('password').value;

        // Lấy danh sách tài khoản từ localStorage (nếu có)
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        // Thêm tài khoản mới vào danh sách
        accounts.push({ username, address, password });

        // Lưu danh sách tài khoản vào localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));
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

    // Hàm hiển thị hộp thoại "Tính năng chưa tồn tại"
    function showFeatureNotImplementedDialog() {
        alert('Tính năng chưa tồn tại');
    }
});