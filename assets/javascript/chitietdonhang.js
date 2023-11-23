
var bills = JSON.parse(localStorage.getItem("bills")) || [];

document.addEventListener("DOMContentLoaded", function() {
    const seeButton = document.getElementById("seeButton");
    seeButton.addEventListener("click", filterData);
    displayDetail();
});


function displayDetail() {
    const danhsach = document.getElementsByClassName("danhsach")[0];
    const ds_header = document.createElement("ul");
    
    //HEADER BAO CẢ DANH SÁCH
    ds_header.className = "danhsach-header";
    ds_header.innerHTML = `
        <li style="width:150px;">ID</li>
        <li style="width:200px;">Khách hàng</li>
        <li style="width:100px;">Ngày lập</li>
        <li style="width:80px; text-align:center;">Trạng thái</li>
        <li style="width:100px; float:right; text-align:right;"></li>
    `;
    danhsach.appendChild(ds_header);

    const ds_chitiet = document.createElement("div");
    ds_chitiet.className = "danhsach-chitiet";

    for (var i = 0; i < bills.length; i++) {
        //ĐỔ DỮ LIỆU CỦA TỪNG ĐƠN HÀNG RA DOCUMENT
        const ds_item = document.createElement("ul");
        ds_item.className = "danhsach-item";
        ds_item.innerHTML = `
            <li style="width:150px;">${bills[i].idBill}</li>
            <li style="width:200px;">${bills[i].user}</li>
            <li style="width:100px;">${bills[i].date}</li>
            <li style="width:80px; text-align:center;">
                <img class="imgTrangThai" name="imgTrangThai${i + 1}" id="imgTrangThai${i + 1}" src="assets/icon/check.png" alt="" width="16" height="16" data-code="1"/>
            </li>
            <li style="width:100px; float:right; text-align:right;">
                <a class="lnkSua lnkChiTiet" name="btnChiTiet${i + 1}" id="btnChiTiet${i + 1}" data-id="${i + 1}" data-trangthai="0" title="Xem chi tiết" href="#">Chi tiết</a>
            </li>
        `;

        //Nút chi tiết ẩn hiện danh sách đặt hàng
        const chiTietButton = ds_item.querySelector('.lnkChiTiet');
        chiTietButton.addEventListener('click', function (event) {
            event.preventDefault();
            const customerId = this.getAttribute('data-id');
            const chiTietDonHang = document.getElementById('chiTietDonHang' + customerId);
            chiTietDonHang.style.display = chiTietDonHang.style.display === 'block' ? 'none' : 'block';
        });

        //Nút tích xanh báo trạng thái đơn hàng
        const imgTrangThai = ds_item.querySelector('.imgTrangThai');
        const imgSrc = bills[i].checkByAdmin === 1 ? 'assets/icon/check.png' : 'assets/icon/delete.png';
        imgTrangThai.src = imgSrc;

        ds_chitiet.appendChild(ds_item);

        const ds_subitem = document.createElement("div");
        ds_subitem.className = "danhsach-subitem"
        ds_subitem.id = "chiTietDonHang" + (i + 1);


        //HEADER CHO TỪNG LOẠI HÀNG ĐÃ ĐẶT CỦA KHÁCH
        const ds_subitem_header = document.createElement("ul");
        ds_subitem_header.className = "danhsach-subitem-header";
        ds_subitem_header.innerHTML = `
            <li style="width:150px;">ID Sản phẩm</li>
            <li style="width:200px;">Tên sản phẩm</li>
            <li style="width:100px;">Số lượng</li>
            <li style="width:130px;">Đơn giá</li>
            <li style="width:200px;">Tổng tiền</li>
        `;
        ds_subitem.appendChild(ds_subitem_header);

        for (var j = 0; j < bills[i].detailBill.length; j++) {
            //ĐỔ DỮ LIỆU NHỮNG LOẠI MẶT HÀNG KHÁCH ĐÃ ĐẶT (CHI TIẾT HÓA ĐƠN)
                var sumPrice = bills[i].detailBill[j].quantityPro * bills[i].detailBill[j].pricePro;
                const ds_subitem_item = document.createElement("div");
                ds_subitem_item.className = "danhsach-subitem-item"
                ds_subitem_item.innerHTML = `
                    <li style="width:150px;">${bills[i].detailBill[j].idPro}</li>
                    <li style="width:200px;">${bills[i].detailBill[j].productName}</li>
                    <li style="width:100px;">${bills[i].detailBill[j].quantityPro}</li>
                    <li style="width:130px;">${bills[i].detailBill[j].pricePro}</li>
                    <li style="width:200px;">${sumPrice}</li>
                `;
                ds_subitem.appendChild(ds_subitem_item);
        }
        ds_chitiet.appendChild(ds_subitem);
    }
    danhsach.appendChild(ds_chitiet);
}

//LỌC DANH SÁCH VÀ THỐNG KÊ
function filterData() {
    const startDay = new Date(document.getElementById("startDay").value);
    const endDay = new Date(document.getElementById("endDay").value);

    // Reset the counters
    checked = 0;
    unchecked = 0;
    countBill = 0;
    sumProfit = 0;

    // Calculate statistics based on the selected date range
    for (let i = 0; i < bills.length; i++) {
        const orderDate = new Date(bills[i].date);

        const itemElement = document.getElementsByClassName('danhsach-item')[i];
        const itemElement2 = document.getElementsByClassName('danhsach-subitem')[i];

        //Ẩn hiện danh sách trong 1 khoảng thời gian
        if (orderDate >= startDay && orderDate <= endDay) {
            itemElement.classList.add('showOrder');
        } else {
            itemElement.classList.remove('showOrder');
            itemElement2.classList.remove('showOrder');
        }

        if (orderDate >= startDay && orderDate <= endDay) {
            countBill++;
    
            const status = document.getElementById(`imgTrangThai${i + 1}`).getAttribute('data-code');
            if (status === '1') {
                checked++;
                //sumProfit = sumProfit; nếu đơn hàng chưa xử lý thì không tính thêm doanh thu
            } else {
                unchecked++;
            }
        }
    }

    //Display the calculated statistics
    // const resultElement = document.getElementById("result");
    // resultElement.innerHTML = `
    //     <p>Từ ${startDay.toLocaleDateString()} đến ${endDay.toLocaleDateString()}</p>
    //     <p>Số lượng đơn hàng: ${countBill}</p>
    //     <p>Số lượng đơn hàng đã xử lý: ${checked}</p>
    //     <p>Số lượng đơn hàng chưa xử lý: ${unchecked}</p>
    //     <p>Tổng doanh thu: ${sumProfit}vnd</p>
    // `;
}
