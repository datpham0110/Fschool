import Utils from '../app/Utils';
import { RootLang } from '../app/data/locales';
import { NetworkInfo } from "react-native-network-info";
const PREFIX = 'Payment/';

async function getIP() {
    const ipv4Address = await NetworkInfo.getIPV4Address();
    return ipv4Address;
}
async function paymentVNPay(amount, locator, idorder) { // hiện tại amount truyền = 0 vì trên BE đã tự lấy số tiền từ DB ra.
    const returnurl = 'HotelBooking%2FCheckoutMobile%3Flocator=' + locator;
    Utils.nlog('link', PREFIX + 'VNPAYPayment?amount=' + amount + '&locator=' + locator + '&returnurl=' + returnurl + '&idorder=' + idorder + '&vnp_IpAddr=' + `${getIP()}`);
    let res = await Utils.get_api(PREFIX + 'VNPAYPayment?amount=' + 0 + '&locator=' + locator + '&returnurl=' + returnurl + '&idorder=' + idorder + '&vnp_IpAddr=' + '192.168.2.76', false, false);
    Utils.nlog('paymentVNPay', res)
    res = Utils.handleResponse(res, true);
    return res;
}

async function paymentPayoo(amount, locator, idorder, currency = 'VND', type = 1) {
    const returnurl = 'HotelBooking%2FCheckoutPayooMobile%3Flocator=' + locator;
    let res = await Utils.get_api(PREFIX + 'PayooURL?amount=' + amount + '&locator=' + locator + '&returnurl=' + returnurl + '&idorder=' + idorder + '&currency=' + currency + '&type=' + type, false, false);
    Utils.nlog('paymentPayoo1111', res)
    // res = Utils.handleResponse(res, true);
    return res;
}

async function paymentTransfer(amount, currency, idorder, bankName, idBank) {
    let res = await Utils.get_api(PREFIX + 'TransferPayment?amount=' + amount + '&currencyCode=' + currency + '&idorder=' + idorder + '&bankName=' + bankName + '&idBank=' + idBank, false, false);
    res = Utils.handleResponse(res, true);
    Utils.nlog('paymentTransfer', res)
    return res;
}

async function paymentBillingCode(amount, idorder, PaymentExpireDate, langCode = RootLang._keys) {

    let strBody = JSON.stringify({
        "idOrder": idorder,
        "amount": amount,
        "paymentExpireDate": PaymentExpireDate,
        "langcode": langCode,
        "typePayment": 1,
        "linkCustomerConfirmPayment": 'linking'
    });
    // const response = await fetch('http://192.168.2.24:80/Payment/GetBillingCode',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: strBody
    //     });
    // let res = await response.json();
    let res = await Utils.post_api(PREFIX + 'GetBillingCode', strBody, false, false);
    res = Utils.handleResponse(res, true);
    Utils.nlog('paymentBillingCode', res)

    return res;
}

/**
 * @description Giử xác nhận đặt phòng tới mail của khách hàng.
 * Trả về kết quả gửi.
 * Dùng api 'Ord_Orders_Payment_SentMailConfirmBooking'.
 * @param {*} IdOrder Mã được trả về từ api BookingHistoryDetail
 */
async function sentMailConfirmBooking(IdOrder) {
    let res = await Utils.get_apiToken(PREFIX + 'Ord_Orders_Payment_SentMailConfirmBooking?IdOrder=' + IdOrder)
    let response = Utils.handleResponse(res);
    return response;
}

export {
    paymentVNPay, paymentPayoo, paymentTransfer, paymentBillingCode,
    sentMailConfirmBooking, getIP
}