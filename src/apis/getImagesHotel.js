import Utils from '../app/Utils';
import { RootLang } from '../app/data/locales';
import { appConfig } from '../app/Config';
import { localeData } from 'moment';

const PREFIX = 'StaticDataTransactions/HotelContent';
let codeTemp = [];
let res = '';
async function getImagesHotel(arrCode, langCode = appConfig.defaultLang) {
    arrCode.forEach(item => {
        codeTemp.push({ 'code': item })
    });
    let strBody = JSON.stringify({
        "hotelList": codeTemp,
        "langCode": langCode
    })
    res = await Utils.post_api(PREFIX + 'GetFromDB', strBody, false, false);
    res = Utils.handleResponse(res);
    return res;
}
async function getImagesDetailHotel(arrCode, langCode = appConfig.defaultLang) {
    arrCode.forEach(item => {
        codeTemp.push({ 'code': item })
    });
    let strBody = JSON.stringify({
        "hotelList": codeTemp,
        "langCode": langCode
    })
    res = await Utils.post_api(PREFIX, strBody, false, false);
    res = Utils.handleResponse(res);
    return res;
}

export { getImagesHotel }