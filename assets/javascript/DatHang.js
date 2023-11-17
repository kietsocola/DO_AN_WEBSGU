var btnDatHang = document.getElementById("btn_datHang");
var productFromLocal = JSON.parse(localStorage.getItem("products")) || [];
var login = JSON.parse(localStorage.getItem("login"));
var users = JSON.parse(localStorage.getItem("users"));
var bills = JSON.parse(localStorage.getItem("bills")) || [];

if (login.isLogin == 1) {
  var u;
  for (varr = i = 0; i < users.length; i++) {
    if (login.nameLogin == users[i].loginName) {
      u = users[i];
      console.log(u);
      break;
    }
  }

  btnDatHang.addEventListener("click", function () {
    var productsInBag = document.getElementsByClassName("show_product");
    var productsInBill = [];
    for (var i = 0; i < productsInBag.length; i++) {
      var idPro = productsInBag[i].querySelector(".idProInBag").textContent;
      var qualityProduct =
        productsInBag[i].querySelector(".quality_input").value;
      for (var j = 0; j < productFromLocal.length; j++) {
        if (productFromLocal[j].idProduct == idPro) {
          var detail = {
            idPro: productFromLocal[j].idProduct,
            pricePro: productFromLocal[j].priceProduct,
            qualityPro: qualityProduct,
          };
          productsInBill.push(detail);
        }
      }
    }

    //tạo data để úp lên local
    var currentDate = new Date();
    var Bill = {
      idBill: Date.now(),
      user: login.nameLogin,
      checkByAdmin: 0,
      date: currentDate.toLocaleDateString(),
      detailBill: productsInBill,
      address: u.address,
      sdt: u.telephone,
    };
    bills.push(Bill);
    localStorage.setItem("bills", JSON.stringify(bills));
  });

  function updateTotalAmount() {
    // Move totalAmount declaration outside the loop
    var totalAmount = 0;

    for (var i = 0; i < bills.length; i++) {
      // Tính tổng tiền (đã giả sử bạn đã có biến totalAmount)
      totalAmount += bills[i].detailBill.reduce((total, product) => {
        return total + product.qualityPro * product.pricePro;
      }, 0);
    }

    // Cập nhật nội dung của phần tử có id là 'money'
    var moneyElement = document.getElementById("money");
    moneyElement.textContent = totalAmount + "đ";
  }

  // Gọi hàm để cập nhật tổng tiền khi cần thiết
  updateTotalAmount();

  var containerDonhang = document.getElementById("donhang");
  var donHangCounter = 1; // Biến tăng giá trị duy nhất

  for (var i = 0; i < bills.length; i++) {
    var donHang = document.createElement("div");
    donHang.innerHTML = `
    <div>
      <div class="idDonhang" style="display: none;"></div>
      <a href="#!" class="donhangItem" style="color:red" onclick="showDonHang(this)">Đơn hàng ${donHangCounter++}</a>
    </div>
  `;
    donHang.querySelector(".idDonhang").textContent = bills[i].idBill;
    containerDonhang.appendChild(donHang);
  }

  var boxDonHang = document.getElementsByClassName("productBag")[0];

  function showDonHang(clickedElement) {
    // Lấy id của đơn hàng từ phần tử được click
    var id = clickedElement.parentNode.querySelector(".idDonhang").textContent;
    for (var i = 0; i < bills.length; i++) {
      // So sánh id đơn hàng
      if (bills[i].idBill == id) {
        // Tạo bill để show đơn hàng
        var billHTML = document.createElement("div");
        billHTML.classList.add("containerBillProduct"); // Thêm class cho styling
        billHTML.innerHTML = `
        <div>
        <button class="btnClose" onclick="closeContainer(this)">X</button>
          <header>
          <h2>Nội Thất Toàn Cầu</h2>
          <h3>Đơn hàng</h3>
          <p class="dateP">Ngày: ${bills[i].date}</p>
          </header>
          <p>Tên khách hàng: ${bills[i].user}</p>
          <p>Địa chỉ: ${bills[i].address}</p>
          <p>SĐT: ${bills[i].sdt}</p>
          <p>Ghi chú:</p>
          <table class="custom-table" cellspacing="0" cellpadding="10px" style="width:100%">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>SL</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <p>Tổng tiền: <span id="totalAmount">0</span></p>
        </div>
      `;

        var tbody = billHTML.querySelector("tbody");

        // Thêm thông tin sản phẩm vào bảng trong form
        for (var j = 0; j < bills[i].detailBill.length; j++) {
          var productRow = document.createElement("tr");
          productRow.innerHTML = `
              <td>${bills[i].detailBill[j].idPro}</td>
              <td>${bills[i].detailBill[j].qualityPro}</td>
              <td>${bills[i].detailBill[j].pricePro}</td>
            `;
          tbody.appendChild(productRow);
        }

        // Tính tổng tiền và hiển thị
        var totalAmount = bills[i].detailBill.reduce((total, product) => {
          return total + product.qualityPro * product.pricePro;
        }, 0);

        var totalAmountElement = billHTML.querySelector("#totalAmount");
        totalAmountElement.textContent = totalAmount;
        boxDonHang.appendChild(billHTML);
        break;
      }
    }
  }

  // Hàm ẩn đi containerBillProduct khi bấm vào btn X
  function closeContainer(clickedElement) {
    // Lấy phần tử .containerBillProduct chứa nút đóng X được click
    var containerBillProduct = clickedElement.closest(".containerBillProduct");
    if (containerBillProduct) {
      containerBillProduct.style.display = "none";
    }
  }
}
