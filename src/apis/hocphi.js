import Utils from "../app/Utils"

const PREFIX = "api/hocphi/"
async function findfindstufindstuden(tenHocSinh, NamSinh, MaTruong) {
  let strBody = JSON.stringify({
    TenHocSinh: tenHocSinh,
    NamSinh: NamSinh,
    MaTruong: MaTruong
  })
  let res = await Utils.post_apiTokenHeader(
    PREFIX + "findstudent",
    strBody,
    false,
    false
  )
  return res
}

async function thanhtoanssc(SSCId, StudentCode, StudentName, Address, SchoolCode, SchoolName, ClassCode, ClassName, transactionID, Bills) {
  let strBody = JSON.stringify({
    "SSCId": SSCId,
    "StudentCode": StudentCode,
    "StudentName": StudentName,
    "Address": Address,
    "SchoolCode": SchoolCode,
    "SchoolName": SchoolName,
    "ClassCode": ClassCode,
    "ClassName": ClassName,
    "transactionID": transactionID,
    "Bills": Bills
  })
  Utils.nlog('strBody', strBody);
  Utils.nlog(PREFIX + "thanhtoanssc_v2");
  let res = await Utils.post_apiTokenHeader(
    PREFIX + "thanhtoanssc_v2",
    strBody,
    false,
    false
  )
  return res
}

export { findfindstufindstuden, thanhtoanssc }
