import Utils from '../app/Utils';
import { appConfig } from '../app/Config';
import { ROOTGlobal } from '../app/data/dataGlobal';
import { nkey } from '../app/keys/keyStore';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager } from 'react-native-fbsdk';
import { nGlobalKeys } from '../app/keys/globalKey';
import { RootLang } from '../app/data/locales';
import moment from 'moment';
const PREFIX = 'VT_User/';
const LOGIN_BY_EMAIL = 1, LOGIN_BY_PHONE = 2, LOGIN_BY_SOCIAL_NETWORK = 3;


async function getListRoles() {
    var res = await Utils.get_api(PREFIX + 'VT_Sys_Roles_List', false, false);
    if (!(res < 0 || !res.status == 1)) {
        return res.data;
    }
    Utils.nlog('Lỗi get DS Roles');
    return [];
}

async function registerAccount(strBody) {
    var res = await Utils.post_api(PREFIX + 'VT_CusAccounts_Insert', strBody, false, false);
    Utils.nlog('registerAccount', res);
    // var response = Utils.handleResponse(res);
    return res;
}


// Check xem tài khoản đăng nhập từ Facebook hay Google đã có trong hệ thống hay chưa
async function checkIdSA(idSA) {
    var res = await Utils.get_api(PREFIX + 'VT_CusAccountsMXH_Check?idSA=' + idSA, false, false);
    var response = Utils.handleResponse(res);

    return response;
}


/*
   - TypeLogin:
        + 1: Login By Email and Password
        + 2: Login By PhoneNumber and Password
        + 3: Login Social Network, add idSA
*/

async function loginByOuthToken(strBody, type, idSA = "", nthis = {}) {
    var formBody = [];
    for (var property in strBody) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(strBody[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    try {
        const response = await fetch(appConfig.domain + 'api/oauth/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'TypeLogin': type,
                    'IdSA': idSA
                },
                body: formBody
            });

        Utils.nlog('loginByOuthToken', response);
        const res = await response.json();
        if (res.ExceptionMessage != undefined) { // edit tuỳ từng object api
            Utils.nlog('[API]Lỗi API:', res);
            return -3;
        }
        //--login success
        if (res.access_token != undefined) {
            Utils.nsetStore(nkey.token, res.access_token);
            Utils.nsetStore(nkey.typeLogin, type == 3 ? ROOTGlobal.typeLogin : type);
            ROOTGlobal.loginToken = res.access_token;
            if (type < 3)
                ROOTGlobal.typeLogin = type;
            getInfoUser(nthis.props.setProfiles);
        }
        return res;
    } catch (error) {
        Utils.nlog('[API]Lỗi error:', error);
        return -1;
    }
}

async function onCheckLogin(nthis, typelogin, username, password, grant_type = '', idSA = null) {
    let body = {
        Username: username
    };
    if (password != '') {
        body.Password = password;
    }
    if (grant_type != '') {
        body.grant_type = grant_type;
    }
    let result = await loginByOuthToken(body, typelogin, idSA, nthis);
    Utils.nlog('onCheckLogin ', result);
    if (result.access_token) { //login success
        // Utils.showMsgBoxOK(nthis, RootLang.lang.notification, RootLang.lang.LoginSuccesful, RootLang.lang.ok, () => );
        Utils.goback(nthis);
        return true;
    } else {
        let { error = '', error_description = '' } = result;
        let messageFail = RootLang.lang.LoginFail;
        if (error_description) {
            messageFail += '\n' + error_description;
        }
        if (error == 'email_unactive') {
            Utils.showMsgBoxYesNo(nthis, RootLang.lang.notification, messageFail, RootLang.lang.sendEmail, RootLang.lang.ok, async () => {
                nthis.waitting.show();
                let res = await GenerateEmailVerification(username);
                nthis.waitting.hide();
                if (res.status == 1) {
                    Utils.showMsgBoxOK(nthis, RootLang.lang.notification, RootLang.lang.emailSentSuccessfully,
                        RootLang.lang.ok, () => { Utils.goback(nthis) })
                } else {
                    let failmessage = RootLang.lang.emailConfirmationFailed;
                    let { error = {} } = res;
                    if (error.message) {
                        failmessage += '\n' + error.message;
                    }
                    Utils.showMsgBoxOK(nthis, RootLang.lang.notification, failmessage);
                }
            })
        }

        Utils.showMsgBoxOK(nthis, RootLang.lang.notification, messageFail);
        return false;
    }
}


/**
 * @description Gửi mail xác nhận quên mật khẩu
 * @param {*} email email quên mật khẩu.
 */
async function VT_CusAccounts_ForgetPass(email) {
    let param = {
        email: email,
        linkForgot: appConfig.linkWeb + '#resetpassword',
        langCode: RootLang._keys
    }
    let queryString = Utils.objToQueryString(param);
    let res = await Utils.get_api(PREFIX + 'VT_CusAccounts_ForgetPass?' + `${queryString}`, false, false);
    //var response = Utils.handleResponse(res);
    return res;
}


/** 
 * @description Gửi lại email xác nhận tài khoản.
 * @param {*} email email tài khoản của người dùng.
 */
async function GenerateEmailVerification(email) {
    let strBody = JSON.stringify({
        "email": email,
        "langCode": RootLang._keys,
        "linkConfim": appConfig.linkWeb + "Profile/EmailVerification?idRq={0}&token={1}",
        "linkContact": appConfig.linkWeb
    });

    var res = await Utils.post_api(PREFIX + 'VT_CusAccounts_GenerateEmailVerification', strBody, false, false);
    Utils.nlog('GenerateEmailVerification', res);
    //var response = Utils.handleResponse(res);
    return res;
}

//---- Login Email

// async function loginEmail(strbody) {
//     var res = await Utils.post_api(PREFIX + 'VT_CusAccounts_Login', strbody, false, false)
//     Utils.nlog('LOGIN', res)
//     var response = Utils.handleResponse(res);

//     return response;
// }

async function logOut(nthis, typeLogin = '') {
    let type = typeLogin == '' ? ROOTGlobal.typeLogin.toString() : typeLogin;
    if (nthis != null)
        nthis.props.setProfiles({});
    if (type >= 3) {
        try {
            GoogleSignin.signOut();
            LoginManager.logOut();
        } catch (error) {
            Utils.nlog('logOut error: ' + error);
        }

    }
    //code logut tripu nữa... a nghi thiếu 

    //-----
    await Utils.nsetStore(nkey.token, '');
    await Utils.nsetStore(nkey.typeLogin, 0);
    ROOTGlobal.loginToken = '';
    ROOTGlobal.typeLogin = 0;
}

// Nếu tài khoản Social Network chưa có trong DB thì gọi api này để thêm vào
async function loginSocialAcc(strBody) {
    var res = await Utils.post_api(PREFIX + 'VT_CusAccountsMXH_Login', strBody, false, false);
    Utils.nlog('loginSocialAcc', res);
    var response = Utils.handleResponse(res);
    return response;
}

// check phoneCode
async function registerPhone(strBody) {
    var res = await Utils.post_api('Acc/registerPhone', strBody, false, false);
    Utils.nlog('registerPhone', res);
    var response = Utils.handleResponse(res);
    return response;
}

// check verifyPhone
async function verifyPhone(strBody) {
    var res = await Utils.post_api('Acc/checkVerification', strBody, false, false);
    Utils.nlog('verifyPhone', res);
    var response = Utils.handleResponse(res);

    return response;
}

// registerPhone 
async function registerPhoneAccount(strBody) {
    var res = await Utils.post_api('Acc/register', strBody, false, false);
    Utils.nlog('registerPhoneAccount', res);
    var response = Utils.handleResponse(res);

    return response;
}

// get Info User 
async function getInfoUser(actionRedux = () => { }) {
    let res = await Utils.get_apiToken(PREFIX + 'VT_CusAccounts_GetById', false, true);
    res = Utils.handleResponse(res);
    Utils.nlog('info uer', res)
    //--xư lý dữ liệu chung khi có cập nhật info
    if (res.status == 1) {
        const { firstName = '', lastName = '', idAcc, email = '', profileImage = '' } = res.data;
        const objInfoUser = {
            FirstName: firstName,
            LastName: lastName,
            IdAcc: idAcc,
            EmailAddress: email,
            nameUser: firstName + ' ' + lastName,
            avatarUser: Utils.isUrlCus(profileImage) != '' ? profileImage : appConfig.linkImg + profileImage
        };
        //set data user vao state redux


        ROOTGlobal.avatarUser = objInfoUser.avatarUser;
        ROOTGlobal.nameUser = objInfoUser.nameUser;

        ROOTGlobal.Name = ROOTGlobal.avatarUser;

        Utils.nsetStore(nkey.avatar, ROOTGlobal.avatarUser);
        Utils.nsetStore(nkey.nameuser, ROOTGlobal.nameUser);
        Utils.setGlobal(nGlobalKeys.YourInformation, objInfoUser);
        actionRedux(objInfoUser);
    };
    return res;
}
async function getListByid() {
    let res = await Utils.get_apiToken(PREFIX + 'VT_CusAccounts_Point_GetListById?Type=HOTEL&OrderBy_CreatedDate=desc', false);
    res = Utils.handleResponse(res);
    return res;
}


async function getSubEmail(email = '') {
    let res = await Utils.get_api(PREFIX + 'VT_CusAccounts_SubscribeEmail?langcode=' + RootLang._keys
        + '&email=' + email, false);
    res = Utils.handleResponse(res);
    return res;
}

// Flag Update
/// 0:ALL
/// 1: Info
/// 2: Email subscriptions
/// 3: Frequent Flyer and Membership
/// 4: Passports
/// 5: Traveling preference
/// 6: Address
/// 7: Email
/// 8: Emergency contact
// update Info User
async function updateInfoUser(strBody) {
    var res = await Utils.post_apiToken(PREFIX + 'VT_CusAccounts_Update', strBody, false);
    var response = Utils.handleResponse(res);
    Utils.nlog('Update Info__', res);
    return response;
}

// change Password
async function changePassword(strBody) {
    var res = await Utils.post_apiToken(PREFIX + 'VT_CusAccounts_ChangePass', strBody, false, true);
    Utils.nlog('changePassword', res);
    var response = Utils.handleResponse(res);
    return response;
}

// upload Avatar
async function uploadAvatar(strBody) {
    var res = await Utils.post_apiToken(PREFIX + 'UploadAvatar', strBody, false);
    Utils.nlog('uploadAvatar', res);
    var response = Utils.handleResponse(res);
    return response;
}

//add Passenger
async function addPassenger(strBody) {
    var res = await Utils.post_api(PREFIX + 'VT_Cus_Passengers_Create', strBody, false, false);
    Utils.nlog('addPassenger', res);
    var response = Utils.handleResponse(res);
    return response;
}

//Update Passenger
async function updatePassenger(strBody) {
    var res = await Utils.post_api(PREFIX + 'VT_Cus_Passengers_Update', strBody, false, false);
    Utils.nlog('UpdatePAssenger', res);
    var response = Utils.handleResponse(res);
    return response;
}


//Danh sach Passenger
async function listPassenger() {
    var res = await Utils.get_apiToken(PREFIX + 'VT_Cus_Passenger_List');
    var response = Utils.handleResponse(res);
    return response;
}
async function MyWatchListHotel(IdAcc = '', Langcode = RootLang._keys) {
    var res = await Utils.get_apiToken(PREFIX + 'MyWatchListHotel?IdAcc=' + IdAcc + '&Langcode=' + Langcode);
    var response = Utils.handleResponse(res);
    return response;
}

//Delete Passenger
async function deletePassenger(idQP) {
    var res = await Utils.get_api(PREFIX + 'VT_Cus_Passengers_Delete?id=' + idQP);
}
/**
 * @description Lấy ra lịch sử của khách hàng.
 * @param {*} dateFrom string, thời gian từ.
 * @param {*} dateTo string, thời gian đến.
 * @param {*} type Mảng ['ALL', 'HOTEL', ]
 * @param {*} status string, ALL', 'AR', 'UP', 'CA', 'CO
 * @param {*} idItem Iditem của booking user (Dùng trong màn hình detail)
 */
async function VT_UserBooking(dateFrom = '', dateTo = '', type = ['ALL'], status = 'ALL', idItem = 0) {
    let body = idItem > 0 ? {
        "idItem": idItem
    } : {
            "dateFrom": dateFrom,
            "dateTo": dateTo,
            "type": type,
            "status": status
        };
    let strBody = JSON.stringify(body);
    var res = await Utils.post_apiToken(PREFIX + 'VT_UserBooking', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

/**
 * @description Trả về chi tiết của một lịch sử của khách hàng.
 * @param {*} id Mã của 1 lịch sử từ VT_UserBooking, (idItem)
 */
async function BookingHistoryDetail(id = 0) {
    var res = await Utils.get_api(PREFIX + 'BookingHistoryDetail?id=' + id, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

async function Sys_ConstantsDescriptions_List(CategoryPath = 'SERVICES/TYPE') {
    let body = {
        'CategoryPath': CategoryPath
    }
    body = JSON.stringify(body);
    let res = await Utils.post_api(PREFIX + `Sys_ConstantsDescriptions_List?CategoryPath=${CategoryPath}`, body, false, false);
    res = Utils.handleResponse(res);
    return res;
}
async function VT_CusAccounts_SubscribeEmail(email, langCode = RootLang._keys) {
    var res = await Utils.get_api(PREFIX + `VT_CusAccounts_SubscribeEmail?email=${email}&langcode=${langCode}`, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

// get data travelling

async function getdataTraveling() {
    let res = await Utils.post_apiToken(PREFIX + 'VT_Cus_Traveling_Preference', null, false, false);
    var response = Utils.handleResponse(res);
    return response;
}
// API love nhấn trái tim Home 
async function WatchListHotelSave(destinationZone, startDate, endDate, hotelCode, numberOfRoom, numberOfAdult, numberOfChild, arr_ChildAge) {
    const createdDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    let body = {
        destinationZone,
        startDate,
        endDate,
        arr_HotelCode: [
            hotelCode
        ],
        numberOfRoom,
        numberOfAdult,
        numberOfChild,
        arr_ChildAge,
        createdDate,
        langcode: RootLang._keys
    }
    body = JSON.stringify(body);
    let res = await Utils.post_apiToken(PREFIX + 'WatchListHotelSave', body, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

export {
    loginByOuthToken, registerAccount, checkIdSA, loginSocialAcc, registerPhone, onCheckLogin,
    verifyPhone, registerPhoneAccount, getInfoUser, updateInfoUser, changePassword, uploadAvatar, addPassenger,
    VT_UserBooking, BookingHistoryDetail, listPassenger, deletePassenger, logOut, Sys_ConstantsDescriptions_List,
    VT_CusAccounts_SubscribeEmail, getListByid, getSubEmail, updatePassenger, getdataTraveling, VT_CusAccounts_ForgetPass,
    WatchListHotelSave, MyWatchListHotel
}

