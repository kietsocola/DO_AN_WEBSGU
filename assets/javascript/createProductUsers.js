window.addEventListener("load", function() {
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
  
  });