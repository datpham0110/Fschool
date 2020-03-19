import Utils from "../app/Utils"
import { nGlobalKeys } from "../app/keys/globalKey"

const PREFIX = "api/hocphi/"
const PREFIX2 = "api/thongbaophuhuynh/"
const PREFIX1 = "api/dangkytaikhoan/"

async function notification(IDKhachHang) {
  let strBody = JSON.stringify({
    IDKhachHang: IDKhachHang
  })
  Utils.nlog(PREFIX + `findbill`);
  Utils.nlog('------------------ body', strBody);
  var res = await Utils.post_apiToken(PREFIX + `findbill`, strBody, true, true)
  return res
}

async function TimHocSinh(IDKhachHang) {
  let strBody = JSON.stringify({
    IDKhachHang: IDKhachHang
  })
  Utils.nlog('------ body', strBody);
  Utils.nlog(PREFIX1 + `FindStudentById`);
  var res = await Utils.post_apiToken(
    PREFIX1 + `FindStudentById`,
    strBody,
    true,
    true
  )
  Utils.nlog(`FindStudentById`, res);

  return res
}

async function chiTietHocPhi(ThangNam, IDKhachHang) {
  let strBody = JSON.stringify({
    IDKhachHang: IDKhachHang,
    ThangNam: ThangNam
  })
  var res = await Utils.post_apiToken(
    PREFIX + `findbilldetail`,
    // PREFIX + `FindStudentById`,
    strBody,
    true,
    true
  )
  Utils.nlog(PREFIX + 'findbilldetail------------------');
  Utils.nlog('----------------findbilldetail', strBody);
  Utils.nlog('----------------findbilldetail res', res);

  return res
}

async function chiTietThongBao(IdHocSinh, IDKHDPS, IdCN, loai, pageNow) {
  Utils.nlog('in chiTietThongBao');
  let strBody = JSON.stringify({
    "data": {
      "IDKHDPS": IDKHDPS,
      "IDChiNhanh": IdCN,
      "IDHocSinh": IdHocSinh,
      "LoaiThongBao": loai,
      "IDTaiKhoan": Utils.getGlobal(nGlobalKeys.rowId, '')
    },
    "query": {
      "pageNumber": pageNow,
    }
  })
  Utils.nlog('in chiTietThongBao', strBody);
  var res = await Utils.post_apiTokenHeader(
    PREFIX2 +
    `DanhSachThongBao_App`,
    strBody,
    true,
    true
  )
  Utils.nlog('res', res);
  return res
}

async function ThongBao_ListAll_App(loai, pageNow, IDHocSinh = -1) {
  let IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "");
  let strBody = JSON.stringify({
    "data": {
      "LoaiThongBao": loai,
      "RowId": Utils.getGlobal(nGlobalKeys.rowId, ''),
      "IDHocSinh": IDHocSinh,
      "IDChiNhanh": IdCN
    },
    "query": {
      "pageNumber": pageNow,
    }
  })
  var res = await Utils.post_apiTokenHeader(
    PREFIX2 +
    `ThongBao_ListAll_App`,
    strBody,
    true,
    true
  )
  Utils.nlog(PREFIX2 +
    `ThongBao_ListAll_App`);

  Utils.nlog('--------------------------strBody', strBody);
  Utils.nlog('---------------------------res', res);
  return res
}

async function ThongBao_ListAll_App_V2(LoaiThongBao, pageNow, IDHocSinh = -1, IDChiNhanh = Utils.getGlobal(nGlobalKeys.IdCN, "")) {
  let strBody = JSON.stringify({
    data: {
      LoaiThongBao,
      RowId: Utils.getGlobal(nGlobalKeys.rowId, ''),
      IDHocSinh,
      IDChiNhanh
    },
    "query": {
      "pageNumber": pageNow,
    }
  })
  var res = await Utils.post_apiTokenHeader(
    PREFIX2 +
    `ThongBao_ListAll_App_V2`,
    strBody,
    true,
    true
  )
  // Utils.nlog(PREFIX2 + `ThongBao_ListAll_App_V2`);
  // Utils.nlog('--------------------------strBody-----------ThongBao_ListAll_App_V2', strBody);
  // Utils.nlog('---------------------------res', res);
  return res
}


async function BaoBai_List_App(loai, IDHocSinh, pageNow) {
  let strBody = JSON.stringify({
    "data": {
      "LoaiThongBao": loai,
      "RowId": Utils.getGlobal(nGlobalKeys.rowId, '')
    },
    "query": {
      "pageNumber": pageNow,
    }
  })

  Utils.nlog('-----------' + strBody)
  var res = await Utils.post_apiTokenHeader(
    PREFIX2 +
    `ThongBao_ListAll_App`,
    strBody,
    true,
    true
  )
  Utils.nlog('res', res);
  return res
}

export { notification, chiTietHocPhi, chiTietThongBao, TimHocSinh, ThongBao_ListAll_App, ThongBao_ListAll_App_V2, BaoBai_List_App }
