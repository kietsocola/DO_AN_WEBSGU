function DanhSachSinhVien() {
  this.arr = [];

  this._themSV = function (sv) {
    this.arr.push(sv);
  };

  //CHỨC NĂNG TÌM KIẾM THEO TÊN
  this._timKiemSV = function (keyword) {
    /**
     * 0. Tạo ra mangTimKiem = []
     * 1. Duyet mang arr
     * 2. sv = arr[i]
     * 3. Kiem tra nếu keyword được tìm thấy với sv.tenSV
     *    => true => thêm sv dc tìm thấy vào mangTimKiem
     * 4. tra mangTimKiem
     */
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++) {
      var sv = this.arr[i];
      //convert keyword => lowercase
      var keywordLowerCase = keyword.toLowerCase();
      //convert sv.tenSV => lowercase
      var tenSVLowerCase = sv.tenSV.toLowerCase();
      if (tenSVLowerCase.indexOf(keywordLowerCase) !== -1) {
        mangTimKiem.push(sv);
      }
    }
    return mangTimKiem;
  };

  //CHỨC NĂNG SẮP XẾP THEO TÊN
  this._sapXepSV = function () {
    this.arr.sort(function (a, b) {
      // Chuyển đổi tên thành chữ thường để so sánh không phân biệt chữ hoa chữ thường
      let nameA = a.tenSV.toLowerCase();
      let nameB = b.tenSV.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  //CHỨC NĂNG SẮP XẾP THEO GIÁ
  this._sapXepGia = function () {
    this.arr.sort(function (a, b) {
      // Chuyển đổi tên thành chữ thường để so sánh không phân biệt chữ hoa chữ thường
      let nameA = a.gia;
      let nameB = b.gia;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };
}
