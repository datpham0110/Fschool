import Utils from '../app/Utils';
import { appConfig } from '../app/Config';
import { RootLang } from '../app/data/locales';

const PREFIX = 'StaticDataTransactions/';
// const PREFIX = 'StaticDataTransactionsJuniper/';

async function hotelCatalogueData(username, password, lang = appConfig.defaultLang) {
    //var res = await hotelCatalogueData('123@abc.com','pass','en');
    let strBody = JSON.stringify({
        "login": {
            "userName": username,
            "password": password
        },
        "langCode": lang
    })
    var res = await Utils.post_api(PREFIX + 'HotelCatalogueData', strBody, false, false);
    var response = Utils.handleResponse(res);

    return response;
}

/**
 * @description Tìm gần đúng theo tên thành phố hoặc tên tỉnh hoặc tên quốc gia nếu Keyword khác null. 
 * Truyền vào tối thiểu '3 ký tự'.
 * @param {*} keyword Tên thành phố hoặc tên tỉnh hoặc tên quốc gia.
 * @param {*} username Tài khoản người dùng (không bắt buộc).
 * @param {*} password Mật khẩu người dùng (không bắt buộc).
 * @param {*} langCode Mã ngôn ngữ, mặc định là 'en'.
 */
async function CityList(keyword = '', username = '', password = '', langCode = appConfig.defaultLang) {
    let strBody = JSON.stringify({
        "keyword": keyword,
        "login": {
            "userName": username,
            "password": password
        },
        "langCode": langCode
    })
    var res = await Utils.post_api(PREFIX + 'Citylist', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}
async function HotelList(keyword = '', langCode = appConfig.defaultLang, top = '') {
    let strBody = JSON.stringify({
        "keyword": keyword,
        "langCode": langCode,
        "top": top
    })
    var res = await Utils.post_api(PREFIX + 'HotelList', strBody, false, false);
    // var response = Utils.handleResponse(res);
    return res;
}

/**
 * @description Tìm gần đúng theo tên thành phố hoặc tên tỉnh hoặc tên quốc gia nếu Keyword khác null. 
 * Truyền vào tối thiểu '3 ký tự'. Để booking(AvailTransactions). 
 * Giá trị loại sản phẩm có thể là HOT - Hotel • TRF - Transfer • PCK – Package • FLH – Flight
 * @param {*} productType truyền dạng string là: HOT, CAR, TKT, TRF, VSD, PCK, FLH, INS, CRU
 * @param {*} areaType truyền dạng string 
 * @param {*} keyword Tên thành phố hoặc tên tỉnh hoặc tên quốc gia.
 * @param {*} username Tài khoản người dùng (không bắt buộc).
 * @param {*} password Mật khẩu người dùng (không bắt buộc).
 * @param {*} langCode Mã ngôn ngữ, mặc định là 'en'.
 * @param {*} areaType truyền dạng string: ARP - Airport, BAR - Neighborhood, COL - Cologne, CTY - City, EST - Train station, LOC - Location, PAS - Country, PRT - Port, PTI - Point of interest, REG - Region
 */
async function ZoneList(productType = '', keyword = '', username = '', password = '', langCode = appConfig.defaultLang, areaType = '') {
    let account = username == '' || password == '' ? {} : {
        "login": {
            "userName": username,
            "password": password
        }
    };
    let AreaType = areaType == '' ? {} : { "AreaType": areaType };
    let body = {
        "productType": productType,
        ...AreaType,
        "keyword": keyword,
        ...account,
        "langCode": langCode
    };

    let strBody = JSON.stringify(body);
    var res = await Utils.post_api(PREFIX + 'ZoneList', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

/**
 * @deprecated Thông tin thuộc tính chi tiết của khách sạn.
 * HotelCodes hoặc RatePlanCode nhận được từ HotelAvail, HotelCheckAvail.
 * BookingCode nhận được từ HotelBookingRules. Giới hạn tối đa 25 mã.
 * @param {*} code : HotelCodes hoặc BookingCode
 * @param {*} ratePlanCode RatePlanCode
 * @param {*} username Tài khoản người dùng (không bắt buộc).
 * @param {*} password Mật khẩu người dùng (không bắt buộc).
 * @param {*} langCode Mã ngôn ngữ, mặc định là 'en'.
 */

async function HotelContent(code = '', ratePlanCode = '', username = '', password = '', langCode = RootLang._keys) {
    let account = username == '' || password == '' ? {} : {
        "login": {
            "userName": username,
            "password": password
        }
    }
    let body = {
        "hotelList": typeof (code) === 'object' ? code : [{
            "code": code,
            "ratePlanCode": ratePlanCode
        }],
        ...account,
        "langCode": langCode
    }
    let strBody = JSON.stringify(body);
    var res = await Utils.post_api(PREFIX + 'HotelContent', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}


// Lấy danh sách quốc gia 
async function getListCountries(username = '', password = '', langCode = RootLang._keys) {
    let strBody = JSON.stringify({
        "langCode": langCode
    });
    var res = await Utils.post_api(PREFIX + 'Generic_Countries', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}
// Lấy danh sách mã quốc gia 
async function getListCountriescode(username = '', password = '', langCode = RootLang._keys) {
    let strBody = JSON.stringify({
        "login": {
            "userName": username,
            "password": password
        },
        "langCode": langCode
    })
    var res = await Utils.post_api(PREFIX + 'Countrylist', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}
async function getListCity(username = '', password = '', langCode = appConfig.defaultLang, countryCode) {
    let strBody = JSON.stringify({
        countryCode: countryCode,
        "login": {
            "userName": username,
            "password": password
        },
        "langCode": langCode
    })
    var res = await Utils.post_api(PREFIX + 'Citylist', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
};

async function HotelContentGetFromDB(code = '', ratePlanCode = '', username = '', password = '', langCode = RootLang._keys) {
    let account = username == '' || password == '' ? {} : {
        "login": {
            "userName": username,
            "password": password
        }
    }
    let body = {
        "hotelList": typeof (code) === 'object' ? code : [{
            "code": code,
            "ratePlanCode": ratePlanCode
        }],
        ...account,
        "langCode": langCode
    }
    let strBody = JSON.stringify(body);
    var res = await Utils.post_api(PREFIX + 'HotelContentGetFromDB', strBody, false, false);
    var response = Utils.handleResponse(res);
    return response;
}

export {
    hotelCatalogueData, CityList, HotelContent, ZoneList, getListCountries, HotelList, getListCountriescode,
    getListCity, HotelContentGetFromDB
}