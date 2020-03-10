import Utils from "../app/Utils"
import { nkey } from "../app/keys/keyStore"
import { nGlobalKeys } from "../app/keys/globalKey"

import moment from "moment"

const PREFIX = "api/diemdanh/"
async function ThongTinDiemDanh(IDKhachHang, date) {
  let strBody = JSON.stringify({
    data: {
      IDHocSinh: IDKhachHang,
      NgayDiemDanh: date
    },
    query: {
      pageNumber: 0
    }
  })
  let res = await Utils.post_apiTokenHeader(PREFIX + `DiemDanh_List_App`, strBody, false, false)
  return res

}
async function DiemDanh_List_App_New(IDHocSinh, NgayDiemDanh) {
  let strBody = JSON.stringify({
    data: {
      "IDHocSinh": IDHocSinh,
      "NgayDiemDanh": NgayDiemDanh
    },
  })
  let res = await Utils.post_apiTokenHeader(PREFIX + `DiemDanh_List_App_New`, strBody, false, false)
  Utils.nlog('DiemDanh_List_App_New', res)
  return res

}

export { ThongTinDiemDanh, DiemDanh_List_App_New }
