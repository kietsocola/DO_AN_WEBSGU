function SinhVien(
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
) {
  this.maSV = _maSV;
  this.tenSV = _tenSV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngaySinh = _ngaySinh;
  this.khoaHoc = _khoaHoc;
  this.diemToan = _diemToan;
  this.diemLy = _diemLy;
  this.diemHoa = _diemHoa;
  this.gia = _gia;
  this.dtb = 0;

  this.tinhDTB = function () {
    // sử dụng hàm round giúp làm tròn số thập phân thành 2 giá trị
    var diemTrungBinh =
      (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3;
    this.dtb = diemTrungBinh.toFixed(2);
  };
}
