import Utils from "../app/Utils"
import { nkey } from "../app/keys/keyStore"
import { nGlobalKeys } from "../app/keys/globalKey"
import { infoPhuhuyenh } from '../apis/welcome';
import moment from "moment"
import publicIP from 'react-native-public-ip';

const PREFIX = "api/account/"
const PREFIX1 = "api/dangkytaikhoan/"
async function xacThucOTP(otp) {
  let strBody = JSON.stringify({})
}

async function Version() {
  let res = await Utils.get_apiTokenHeader(
    PREFIX + 'Version',
    false,
    false
  )
  Utils.nlog(PREFIX + 'Version')
  return res
}

async function avatar(strBase64, filename) {
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  let header = {
    IdTaiKhoan: RowID
  }
  let strBody = JSON.stringify({
    strBase64: strBase64,
    filename: filename,
    extension: '.png',
  })
  let res = await Utils.post_apiTokenHeader(PREFIX + `avatar`, strBody, header, false, false)
  return res
}
async function updateAvatarHS(strBase64, filename, IdHocSinh) {
  let RowID = Utils.getGlobal(nGlobalKeys.rowId)
  let header = {
    IdTaiKhoan: RowID,
    IdHocSinh: IdHocSinh
  }
  let strBody = JSON.stringify({
    strBase64: strBase64,
    filename: filename,
    extension: '.png',
  })
  let res = await Utils.post_apiTokenHeader(PREFIX + `HocSinh_UpdateImage`, strBody, header, false, false)
  Utils.nlog('updateAvatarHS', PREFIX + `HocSinh_UpdateImage`, strBody, header)
  return res
}

async function apiLogin(PhoneNumber, Password) {
  let strBody = JSON.stringify({
    PhoneNumber: PhoneNumber,
    Password: Password
  })
  let res = await Utils.post_api(PREFIX + `login`, strBody, false, false)
  Utils.nlog('apiLogin', res)
  return res
}

async function enterPhoneNumber(PhoneNumber) {
  let res = await Utils.get_api(
    PREFIX1 + "DangKyOTP?_soDienThoai=" + PhoneNumber,
    false,
    false
  )
  return res
}

async function onCheckLogin(PhoneNumber, Password) {
  if (PhoneNumber == null && Password == null) {
    return false
  } else {
    let strBody = JSON.stringify({
      PhoneNumber: PhoneNumber,
      Password: Password
    })
    let res = await Utils.post_api(PREFIX + `login`, strBody, false, false)
    if (res.success == true) {
      Utils.nsetStore(nkey.nameuser, PhoneNumber)
      Utils.nsetStore(nkey.password, Password)
      Utils.nsetStore(nkey.Fullname, res.data.Fullname)
      Utils.nsetStore(nkey.Strgender, res.data.Strgender)
      Utils.setGlobal(nGlobalKeys.loginToken, res.data.Token)
      Utils.setGlobal(nGlobalKeys.rowId, res.data.RowId)
      Utils.setGlobal(nGlobalKeys.IDKHDPS, res.data.IDKHDPS)
      Utils.setGlobal(nGlobalKeys.IdCN, res.data.IdCN)
      publicIP()
        .then(ip => {
          Utils.setGlobal(nGlobalKeys.ipPublic,
            ip)
        })
        .catch(error => {
        });
      let res1 = await infoPhuhuyenh()
      Utils.nlog('---------- infoPhuhuyenh', res)
      if (res1.success == true) {
        Utils.setGlobal(
          nGlobalKeys.IdKhachHang_User,
          res1.data
        )
        Utils.setGlobal(
          nGlobalKeys.informationAccount,
          res1.data
        )
        Utils.setGlobal(nGlobalKeys.IdCN, res.data.IdCN)
      }
      return true
    } else return false
  }
}
async function accuracyOTP() {
  let IdUser = Utils.getGlobal(nGlobalKeys.IdUser, "")
  let PhoneNumber = await Utils.ngetStore(nkey.phonenumber, "")
  let IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "")
  let OTP = Utils.getGlobal(nGlobalKeys.OTP, null)
  let OTPTime = Utils.getGlobal(nGlobalKeys.OTPTime, "")
  let OTPTimeApp = moment()
    .utcOffset("+07:00")
    .format("YYYY-MM-DD hh:mm:ss a")
    .toString()
  let strBody = JSON.stringify({
    IdUser: IdUser,
    PhoneNumber: PhoneNumber,
    IdCN: IdCN,
    OTP: OTP,
    OTPTime: OTPTime,
    OTPTimeApp: OTPTimeApp
  })
  Utils.nlog('---------------------  XacThucOTP ', strBody)
  let res = await Utils.post_api(PREFIX1 + `XacThucOTP`, strBody, false, false)
  return res.success
}
async function createAccount() {
  let PhoneNumber = await Utils.ngetStore(nkey.phonenumber, "")
  let IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "")
  let Fullname = await Utils.ngetStore(nkey.Fullname, "")
  let Email = await Utils.getGlobal(nGlobalKeys.Email, "")
  let Password = await Utils.ngetStore(nkey.password, "")
  let strBody = JSON.stringify({
    PhoneNumber: PhoneNumber,
    IDChiNhanh: IdCN,
    Fullname: Fullname,
    Password: Password,
    Email: Email
  })
  let res = await Utils.post_api(PREFIX1 + `TaoTaiKhoan`, strBody, false, false)
  return res
}

async function traCuuMaHocSinh(mahocsinh) {
  let PhoneNumber = await Utils.ngetStore(nkey.phonenumber, "")
  let IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "")
  let Fullname = await Utils.ngetStore(nkey.Fullname, "")
  let Password = await Utils.ngetStore(nkey.password, "")
  let Email = await Utils.getGlobal(nGlobalKeys.Email, "")
  let strBody = JSON.stringify({
    PhoneNumber: PhoneNumber,
    IDChiNhanh: IdCN,
    Fullname: Fullname,
    Password: Password,
    Email: Email,
    MaSoHocSinh: mahocsinh
  })
  Utils.nlog(PREFIX1 + `FindStudentById`)
  let res = await Utils.post_api(
    PREFIX1 + `FindStudentById`,
    strBody,
    false,
    false
  )
  return res
}
async function xacNhanHocSinh(flag, maTruong) {
  let ObjectHocSinh = await Utils.getGlobal(nGlobalKeys.ObjectHocSinh, "")
  let IDChiNhanh = await Utils.getGlobal(nGlobalKeys.IdCN, "")
  let phonenumber = await Utils.ngetStore(nkey.phonenumber, null)
  let strBody
  if (ObjectHocSinh.SSCId == undefined) {
    return false
  } else {
    if (flag == false) {
      strBody = JSON.stringify({
        SSCId: ObjectHocSinh.SSCId,
        FullName: ObjectHocSinh.FullName,
        Birthday: ObjectHocSinh.Birthday,
        ClassCode: ObjectHocSinh.ClassCode,
        ClassName: ObjectHocSinh.ClassName,
        Address: ObjectHocSinh.Address,
        FatherName: ObjectHocSinh.FatherName,
        MotherName: ObjectHocSinh.MotherName,
        SchoolName: ObjectHocSinh.SchoolName,
        Phone: ObjectHocSinh.Phone,
        SchoolCode: maTruong
      })
    } else {
      strBody = JSON.stringify({
        SSCId: ObjectHocSinh.SSCId,
        FullName: ObjectHocSinh.FullName,
        Birthday: ObjectHocSinh.Birthday,
        ClassCode: ObjectHocSinh.ClassCode,
        ClassName: ObjectHocSinh.ClassName,
        Address: ObjectHocSinh.Address,
        FatherName: ObjectHocSinh.FatherName,
        MotherName: ObjectHocSinh.MotherName,
        Phone: ObjectHocSinh.Phone,
        SchoolName: ObjectHocSinh.SchoolName,
        SchoolCode: ObjectHocSinh.SchoolCode
      })
    }
    let headder = {
      IDChiNhanh: IDChiNhanh
    }
    let res = await Utils.post_apiTokenHeader(
      PREFIX1 + `XacNhanHocSinh`,
      strBody,
      headder,
      false,
      false
    )
    Utils.nlog(PREFIX1 + `XacNhanHocSinh`)
    Utils.nlog(`----------------- XacNhanHocSinh strBody`, strBody)
    Utils.nlog(`----------------- XacNhanHocSinh headder`, headder)
    Utils.nlog(`----------------- XacNhanHocSinh res`, res)
    return res
  }
}

async function findstudent() { }

async function updateCN(codeStuden) {
  let res = await Utils.post_apiTokenHeader(
    PREFIX + `updateCN?MaHocSinh=` + codeStuden,
    'body',
    false,
    false
  )
  console.log("red -------updateCN", res)
  return res
}



export {
  apiLogin,
  onCheckLogin,
  enterPhoneNumber,
  accuracyOTP,
  createAccount,
  traCuuMaHocSinh,
  xacNhanHocSinh,
  findstudent,
  avatar,
  Version, updateAvatarHS
}
