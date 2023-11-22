// Hàm chuyển đổi ngày thành định dạng "dd/mm/yyyy"
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Bắt sự kiện click của nút "Thống kê"
document.getElementById('filterButton').addEventListener('click', function () {
    // Gọi hàm thực hiện việc lọc và hiển thị sản phẩm
    displayProducts();
});

// Hàm lọc và hiển thị sản phẩm
function displayProducts() {
    // Lấy giá trị từ các trường ngày và loại sản phẩm
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var selectedProductType = document.getElementById("productType").value;

    // Lấy dữ liệu từ localStorage
    var Statistique = JSON.parse(localStorage.getItem('bills')) || [];
    var bodyTableStatis = document.getElementById("bodyTableStatis");
    bodyTableStatis.innerHTML = "";

    // Sử dụng đối tượng để theo dõi thông tin của từng sản phẩm
    const productTotals = {};

    Statistique.forEach(order => {
        order.detailBill.forEach(product => {
            const productDate = new Date(product.dateSold);
            const isTypeMatch = selectedProductType === "" || selectedProductType === product.category;

            if (productDate >= startDate && productDate <= endDate && isTypeMatch) {
                if (productTotals[product.productName]) {
                    // Nếu sản phẩm đã tồn tại, cộng thêm số lượng và giá
                    productTotals[product.productName].quantity += parseInt(product.quantityPro);
                    productTotals[product.productName].totalPrice += product.pricePro * parseInt(product.quantityPro);

                    // Kiểm tra và cập nhật ngày bán mới nhất
                    const latestDateSold = new Date(productTotals[product.productName].latestDateSold);
                    if (productDate > latestDateSold) {
                        productTotals[product.productName].latestDateSold = product.dateSold;
                    }
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
                    productTotals[product.productName] = {
                        quantity: parseInt(product.quantityPro),
                        totalPrice: product.pricePro * parseInt(product.quantityPro),
                        latestDateSold: product.dateSold,
                        picture: product.picture
                    };
                }
            }
        });
    });

    // Hiển thị thông tin đã thống kê lên bảng
    Object.keys(productTotals).forEach(productName => {
        const product = productTotals[productName];
        const row = document.createElement('tr');
        row.classList.add('row-product-admin');
        row.innerHTML = `<td>${productName}</td>
            <td><img src="${product.picture}" width="80" alt="Hình ảnh sản phẩm"></td>
            <td>${formatDate(new Date(product.latestDateSold))}</td>
            <td>${product.quantity}</td>
            <td>${product.totalPrice}</td>`;
        bodyTableStatis.appendChild(row);
    });
}
