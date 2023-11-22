//table product
var products = JSON.parse(localStorage.getItem('products')) || [];
const bodytable = document.querySelector('.bodyTableProduct');
products.forEach(product => {
  const row = document.createElement('tr');
  row.classList.add('row-product-admin')
  row.innerHTML = `<td>` +product.idProduct+  `</td>
  <td>`+ product.productName + `</td>
  <td><img src="`+ product.imageProduct +`" width="80" alt="Hình ảnh sản phẩm"></td>
  <td>`+ product.priceProduct +`</td>
  <td>
    <button class="btn-edit btn-ed" data-id="`+ product.idProduct +`" fdprocessedid="vt1kwm" onclick = "editRow(this)">
      <img src="./assets/icon/pen-to-square-regular (1).svg" width="15px" alt=""> Sửa
    </button>
    <button class="btn-delete btn-ed" data-id="`+ product.idProduct +`" fdprocessedid="7v9vxi" onclick = "deleteRow(this)">
      <img src="./assets/icon/trash.png" width="15px" alt=""> Xóa
    </button>
  </td>`
  // 4. Thêm dòng vào bảng
  bodytable.appendChild(row);
  
});

function editRow(e) {
    // Lấy giá trị data-id từ nút
    var productId = e.getAttribute('data-id');
    var updatedProduct = products.find(product => product.idProduct == productId);
    console.log(updatedProduct)
    var pageCurrent = document.getElementsByClassName('active')[0];
    var pageNeedAdd = document.getElementsByClassName('not-active')[0];
    var btnSub = document.getElementById('btn-submit');
    pageCurrent.classList.add('not-active');
    pageCurrent.classList.remove('active');
    pageNeedAdd.classList.add('active');
    pageNeedAdd.classList.remove('not-active');
    btnSub.textContent = 'Update';

    //save image to base64
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
  
    var nameinput = document.getElementById('Add-name_product');
    var price = document.getElementById('Add-price');
    var detail = document.getElementById('Add-detail_Product');
    var category = document.getElementById('select_category');
    var image = document.getElementById('Add-Image_product');
    // Lắng nghe và gán giá trị cho các trường input
    nameinput.value = updatedProduct.productName;
    price.value = parseInt(updatedProduct.priceProduct);
    detail.value = updatedProduct.detailProduct;
    category.value = updatedProduct.category;
      
    btnSub.addEventListener('click', function() {
      
      // Cập nhật thông tin sản phẩm
      updatedProduct.productName = nameinput.value;
      updatedProduct.priceProduct = price.value;
      updatedProduct.detailProduct = detail.value;
      updatedProduct.imageProduct = imageBase64;

      
      // Cập nhật danh sách sản phẩm trong localStorage
      localStorage.setItem('products', JSON.stringify(products));

      alert('Cập nhật thành công');
      location.reload();
    });
};
function deleteRow(e){
    const productId = e.getAttribute('data-id');
    //const productIdToDelete = e.target.getAttribute('data-id');
    const ProductsAfterDelete = products.filter(product => product.idProduct != productId);
    var result = confirm("Bạn có thật sự muốn xóa không?")
    if(result){
      if(ProductsAfterDelete.length<products.length){
          localStorage.setItem('products', JSON.stringify(ProductsAfterDelete));
          alert('Sản phẩm đã được xóa')
        } else alert('không tìm thấy sản phẩm cần xóa')
      location.reload();
    }
    
}

// table user
var users = JSON.parse(localStorage.getItem('users')) || [];
var bodytableUser = document.getElementsByClassName('bodyTableUser')[0];
users.forEach(u => {
    if(u.isAdmin == 0){
        const row = document.createElement('tr');
        row.classList.add('row-product-admin')
        row.innerHTML = `<td>` +u.loginName+  `</td>
        <td>`+ u.userName + `</td>
        <td>`+ u.address +`</td>
        <td>`+ u.telephone +`</td>`
        // 4. Thêm dòng vào bảng
        bodytableUser.appendChild(row);
    }
});

// table Đơn hàng
var Orders = JSON.parse(localStorage.getItem('bills')) || [];
var bodytableOrder = document.getElementsByClassName('bodyTableOrder')[0];
Orders.forEach(u => {
    const row = document.createElement('tr');
    row.classList.add('row-product-admin')
    row.innerHTML = `<td>` +u.idBill+  `</td>
    <td>`+ u.user + `</td>
    <td>`+ u.date +`</td>
    <td><input type="checkbox" name=""></td>`
    // 4. Thêm dòng vào bảng
    bodytableOrder.appendChild(row);
});

// ẩn hiện bảng user và product
let currentPage = 1;
var table = document.getElementsByClassName('tableProduct')[0];
var rows = table.getElementsByClassName('bodyTableProduct')[0].getElementsByTagName('tr');

var proTable = document.getElementById('contain_tableProduct');
var userTable = document.getElementById('contain_tableUser');
var orderTable = document.getElementById('contain_tableOrder');
var tkTable = document.getElementById('contain_tableTK');
document.getElementById('productTable').addEventListener('click', function(e){ 
    proTable.style.display = 'block';
    userTable.style.display = 'none';
    orderTable.style.display = 'none';
    tkTable.style.display = 'none';
    table = document.getElementsByClassName('tableProduct')[0];
    rows = table.getElementsByClassName('bodyTableProduct')[0].getElementsByTagName('tr');
    showPage(currentPage);
})
document.getElementById('userTable').addEventListener('click', function(e){
    proTable.style.display = 'none';
    orderTable.style.display = 'none';
    userTable.style.display = 'block';
    tkTable.style.display = 'none';
    table = document.getElementsByClassName('tableUser')[0];
    rows = table.getElementsByClassName('bodyTableUser')[0].getElementsByTagName('tr');
    showPage(currentPage);
})
document.getElementById('orderTable').addEventListener('click', function(e){
    proTable.style.display = 'none';
    orderTable.style.display = 'block';
    userTable.style.display = 'none';
    tkTable.style.display = 'none';
    table = document.getElementsByClassName('tableOrder')[0];
    rows = table.getElementsByClassName('bodyTableOrder')[0].getElementsByTagName('tr');
    showPage(currentPage);
})
document.getElementById('tkTable').addEventListener('click', function(e){

    proTable.style.display = 'none';
    orderTable.style.display = 'none';
    userTable.style.display = 'none';
    tkTable.style.display = 'block';
    table = document.getElementsByClassName('tableTK')[0];
    rows = table.getElementsByClassName('bodyTableTK')[0].getElementsByTagName('tr');
    showPage(currentPage);
})


// phân trang 
var itemsPerPage = document.getElementById('selectNumRow').value; // Số mục trên mỗi trang

function showPage(page) {
    
    for (let i = 0; i < rows.length; i++) {
        if (i < (page - 1) * itemsPerPage || i >= page * itemsPerPage) {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = '';
        }
    }
    listPage()
}

function listPage(){
    let count = Math.ceil(rows.length / itemsPerPage);
    document.querySelector('.listPage').innerHTML = '';

    console.log(rows.length);
    console.log(itemsPerPage);
    if(currentPage != 1){
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (currentPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }
    console.log(count);
    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == currentPage){
            newPage.classList.add('active');
        }
            newPage.setAttribute('onclick', "changePage(" + i + ")");
            document.querySelector('.listPage').appendChild(newPage);
    }

    if(currentPage != count){
        let next = document.createElement('li');
        next.innerHTML = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (currentPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    currentPage = i;
    showPage(currentPage);
}
document.getElementsByClassName('contain_select_numRow')[0].addEventListener('change', () => {
    itemsPerPage = document.getElementById('selectNumRow').value;
    showPage(currentPage);
})
// Hiển thị trang đầu tiên khi tải trang
showPage(currentPage);
