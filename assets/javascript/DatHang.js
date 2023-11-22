var btnDatHang = document.getElementById("btn_datHang");
var productFromLocal = JSON.parse(localStorage.getItem("products")) || [];
var login = JSON.parse(localStorage.getItem("login"));
var users = JSON.parse(localStorage.getItem("users"));
var bills = JSON.parse(localStorage.getItem("bills")) || [];

if (login.isLogin === 1) {
  var u = users.find((user) => user.loginName === login.nameLogin);

  window.addEventListener("load", displayOrdersFromLocalStorage);

  btnDatHang.addEventListener("click", function () {
    var currentDate = new Date();
    var productsInBill = Array.from(
      document.getElementsByClassName("show_product")
    ).map((productInBag) => {
      var idPro = productInBag.querySelector(".idProInBag").textContent;
      var qualityProduct = productInBag.querySelector(".quality_input").value;

      var product = productFromLocal.find((p) => p.idProduct === idPro);

      return {
        idPro: product.idProduct,
        productName: product.productName,
        picture: product.imageProduct,
        category: product.category,
        pricePro: product.priceProduct,
        qualityPro: qualityProduct,
        date: currentDate.toLocaleDateString(),
      };
    });

    var newBill = {
      idBill: Date.now(),
      user: login.nameLogin,
      checkByAdmin: 0,
      date: currentDate.toLocaleDateString(),
      detailBill: productsInBill,
      address: u.address,
      sdt: u.telephone,
    };

    bills.push(newBill);
    localStorage.setItem("bills", JSON.stringify(bills));
    updateUIWithNewOrder(newBill);
  });

  function updateTotalAmount() {
    var totalAmount = bills.reduce((total, bill) => {
      return (
        total +
        bill.detailBill.reduce((subtotal, product) => {
          return subtotal + product.qualityPro * product.pricePro;
        }, 0)
      );
    }, 0);

    document.getElementById("money").textContent = totalAmount + "đ";
  }

  updateTotalAmount();

  function updateUIWithNewOrder(newOrder) {
    var containerDonhang = document.getElementById("donhang");
    var donHangCounter = containerDonhang.children.length + 1;

    var donHang = document.createElement("div");
    donHang.innerHTML = `
      <div>
        <div class="idDonhang" style="display: none;">${newOrder.idBill}</div>
        <a href="#!" class="donhangItem"  onclick="showDonHang(this)">Đơn hàng ${donHangCounter}</a>
      </div>
    `;

    containerDonhang.appendChild(donHang);
  }

  function displayOrdersFromLocalStorage() {
    var containerDonhang = document.getElementById("donhang");

    containerDonhang.innerHTML = "";
    bills.forEach(function (bill) {
      var donHang = document.createElement("div");
      donHang.innerHTML = `
        <div>
          <div class="idDonhang" style="display: none;">${bill.idBill}</div>
          <a href="#!" class="donhangItem" style="color:red" onclick="showDonHang(this)">Đơn hàng ${
            containerDonhang.children.length + 1
          }</a>
        </div>
      `;
      containerDonhang.appendChild(donHang);
    });
  }

  var boxDonHang = document.querySelector(".productBag");

  function showDonHang(clickedElement) {
    var id = clickedElement.parentNode.querySelector(".idDonhang").textContent;
    var bill = bills.find((b) => b.idBill == id);

    var billHTML = document.createElement("div");
    billHTML.classList.add("containerBillProduct");

    billHTML.innerHTML = `
      <div>
        <button class="btnClose" onclick="closeContainer(this)">X</button>
        <header>
          <h2>Nội Thất Toàn Cầu</h2>
          <h3>Đơn hàng</h3>
          <p class="dateP">Ngày: ${bill.date}</p>
        </header>
        <p>Tên khách hàng: ${bill.user}</p>
        <p>Địa chỉ: ${bill.address}</p>
        <p>SĐT: ${bill.sdt}</p>
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
    var nenDen = document.getElementById("nen-den");
    nenDen.style =
      "display: block; z-index: 0; position: fixed; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.5);";

    var tbody = billHTML.querySelector("tbody");

    bill.detailBill.forEach(function (product) {
      var productRow = document.createElement("tr");
      productRow.innerHTML = `
        <td>${product.idPro}</td>
        <td>${product.qualityPro}</td>
        <td>${product.pricePro}</td>
      `;
      tbody.appendChild(productRow);
    });

    var totalAmount = bill.detailBill.reduce((total, product) => {
      return total + product.qualityPro * product.pricePro;
    }, 0);

    billHTML.querySelector("#totalAmount").textContent = totalAmount;
    boxDonHang.appendChild(billHTML);
  }

  function closeContainer(clickedElement) {
    var containerBillProduct = clickedElement.closest(".containerBillProduct");
    if (containerBillProduct) {
      containerBillProduct.style.display = "none";
      nenDen.style = "display: block;";
    }
  }
}
