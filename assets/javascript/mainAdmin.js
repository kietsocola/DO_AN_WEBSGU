// biến menu bên trái
var menuLeft = document.getElementById('menu-left');
//biến của vùng chứa header+table...
var content = document.getElementById('content');
//biến icon dùng để ẩn hiện menuLeft
var hamburgerMenu = document.querySelectorAll('.icon-hamburger');
//biến để thoát khỏi form edit và form add product
var btnExit = document.getElementById('icon-exit');
//biến tiêu đề của danh mục trong menuLeft
var itemTitle = document.getElementsByClassName('item-title');

// hàm thu nhỏ phóng to menuLeft
function menuLeftFC() {
    var logoAdmin = document.getElementById('logo-adminID');
    var iconMenuLeft = document.getElementsByClassName('icon-menuLeft');
    //đây là biến xuất hiện khi muốn làm background màu đen trong suốt
    var overlay = document.getElementById("overlay");
    //khi màn hình > 700px
    if (window.innerWidth > 700) {
        // nếu tiêu đề các mục bị ẩn => menuLeft đang thủ nhỏ
        if (itemTitle[0].style.display === 'none') {
            // set lại chiều rộng
            menuLeft.style.width = '20%';
            content.style.width = '90%';
            // vòng lặp dùng để hiển thị lại các tiêu đề và cài padding
            for (var i = 0; i < itemTitle.length; i++) {
                itemTitle[i].style.display = 'block';
                iconMenuLeft[i].style.padding = "0 30px";
            }
            //đổi hình logo
            logoAdmin.src = './assets/image/logo-admin.png';
            logoAdmin.width = '150';
        } else { // nếu tiêu đề các mục đang hiển thị => menuLeft đang mở to
            // set lại chiều rộng
            menuLeft.style.width = '4%';
            content.style.width = '96%';
            // vòng lặp dùng để ẩn các tiêu đề và cài padding
            for (var i = 0; i < itemTitle.length; i++) {
                itemTitle[i].style.display = 'none';
                iconMenuLeft[i].style.padding = "0 0 0 18px";
            }
            //đổi hình logo
            logoAdmin.src = './assets/image/favicon.png';
            logoAdmin.width = '30';
        }
    } else { // nếu width màn hình <=700
        //nếu menuLeft đang bị ẩn thì hiển thị theo định dạng phone
        if (menuLeft.classList.contains('menu-left-hidden')) {
            menuLeft.classList.remove('menu-left-hidden');
            overlay.style.display = "block";
            btnExit.style.display = "block";
        } else {
            menuLeft.classList.add('menu-left-hidden');
            overlay.style.display = "none";
        }
    }
}

// thêm sự kiện cho các button ẩn hiện menuLeft
hamburgerMenu.forEach(function (element) {
    element.addEventListener('click', menuLeftFC)
});
//tạo hiệu ứng phóng to thu nhỏ menuLeft khi di chuột vào hoặc ra
menuLeft.addEventListener('mouseenter', function (event) {
    if (window.innerWidth > 700) {
        console.log("yes")
        if (itemTitle[0].style.display === 'none') {
            console.log("yes2")

            if (event.target === menuLeft) {
                // menuLeftFC()
            }
        };
    }
});
menuLeft.addEventListener('mouseout', function (event) {
    if (window.innerWidth > 700) {
        console.log("yesout")
        if (itemTitle[0].style.display === 'block') {
            console.log("yes2")
            if (event.target === menuLeft) {
                // menuLeftFC()
            }
        };
    }
});

//kiểm tra nếu màn hình >700px và phần background đen đang hiển thị thì ẩn đi
function setZIndexBasedOnWidth() {
    if (window.innerWidth > 700) {
        btnExit.style.display = "none";
        overlay.style.display = "none";
    } else { //kiểm tra ở dạng phone (width màn hình <700px) nếu MenuLeft đang hiển thị
        // thì cho background đen+nút exit hiển thị
        if (getComputedStyle(menuLeft).getPropertyValue("display") === 'block') {
            overlay.style.display = "block";
            btnExit.style.display = "block";
        }
    }
}

// Gọi hàm và thêm sự kiện thay đổi kích thước màn hình
setZIndexBasedOnWidth();
window.addEventListener('resize', setZIndexBasedOnWidth);



//click Thêm sản phẩm
document.getElementById('add-product').addEventListener('click', function (event) {
    event.preventDefault();
    //page đang hiển thị
    var pageCurrent = document.getElementsByClassName('active')[0];
    //page muốn hiển thị
    var pageNeedAdd = document.getElementsByClassName('not-active')[0];
    // nút submit
    var btnSub = document.getElementById('btn-submit');
    //ẩn page hiện tại và hiển thị page muốn hiển thị
    pageCurrent.classList.add('not-active');
    pageCurrent.classList.remove('active');
    pageNeedAdd.classList.add('active');
    pageNeedAdd.classList.remove('not-active');
    //vì đây là page thêm sản phẩm nên nút là create
    btnSub.textContent = 'Create';
});
// click nút Edit tương tự nút Add
var btnEdits = document.getElementsByClassName('btn-edit');
for (var i = 0; i < btnEdits.length; i++) {
    btnEdits[i].addEventListener('click', function (event) {
        event.preventDefault();
        var pageCurrent = document.getElementsByClassName('active')[0];
        var pageNeedAdd = document.getElementsByClassName('not-active')[0];
        var btnSub = document.getElementById('btn-submit');
        pageCurrent.classList.add('not-active');
        pageCurrent.classList.remove('active');
        pageNeedAdd.classList.add('active');
        pageNeedAdd.classList.remove('not-active');
        btnSub.textContent = 'Update';
    });
}
//click nút exit để thoát khỏi form Edit hoặc form Thêm sản phẩm
//tương tự nút add
document.getElementById('btn-exit').addEventListener('click', function (event) {
    event.preventDefault();
    var pageCurrent = document.getElementsByClassName('active')[0];
    var pageNeedAdd = document.getElementsByClassName('not-active')[0];
    pageCurrent.classList.add('not-active');
    pageCurrent.classList.remove('active');
    pageNeedAdd.classList.add('active');
    pageNeedAdd.classList.remove('not-active');
    location.reload()
});
//click nút delete
var btnDelete = document.getElementsByClassName("btn-delete");
//vì có nhiều nút delete trên table nên dùng vòng lặp
for (var i = 0; i < btnEdits.length; i++) {
    btnDelete[i].addEventListener('click', function (event) {
        event.preventDefault();
        // Hiển thị hộp thoại xác nhận
        var confirmation = confirm("Bạn có muốn xóa hay không?");
        // Kiểm tra kết quả xác nhận
        if (confirmation) {
            // Xóa hoặc thực hiện hành động xóa ở đây
            console.log('Xóa');
        } else {
            // Người dùng đã chọn không xóa
            console.log('Không xóa');
        }
    });
}

//click item menu thì đổi màu nền
var itemMenus = document.getElementsByClassName('item');
var titleHeader = document.getElementById('title-menu-content');
for (var i = 0; i < itemMenus.length; i++) {
    (function (index) {
        itemMenus[index].addEventListener('click', function (event) {
            var title = itemMenus[index].innerText;
            titleHeader.innerText = title;
            // Loại bỏ lớp 'item-active' từ tất cả các mục itemTitle
            for (var j = 0; j < itemMenus.length; j++) {
                itemMenus[j].classList.remove('item-active');
                //đổi màu cho thẻ a
                itemMenus[j].querySelector('a').style.color = '#7282a9';
                //đổi màu cho icon
                itemMenus[j].querySelector('svg').style.fill = '#333';
            }
            // Thêm lớp 'item-active' cho mục được click
            itemMenus[index].classList.add('item-active');
            //đổi màu cho thẻ a
            itemMenus[index].querySelector('a').style.color = '#fff';
            //đổi màu cho icon
            itemMenus[index].querySelector('svg').style.fill = '#fff';
        });
    })(i);
}


