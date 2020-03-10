import Utils from '../app/Utils';
import { RootLang } from '../app/data/locales';
import { appConfig } from '../app/Config';
import { localeData } from 'moment';

const PREFIX = 'StaticDataTransactions/';
let res = null;
let codeTemp = [];
async function getDestinationZone(DestinationZone, langCode = appConfig.defaultLang) {
    let strBody = JSON.stringify({
        "zoneCode": DestinationZone, //array
        "langCode": langCode,
        "login": {
            "userName": "string",
            "password": "string"
        },
    })
    res = await Utils.post_api(PREFIX + 'ArrayZone', strBody, false, false);
    res = Utils.handleResponse(res);
    return res;
};

async function getImagesHotel(arrCode, langCode = appConfig.defaultLang) {
    arrCode.forEach(item => {
        codeTemp.push({ 'code': item })
    });
    let strBody = JSON.stringify({
        "hotelList": codeTemp,
        "langCode": langCode
    })
    res = await Utils.post_api(PREFIX + 'HotelContent/GetFromDB', strBody, false, false);
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


export { getDestinationZone, getImagesHotel, getImagesDetailHotel }