// 1. Lấy dữ liệu từ localStorage
const storedData = JSON.parse(localStorage.getItem('products')) || [];

// 2. Lấy tham chiếu đến bảng (table) trong HTML
const bodytable = document.querySelector('.bodyTable');

// 3. Lặp qua mỗi sản phẩm và tạo các dòng (rows) cho bảng
storedData.forEach(product => {
  const row = document.createElement('tr');
  row.classList.add('row-product-admin')
  // Tạo và thêm các ô (cells) vào dòng
  const idCell = document.createElement('td');
  idCell.textContent = product.idProduct;
  row.appendChild(idCell);

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
  priceCell.textContent = product.priceProduct;
  row.appendChild(priceCell);

  const detailCell = document.createElement('td');
  detailCell.textContent = product.detailProduct;
  row.appendChild(detailCell);



  var actionsCell = document.createElement('td');
  var editButton = document.createElement('button');
  editButton.classList.add('btn-edit', 'btn-ed');
  editButton.innerHTML = '<img src="./assets/icon/pen-to-square-regular (1).svg" width="15px" alt=""> Sửa';
  editButton.setAttribute('data-id', product.idProduct);
  
  var deleteButton = document.createElement('button');
  deleteButton.classList.add('btn-delete', 'btn-ed');
  deleteButton.innerHTML = '<img src="./assets/icon/trash.png" width="15px" alt=""> Xóa';
  deleteButton.setAttribute('data-id', product.idProduct);

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
  row.appendChild(actionsCell);


  var products = JSON.parse(localStorage.getItem('products')) || [];

  editButton.addEventListener('click', function(e) {
      // Lấy giá trị data-id từ nút
      var productId = this.getAttribute('data-id');
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
      var image = document.getElementById('Add-Image_product');
      // Lắng nghe và gán giá trị cho các trường input
      nameinput.value = updatedProduct.productName;
      price.value = parseInt(updatedProduct.priceProduct);
      detail.value = updatedProduct.detailProduct;
        
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
  });

  deleteButton.addEventListener('click', function(e){
      const productId = this.getAttribute('data-id');
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
      
  })
  
  // 4. Thêm dòng vào bảng
  bodytable.appendChild(row);
  
});


// phân trang 
const table = document.getElementsByClassName('table')[0];
var itemsPerPage = document.getElementById('selectNumRow').value; // Số mục trên mỗi trang
let currentPage = 1;
const rows = table.getElementsByClassName('bodyTable')[0].getElementsByTagName('tr');

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