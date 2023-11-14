// 1. Lấy dữ liệu từ localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];
//
// 2. Chọn phần tử chứa sản phẩm trong trang web
const productContainer = document.querySelector('.contaner-product');

var check=0;


// tìm kiếm theo tên
var searchBtn = document.getElementsByClassName('a-search')[0];
searchBtn.addEventListener('click', function(){
  productContainer.innerHTML = '';
  var nameWantSearch = document.getElementsByClassName('searching')[0].value;
  var priceStart = document.getElementById('priceStart').value;
  var priceEnd = document.getElementById('priceEnd').value;
  var mangTimKiem = [];
  products.forEach(p => {
    var price = p.priceProduct;
    var nameProLowerCase = p.productName.toLowerCase();
    var nameSearchLowerCase = nameWantSearch.toLowerCase();
      if(nameProLowerCase.indexOf(nameSearchLowerCase) !== -1 && price >= priceStart && price <= priceEnd){
        mangTimKiem.push(p);
      }
  })
  loadProduct(mangTimKiem)
  check=1;
})

// lọc theo khoảng giá
var filterBtn = document.getElementsByClassName('filter')[0];
filterBtn.addEventListener('click', function(){
  productContainer.innerHTML = '';
  var priceStart = document.getElementById('priceStart').value;
  var priceEnd = document.getElementById('priceEnd').value;
  var mangTimKiem = [];
  products.forEach(p => {
    var price = p.priceProduct;
      if(price >= priceStart && price <= priceEnd){
        mangTimKiem.push(p);
      }
  })
  loadProduct(mangTimKiem)
  check=1;
})
// hiển thị sản phẩm theo phân loại
var categoryMenu = document.getElementsByClassName('category_menu');
    for(var j=0; j<categoryMenu.length; j++){
        categoryMenu[j].addEventListener('click', function(){
          productContainer.innerHTML = ''
          var listOfCategory = [];
          var categoryID = this.id;
          products.forEach(p => {
            if(p.category == categoryID){
              listOfCategory.push(p);
            }
          })
          check = 1;
          loadProduct(listOfCategory)
        })
    }

// nếu không lọc không phân loại
if(check==0){
  loadProduct(products)
}


    

function loadProduct(p){
  p.forEach(item => {
  var productItem = document.createElement('div');
  productItem.className = 'product';
  productItem.innerHTML = `<div class="box-product">
  <a href="#!" class="product">
      <img src="" alt="">
      <a href="#!" class="add-bag" onclick = "addProductToBag(this)">
          Thêm vào giỏ hàng
          <div class="idProduct" style="display: none;"></div>
      </a>
      <div class="product-detail">
          <h3 class="product-name">Mẫu salon cho phòng khách - TC038</h3>
          <div class="product-price">
              <span class="price">65.000.000 đ</span>
          </div>
          <div class="category" style="display: none;"></div>
          <div class="ratings">
              o o o o o (1 Đánh giá)
          </div>
      </div>
  </a>
</div>`;
  productItem.querySelector('img').src = item.imageProduct;
  productItem.querySelector('.product-name').textContent = item.productName;
  productItem.querySelector('.price').textContent = item.priceProduct;
  productItem.querySelector('.idProduct').textContent = item.idProduct;
  productItem.querySelector('.category').textContent = item.category;
  
  productContainer.appendChild(productItem);
  })
  
}

// thêm vào giỏ hàng
function addProductToBag(productItem) {
  const login = JSON.parse(localStorage.getItem('login'));
  if(login.isLogin == 0) {alert('Vui lòng đăng nhập trước khi mua hàng')}
  else {
  var product = productItem.querySelector('.idProduct');
  var idText = product.textContent;
  var users = JSON.parse(localStorage.getItem('users'));

  console.log(product)
  users.forEach(u => {
      var check=0;
      if(login.nameLogin == u.loginName) {
          u.userBag.forEach(b => {
              if(b.idProduct == idText){
                  b.quality++;
                  check=1;
                  return;
              }
          })
          if(check==0){
              var currentDate = new Date();

              var newBag = {
                              idProduct: idText,
                              quality: 1,
                              checkByAdmin: 0,
                              dateBuy: currentDate.toLocaleDateString()
                          };
              
              u.userBag.push(newBag);
          }
          
      }
  });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Thêm vào giỏ hàng thành công')
  location.reload()
  }
  
}