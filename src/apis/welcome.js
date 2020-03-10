import Utils from "../app/Utils"
import { nkey } from "../app/keys/keyStore"
import { nGlobalKeys } from "../app/keys/globalKey"

const PREFIX = "api/phuhuynh/"

async function infoPhuhuyenh() {
  let id = Utils.getGlobal(nGlobalKeys.rowId, "")
  let res = await Utils.get_apiToken(
    PREFIX + `TaiKhoan/info?id=` + id,
    false,
    false
  )
  Utils.nlog('infoPhuhuyenh', res)
  Utils.setGlobal(
    nGlobalKeys.informationAccount,
    res.data
  )
  if (res.success == true) {
    if (res.data.HocSinh.length > 0) {
      Utils.setGlobal(nGlobalKeys.IDKHDPS, res.data.HocSinh[0].IDKHDPS) //Tạm thời chống chế để có đc KHDSPS
    }
  }
  return res
}

async function updateinfo(Fullname, Email, gender = false) {
  let id = Utils.getGlobal(nGlobalKeys.rowId, "")
  let body = {
    "RowId": id,
    "Fullname": Fullname,
    "Email": Email,
    "gender": gender,
  }
  let strBody = JSON.stringify(body);
  Utils.nlog(PREFIX + "updateinfo", strBody)
  let res = await Utils.post_apiTokenHeader(PREFIX + 'TaiKhoan/updateinfo', strBody, false, false);
  Utils.nlog("TaiKhoan/updateinfo", res)
  return res;
}
async function notifyParents(IDLoai) {
  let id = Utils.getGlobal(nGlobalKeys.rowId, "")
  let res = await Utils.get_apiToken(
    PREFIX + `TaiKhoan/info?id=` + id + '&IDLoai=' + IDLoai,
    false,
    false
  )
  // Utils.nlog('TaiKhoan/info?id=')
  // Utils.nlog(PREFIX + `TaiKhoan/info?id=` + id + '&IDLoai=' + IDLoai)
  // Utils.nlog(res)
  return res
}

export { infoPhuhuyenh, notifyParents, updateinfo }
