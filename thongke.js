var id = document.getElementById('Add-id_product');
var nameinput = document.getElementById('Add-name_product');
var categorySelect = document.getElementById('select_category');
var price = document.getElementById('Add-price');
var amount = document.getElementById('Add-amount-Product');
var fileInput = document.getElementById('fileInput');
//localStorage.clear()

// Lắng nghe sự kiện 'DOMContentLoaded' sau khi tải lại trang
window.addEventListener("load", function () {
    //alert('ysss')
    var products = JSON.parse(localStorage.getItem('products'));
    // Kiểm tra xem dữ liệu 'products' có trong localStorage không
    if (products == null) {
        // Nếu không có dữ liệu 'products', tạo một danh sách mới với 5 sản phẩm
        const initialProducts = [
            {
                productName: 'Bàn xà cừ',
                category: 'phong_khach',
                priceProduct: 10000000,
                amountProduct: 2,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-02'
            },
            {
                productName: 'Giường ngủ lim',
                category: 'phong_ngu',
                priceProduct: 7500000,
                amountProduct: 1,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-05'
            }, {
                productName: 'Tủ bếp cổ',
                category: 'phong_an',
                priceProduct: 3000000,
                amountProduct: 10,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-08'
            }, {
                productName: 'Cầu cá tra',
                category: 'phong_tam',
                priceProduct: 1500000,
                amountProduct: 5,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-16'
            }, {
                productName: 'Ghế đẩu quý hiếm',
                category: 'phong_lamviec',
                priceProduct: 800000,
                amountProduct: 3,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-21'
            }, {
                productName: 'Bàn xà cừ',
                category: 'phong_khach',
                priceProduct: 10000000,
                amountProduct: 1,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-25'
            }, {
                productName: 'Bàn gỗ lim',
                category: 'phong_khach',
                priceProduct: 5000000,
                amountProduct: 2,
                imageProduct: './image/san-pham-moi-2021-5.jpg',
                dateSold: '2023-11-03'
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

var filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', displayProducts);

function displayProducts() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const productTypeFilter = document.getElementById("productType").value;

    const bodyTable = document.getElementById("bodyTable");
    bodyTable.innerHTML = "";

    // Sử dụng một đối tượng để theo dõi tổng giá và tổng số lượng của từng tên sản phẩm
    const productTotals = {};

    products
        .filter(product => {
            const productDate = new Date(product.dateSold);
            const isTypeMatch = productTypeFilter === "" || productTypeFilter === product.category;
            return productDate >= startDate && productDate <= endDate && isTypeMatch;
        })
        .forEach(product => {
            const productName = product.productName;

            // Nếu sản phẩm đã tồn tại trong danh sách, cộng thêm số lượng và giá
            if (productTotals[productName]) {
                productTotals[productName].quantity += product.amountProduct;
                productTotals[productName].totalPrice += product.priceProduct * product.amountProduct;

                // Kiểm tra và cập nhật ngày bán mới nhất
                const productDate = new Date(product.dateSold);
                const latestDateSold = new Date(productTotals[productName].latestDateSold);

                if (productDate > latestDateSold) {
                    productTotals[productName].latestDateSold = product.dateSold;
                }
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
                productTotals[productName] = {
                    ...product,
                    quantity: product.amountProduct,
                    totalPrice: product.priceProduct * product.amountProduct,
                    latestDateSold: product.dateSold
                };
            }
        });

    // Log giá trị của products và productTotals để kiểm tra
    console.log("Products:", products);
    console.log("Product Totals:", productTotals);

    // Hiển thị danh sách sản phẩm
    Object.values(productTotals).forEach(product => {
        const row = document.createElement('tr');
        row.classList.add('row-product-admin')
        // Tạo và thêm các ô (cells) vào dòng
        const nameCell = document.createElement('td');
        nameCell.textContent = product.productName;
        row.appendChild(nameCell);

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = product.imageProduct;
        image.width = 80;
        image.alt = 'Hình ảnh sản phẩm';
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.totalPrice;
        row.appendChild(priceCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = product.quantity;
        row.appendChild(amountCell);

        const dateSoldCell = document.createElement('td');
        dateSoldCell.textContent = product.latestDateSold;
        row.appendChild(dateSoldCell);

        // 4. Thêm dòng vào bảng
        bodyTable.appendChild(row);
    });
}


