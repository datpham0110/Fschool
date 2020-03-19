import Utils from "../app/Utils"
import { nkey } from "../app/keys/keyStore"
import { nGlobalKeys } from "../app/keys/globalKey"
import publicIP from 'react-native-public-ip';

const PREFIX = "api/quanlyhocsinh/"
const PREFIX1 = "api/lichsuthanhtoanwm/"
const PREFIX2 = 'api/thongbaophuhuynh/'

async function hocSinh_CreateOrders(MaHocSinh, sotien) {
  publicIP()
    .then(ip => {
      Utils.setGlobal(nGlobalKeys.ipPublic,
        ip)
    })
    .catch(error => {
      // console.log('Loi khi get ip', error);
    });
  let ipppppp = Utils.getGlobal(nGlobalKeys.ipPublic, '');
  let res = await Utils.post_apiTokenThanhToan(
    PREFIX +
    `HocSinh_CreateOrders?MaHocSinh=` +
    MaHocSinh +
    "&sotien=" +
    sotien +
    "&pClientIP="
    + ipppppp,
    "body",
    false,
    false
  )
        console.log(PREFIX +
          `HocSinh_CreateOrders?MaHocSinh=` +
          MaHocSinh +
          "&sotien=" +
          sotien +
          "&pClientIP="
          + ipppppp);

  return res
}

async function XemChiTietOrder(resultURL) {
  let res = await Utils.post_apiTokenThanhToan(
    PREFIX1 + `XemChiTietOrder?hashKey=` + resultURL,
    "body",
    false,
    false
  )
  return res
}
async function ThongBao_Detail(IDThongBao) {
  let res = await Utils.post_apiTokenThanhToan(
    PREFIX + `ThongBao_Detail?IDThongBao=` + IDThongBao,
    1,
    false,
    false
  )
  Utils.nlog(PREFIX + `ThongBao_Detail?IDThongBao=` + IDThongBao)
  // let res = await Utils.post_apiTokenHeader(
  //   PREFIX + `ThongBao_Detail?IDThongBao=` + IDThongBao,
  //   1,
  //   false,
  //   false
  // )
  return res
}

async function ThongBao_Detail_V2(IDThongBao) {
  let res = await Utils.get_apiTokenHeader(
    PREFIX + `ThongBao_Detail_V2?IDThongBao=` + IDThongBao,
    1,
    false,
    false
  )
  Utils.nlog(PREFIX + `ThongBao_Detail_V2?IDThongBao=` + IDThongBao)
  return res;
}
async function ThongBao_Detail_V22222222(IDThongBao, IDTaiKhoan, idHocsinh) {
  let res = await Utils.get_apiTokenHeader(
    PREFIX2 + `ThongBao_Detail_V2?IDThongBao=${IDThongBao}&IDTaiKhoan=${IDTaiKhoan}&IDHocSinh=${idHocsinh}`,
    1,
    false,
    false
  )
  Utils.nlog(PREFIX2 + `ThongBao_Detail_V2?IDThongBao=${IDThongBao}&IDTaiKhoan=${IDTaiKhoan}`)
  return res;
}
async function ThongBao_Detail_V3(IDThongBao, IDTaiKhoan, idHocsinh) {
  let res = await Utils.get_apiTokenHeader(
    PREFIX2 + `ThongBao_Detail_V3?IDThongBao=${IDThongBao}&IDTaiKhoan=${IDTaiKhoan}&IDHocSinh=${idHocsinh}`,
    false,
    false
  )
  Utils.nlog(PREFIX2 + `ThongBao_Detail_V3?IDThongBao=${IDThongBao}&IDTaiKhoan=${IDTaiKhoan}&IDHocSinh=${idHocsinh}`)
  return res;
}


async function TraLoi_BaiKiemTra_DangHinh(data) {
  let strBody = JSON.stringify(data);
  let res = await Utils.post_apiTokenHeader(
    PREFIX2 + `TraLoi_BaiKiemTra_DangHinh`,
    strBody,
    false,
    false
  )
  Utils.nlog(`TraLoi_BaiKiemTra_DangHinh`, strBody)
  Utils.nlog(PREFIX + `TraLoi_BaiKiemTra_DangHinh`, data)
  return res;
}

async function TraLoiTracNghiem(data) {
  let strBody = JSON.stringify(data);
  Utils.nlog('body trac nghiem', strBody)
  let res = await Utils.post_apiTokenHeader(
    PREFIX2 + `TraLoiTracNghiem`,
    strBody,
    false,
    false
  )
  Utils.nlog(PREFIX + `TraLoiTracNghiem`, data)
  return res;
}

export { hocSinh_CreateOrders, XemChiTietOrder, ThongBao_Detail, ThongBao_Detail_V2, ThongBao_Detail_V22222222, TraLoiTracNghiem, ThongBao_Detail_V3, TraLoi_BaiKiemTra_DangHinh }
