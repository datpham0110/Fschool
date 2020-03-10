import Utils from '../app/Utils';
import { RootLang } from '../app/data/locales';
import { appConfig } from '../app/Config';
import { localeData } from 'moment';
const PREFIX = 'Payments/VT_PaymentRead?';
let res = '';
async function checkPaymentTransfer(idoder, idtrans = -1) { //idtrans mặt định truyền -1
    res = await Utils.get_api(PREFIX + 'idorder=' + idoder + '&idtrans=' + idtrans, false, false);
    res = Utils.handleResponse(res);
    Utils.nlog('check tinh trang da thanh toan hay chua', res)
    return res;
}
export { checkPaymentTransfer };
//api check tình trang KH đã thanh toán chuyển khoản hay chưa.