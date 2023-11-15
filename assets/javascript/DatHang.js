var btnDatHang = document.getElementById('btn_datHang');
var productFromLocal = JSON.parse(localStorage.getItem('products')) || []
var login = JSON.parse(localStorage.getItem('login'));
var users = JSON.parse(localStorage.getItem('users'));
var bills = JSON.parse(localStorage.getItem('bills')) || []


btnDatHang.addEventListener('click', function(){
    var productsInBag = document.getElementsByClassName('show_product');
    var productsInBill = [];
    for(var i=0; i<productsInBag.length; i++){
        var idPro = productsInBag[i].querySelector('.idProInBag').textContent;
        var qualityProduct = productsInBag[i].querySelector('.quality_input').value;
        for(var j=0; j<productFromLocal.length; j++){
            if(productFromLocal[j].idProduct == idPro){
                var detail = {
                    idPro: productFromLocal[j].idProduct,
                    pricePro: productFromLocal[j].priceProduct,
                    qualityPro: qualityProduct
                }
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
        detailBill: productsInBill
    }
    bills.push(Bill);
    localStorage.setItem('bills', JSON.stringify(bills));
    
})
//tạo div để khi nhấn vào show đơn hàng
var containerDonhang = document.getElementById('donhang')
for(var i=0; i<bills.length; i++){
    var donHang = document.createElement('div');
    donHang.innerHTML = `
    <div onclick = "showDonHang(this)">
        <div class="idDonhang" style="display: none;"></div>
            <a href="#!" class="donhangItem" >
        </a>
    </div>
    `;
    donHang.querySelector('.donhangItem').textContent = "Đơn hàng "+i;
    donHang.querySelector('.idDonhang').textContent = bills[i].idBill;
    containerDonhang.appendChild(donHang)
}

var boxDonHang = document.getElementsByClassName('productBag')[0];

function showDonHang(d){
    // lấy id của đơn hàng
    var id = d.querySelector('.idDonhang').textContent;
    for(var i=0; i<bills.length; i++){
        // so sánh đơn hàng
        if(bills[i].idBill == d.querySelector('.idDonhang').textContent){

            // tạo bill để show đơn hàng
            var billHTML = document.createElement('div');
            billHTML.innerHTML=`
            <div class="containerBillProduct" style="position:absolute; top:25%; left: 50%; z-index=1000; width: 200px; height: 250px; background-color: #ccc;">
                <div class="nameProduct">
                    
                </div>
                <div class="totalPrice">
                    
                </div>
            </div>
            `
            // thêm id của sản phẩm đầu tiên (cái này cần sửa lại để lặp all sản phẩm)
            billHTML.querySelector('.nameProduct').textContent = bills[i].detailBill[0].idPro
            boxDonHang.appendChild(billHTML);
        }
        console.log(billHTML)
        break;
    }
}



