import Utils from '../app/Utils';
import { RootLang } from '../app/data/locales';
import { appConfig } from '../app/Config';
import { localeData } from 'moment';

const domain = 'https://app.tripu.vn/';
const PREFIX = 'VT_Content/FacilityTypeList';
let res = '';
async function getFacilityTypeList() {
    try {
        let strBody = JSON.stringify({
            "langCode": RootLang._keys
        });
        const response = await fetch(domain + PREFIX,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'InternalToken': '04312E1F-BE6A-4D93-B222-608308A06B8A'
                },
                body: strBody
            });
        res = await response.json();
        if (res.ExceptionMessage != undefined) { // edit tuỳ từng object api
            Utils.nlog('[API]Lỗi API:', res);
            return -3;
        }
        res = Utils.handleResponse(res);
        return res;
    }
    catch (error) {
        Utils.nlog('[API]Lỗi error:', error);
        return -1;
    };

    // let strBody = JSON.stringify({
    //     "langCode": RootLang._keys
    // });
    // res = await Utils.post_api(PREFIX, strBody, false, false);
    // res = Utils.handleResponse(res);
    // return res;
}

export { getFacilityTypeList }