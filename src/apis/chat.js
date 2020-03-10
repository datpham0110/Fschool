import Utils from "../app/Utils"
import {
  nGlobalKeys
} from "../app/keys/globalKey"
import moment from "moment"
import { nkey } from "../app/keys/keyStore"

const PREFIX = "api/giaovien/"
const PREFIX1 = "api/chat/"

async function listchat(MaHocSinh) {
  var res = await Utils.get_apiToken(
    PREFIX + `gvtheolop?MaHocSinh=` + MaHocSinh,
    true,
    true
  )
  return res
}

async function DanhSachHocSinh() {
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  var res = await Utils.get_apiToken(
    PREFIX1 + `DanhSachHocSinh?IDPhuHuynh=` + RowID,
    true,
    true
  )
  Utils.nlog(PREFIX1 + `DanhSachHocSinh?IDPhuHuynh=` + RowID)
  Utils.nlog('------------------------DanhSachHocSinh', res)

  return res
}

async function loadListTeacher(MaHocSinh) {
  let IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS)
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  var res = await Utils.get_apiToken(
    PREFIX1 + `AllGhiChu?IDKHPDS=` + IDKHDPS + '&IDKhachHang=' + MaHocSinh + '&IDTaiKhoan=' + RowID,
    true,
    true
  )
  Utils.nlog(PREFIX1 + `AllGhiChu?IDKHPDS=` + IDKHDPS + '&IDKhachHang=' + MaHocSinh + '&IDTaiKhoan=' + RowID)
  Utils.nlog('-------------------------AllGhiChu', res)

  return res
}

//ListTinNhanGroup
async function ListTinNhanGroup(IDChiNhanh, IDKHDPS, IdNhom, IDTaiKhoan, IdGhichu = -1, loaiChat) {
  let header = {
    LoaiChat: loaiChat
  }
  var res = await Utils.get_apiTokenHeader(
    PREFIX1 +
    "ListTinNhanGroup?IDChiNhanh=" +
    IDChiNhanh +
    "&IDKHDPS=" +
    IDKHDPS +
    "&IdNhom=" +
    IdNhom +
    "&IDTaiKhoan=" +
    IDTaiKhoan +
    "&IdGhichu=" +
    IdGhichu,
    header,
    true,
    true
  )
  Utils.nlog(PREFIX1 +
    "ListTinNhanGroup?IDChiNhanh=" +
    IDChiNhanh +
    "&IDKHDPS=" +
    IDKHDPS +
    "&IdNhom=" +
    IdNhom +
    "&IDTaiKhoan=" +
    IDTaiKhoan +
    "&IdGhichu=" +
    IdGhichu)
  Utils.nlog('----------------ListTinNhanGroup  ', header, res)
  return res
}

async function loadmes(IDKhachHang, IDGiaoVien, flag = -1, IDChiNhanh = Utils.getGlobal(nGlobalKeys.IdCN)) {
  let childSelected = Utils.getGlobal(nGlobalKeys.childSelected, undefined);
  // let IDChiNhanh = Utils.getGlobal(nGlobalKeys.IdCN)
  let IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS)
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  var res = await Utils.get_apiToken(
    PREFIX1 +
    "ListGhiChuPHGV?IDKhachHang=" +
    IDKhachHang +
    "&IDGiaoVien=" +
    IDGiaoVien +
    "&IDChiNhanh=" +
    IDChiNhanh +
    "&IDKHDPS=" +
    IDKHDPS +
    "&IDTaiKhoan=" +
    RowID +
    "&IdGhichu=" +
    flag,
    true,
    true
  )
  Utils.nlog(PREFIX1 +
    "ListGhiChuPHGV?IDKhachHang=" +
    IDKhachHang +
    "&IDGiaoVien=" +
    IDGiaoVien +
    "&IDChiNhanh=" +
    IDChiNhanh +
    "&IDKHDPS=" +
    IDKHDPS +
    "&IDTaiKhoan=" +
    RowID +
    "&IdGhichu=" +
    flag)
  Utils.nlog(
    '--------------------------ListGhiChuPHGV', res)
  return res
}

async function loadmes1(IDKhachHang, IDGiaoVien, flag = -1) {
  let IDChiNhanh = Utils.getGlobal(nGlobalKeys.IdCN)
  let IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS)
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  var res = await Utils.get_apiToken(
    PREFIX1 +
    "ListGhiChuPHGV?IDKhachHang=" +
    IDKhachHang +
    "&IDGiaoVien=" +
    IDGiaoVien +
    "&IDChiNhanh=" +
    IDChiNhanh +
    "&IDKHDPS=" +
    IDKHDPS +
    "&IDTaiKhoan=" +
    RowID +
    "&IdGhichu=" +
    flag,
    true,
    true
  )
  return res
}
async function sendmes(IdGiaoVien, smsg, IDChiNhanh) {
  let childSelected = Utils.getGlobal(nGlobalKeys.childSelected)
  let IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS)
  let informationAccount = Utils.getGlobal(nGlobalKeys.informationAccount, '')
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  strBody = JSON.stringify({
    IDKhachHang: childSelected.IDKhachHang,
    TenKH: informationAccount.Fullname,
    GioiTinh: informationAccount.Strgender,
    IDChiNhanh: IDChiNhanh,
    IDKHDPS: IDKHDPS,
    TieuDe: "Ghi Chu",
    NoiDung: smsg,
    Isclient: true
  })
  let header = {
    iduser: childSelected.IDKhachHang,
    IdTaiKhoan: RowID,
    teacher: IdGiaoVien
  }
  var res = await Utils.post_apiDeviceTokenHeader(
    PREFIX1 + `TaoGhiChuPHGV`,
    strBody,
    header,
    true,
    true
  )
  return res
}
async function TaoTinNhanGroup(NoiDung, IdNhom, IDLoai, IDChiNhanh) {
  const _iDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS, '')
  let fullname = await Utils.ngetStore(nkey.Fullname, "");
  let _idUser = Utils.getGlobal(nGlobalKeys.rowId, "")
  const _idChiNhanh = Utils.getGlobal(nGlobalKeys.IdCN)
  strBody = JSON.stringify({
    IDChiNhanh: IDChiNhanh,
    IDKHDPS: _iDKHDPS,
    TieuDe: 'Tieu de',
    NoiDung: NoiDung,
    Isclient: 'true',
    Creator: _idUser,
    IDTeacher: _idUser,
    IdNhom: IdNhom,
    IdNguoiTao: _idUser,
    TenNguoiTao: fullname
  });
  let header = {
    // IDTeacher: _idUser,
    IDTaiKhoan: _idUser,
    LoaiChat: IDLoai
  };
  var res = await Utils.post_apiTokenHeader(
    PREFIX1 + `TaoTinNhanGroup`,
    strBody,
    header,
    true,
    true
  );
  return res;
}
export {
  listchat,
  loadmes,
  sendmes,
  loadListTeacher, ListTinNhanGroup, TaoTinNhanGroup, loadmes1, DanhSachHocSinh
}