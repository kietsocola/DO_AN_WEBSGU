//Tạo đối tượng dssv từ lớp đối tượng DanhSachSinhVien
var dssv = new DanhSachSinhVien();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinSV() {
  //DOM tới các thẻ input lấy value
  var _maSV = getEle("txtMaSV").value;
  var _tenSV = getEle("txtTenSV").value;
  var _email = getEle("txtEmail").value;
  var _matKhau = getEle("txtPass").value;
  var _ngaySinh = getEle("txtNgaySinh").value;
  var _khoaHoc = getEle("khSV").value;
  var _diemToan = getEle("txtDiemToan").value;
  var _diemLy = getEle("txtDiemLy").value;
  var _diemHoa = getEle("txtDiemHoa").value;
  var _gia = getEle("txtGia").value * 1;

  var sv = new SinhVien(
    _maSV,
    _tenSV,
    _email,
    _matKhau,
    _ngaySinh,
    _khoaHoc,
    _diemToan,
    _diemLy,
    _diemHoa,
    _gia
  );

  //tinh DTB
  sv.tinhDTB();

  return sv;
}

/**
 * Them SV
 */
function themSinhVien() {
  var sv = layThongTinSV();
  // kiểm tra nếu sv là null sẽ không thêm vào mảng
  if (sv) {
    //Thêm sv vào danh sách => gọi tới method _themSV từ ldt DanhSachSinhVien
    dssv._themSV(sv);

    //render dssv.arr ra UI
    renderListSV(dssv.arr);

    setLocalStorage();
  }
}

function renderListSV(data) {
  /**
   * 0. tao biến content = ""
   * 1. Duyệt mảng data
   *    1.1. tao bien sv = data[i]
   *    1.2. tạo dòng tích luỹ vô biến content
   *    1.3. tạo cột => đổ data vào cột
   * 2. dom tới tbody => gán content
   */
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var sv = data[i];

    content += `
        <tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoaHoc}</td>
            <td >${sv.dtb}</td>
            <td >${sv.gia}</td>
            
            
        </tr>
    `;
  }

  getEle("tbodySinhVien").innerHTML = content;
}

function setLocalStorage() {
  //cần chuyển data về kiểu string => mới lưu xuống localStorage
  var dataString = JSON.stringify(dssv.arr);
  //lưu xuống localStorage
  localStorage.setItem("DSSV", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSSV")) {
    var dataString = localStorage.getItem("DSSV");
    //cần chuyển data từ kiểu string =>  về lại JSON
    var dataJson = JSON.parse(dataString);
    //cập nhật data từ LocalStorage vào dssv.arr
    dssv.arr = dataJson;
    //re renderListSV
    renderListSV(dssv.arr);
  }
}

//----------------CHỖ THAM KHẢO-------------------

/**
 * TÌM KIẾM SINH VIÊN
 */

getEle("txtSearch").addEventListener("keyup", function () {
  //lay value tu the input
  var keyword = getEle("txtSearch").value;

  //đưa dữ liệu vào dssv để xử lí
  var mangTimKiem = dssv._timKiemSV(keyword);
  //hiển thị ra UI  mảng dssv đã xử lí
  renderListSV(mangTimKiem);
});

/**
 * Sắp xếp SINH VIÊN
 */
function sortName() {
  //đưa dữ liệu vào mảng dssv để xử lí
  dssv._sapXepSV();
  //hiển thị ra UI  mảng dssv đã xử lí
  renderListSV(dssv.arr);
}

function sortPrice() {
  //đưa dữ liệu vào mảng dssv để xử lí
  dssv._sapXepGia();
  //hiển thị ra UI  mảng dssv đã xử lí
  renderListSV(dssv.arr);
}
