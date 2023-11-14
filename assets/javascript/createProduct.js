var creaUpBtn = document.getElementById('btn-submit');
var addProductBtn = document.getElementById('add-product');

var id = document.getElementById('Add-id_product');
var nameinput = document.getElementById('Add-name_product');
var categorySelect = document.getElementById('select_category');
var price = document.getElementById('Add-price');
var detail = document.getElementById('Add-detail_Product');
var fileInput = document.getElementById('fileInput');
//localStorage.clear()

// Lắng nghe sự kiện 'DOMContentLoaded' sau khi tải lại trang
window.addEventListener("load", function() {
    //alert('ysss')
    var products = JSON.parse(localStorage.getItem('products'));
    // Kiểm tra xem dữ liệu 'products' có trong localStorage không
    if (products == null) {
      // Nếu không có dữ liệu 'products', tạo một danh sách mới với 5 sản phẩm
      const initialProducts = [
        {
            idProduct: '001',
            productName: 'Bàn xà cừ',
            category: 'phong_khach',
            priceProduct: 10000000,
            detailProduct: 'đây là bàn có chất liệu xà cừ rất đẹp',
            imageProduct: './assets/image/san-pham-moi-2021-5.jpg'
        },
        {
            idProduct: '002',
            productName: 'Giường ngủ lim',
            category: 'phong_ngu',
            priceProduct: 75000000,
            detailProduct: 'Giường ngủ gỗ lim quý hiếm',
            imageProduct: './assets/image/san-pham-moi-2021-5.jpg'
        },{
            idProduct: '003',
            productName: 'Tủ bếp cổ',
            category: 'phong_an',
            priceProduct: 30000000,
            detailProduct: 'Tủ bếp đời nhà Thanh',
            imageProduct: './assets/image/san-pham-moi-2021-5.jpg'
        },{
            idProduct: '004',
            productName: 'Cầu cá tra',
            category: 'phong_tam',
            priceProduct: 99999999,
            detailProduct: 'nhà vệ sinh quen thuộc của dân nông thôn',
            imageProduct: './assets/image/san-pham-moi-2021-5.jpg'
        },{
            idProduct: '005',
            productName: 'Ghế đẩu quý hiếm',
            category: 'phong_lamviec',
            priceProduct: 80000000,
            detailProduct: 'Ghế đẩu quý hiếm siêu đẹp',
            imageProduct: './assets/image/san-pham-moi-2021-5.jpg'
        }
      ];
  
      // Chuyển danh sách sản phẩm thành chuỗi JSON và lưu vào localStorage
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  
    // Bây giờ bạn có thể sử dụng dữ liệu 'products' trong localStorage
  });
var products = JSON.parse(localStorage.getItem('products')) || [];
//đọc hình ảnh dạng base64
var imageBase64;
fileInput.addEventListener("change", function (event) {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imageBase64 = e.target.result;
            //imageElement.src = imageBase64;
            //alert(imageBase64)
        };
        reader.readAsDataURL(selectedFile);
    }
});

creaUpBtn.addEventListener('click', function(e){  
    if(creaUpBtn.textContent === "Create"){
        
                var newProduct = {
                    idProduct: Date.now(),
                    productName: nameinput.value,
                    category: categorySelect.value,
                    priceProduct: parseInt(price.value),
                    detailProduct: detail.value,
                    imageProduct: imageBase64
                }
                console.log(newProduct)
                products.push(newProduct);
                localStorage.setItem('products', JSON.stringify(products));
                alert('Tạo mới thành công')
            
            location.reload()
    }

});