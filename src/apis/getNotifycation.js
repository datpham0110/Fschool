import Utils from "../app/Utils";
import { nGlobalKeys } from "../app/keys/globalKey";

const PREFIX = "api/thongbaophuhuynh/";

async function getNotifycation(IDHocSinh, LoaiThongBao) {
  let IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "");
  let IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS);
  let res = await Utils.get_apiToken(
    PREFIX +
    `get_apiToken?IDKHDPS=` +
    IDKHDPS +
    "&IDChiNhanh=" +
    IdCN +
    "&IDHocSinh=" +
    IDHocSinh +
    "&LoaiThongBao=LoaiThongBao",
    false,
    false
  );
  return res;
}

async function ThongBaoInsertUpdate(DevicesToken, IdUser, DevicesInfo, Status = '1', IdApp = 'mn_ph_m') {
  let strBody = JSON.stringify({
    DevicesToken: DevicesToken,
    DevicesInfo: DevicesInfo,
    IdUser: IdUser,
    Status: Status,
    IdApp: IdApp
  });

  res = await Utils.post_api(
    PREFIX + "ThongBao_Insert_Update",
    strBody,
    false,
    false
  );
  return res;
}
async function DeleteToken() {
  let data = Utils.getGlobal(nGlobalKeys.dataNotifycation, '')
  res = await Utils.get_apiTokenHeader(
    PREFIX + "DeleteToken?Token=" + data.DevicesToken + '&Id=' + data.IdUser,
    false,
    false
  );
  Utils.nlog('-------------------- deletetoken')
  Utils.nlog(PREFIX + "DeleteToken?Token=" + data.DevicesToken + '&Id=' + data.IdUser)
  Utils.nlog('-------------------- deletetoken', res)

  return res;
}



async function ThongBao_Update(IDThongBao) {
  let strBody = JSON.stringify([{

    IDThongBao: IDThongBao,

  }]);
  Utils.nlog(strBody)
  res = await Utils.post_apiTokenHeader(
    PREFIX + "ThongBao_Update",
    strBody,
    false,
    false
  );
  return res;
}
async function PhanHoiThuMoi(IDThongBao, IDPhuHuynh, IDHocSinh, XacNhan, NoiDung) {
  let strBody = JSON.stringify({
    IDThongBao: IDThongBao,
    IDPhuHuynh: IDPhuHuynh,
    IDHocSinh: IDHocSinh,
    XacNhan: XacNhan,
    NoiDung: NoiDung
  });
  res = await Utils.post_api(PREFIX + "ThuMoiSuKien_Reply", strBody, false, false);
  return res;
}

export { getNotifycation, ThongBaoInsertUpdate, DeleteToken, ThongBao_Update, PhanHoiThuMoi };
