import * as User from "./users";
// import * as Avail from "./avail";
import * as Static from "./static";
// import * as Content from "./contents";
import * as Payments from "./payment";
// import * as Msc from "./msc";
import * as StaticDataTransactions from './StaticDataTransactions';
import * as ThanhToan from './thanhtoan';
// import * as GetRating from './getRating'
import { getFacilityTypeList } from './getFacilityTypeList';
import { getImagesHotel } from './getImagesHotel';
// import * as CheckTransactions from './checkTransaction';
import { checkPaymentTransfer } from './checkPaymentTransfer';
import ListThoiKhoaBieu from './thoiKhoaBieu';
// import { getPaymentBankTransferList } from './getPaymentBankTransferList';
// import { getConfirmPayment } from './getConfirmPayment';
// import * as ETour from './etour';
export default {
    User, Static, Payments, StaticDataTransactions, getFacilityTypeList, getImagesHotel,
    checkPaymentTransfer, ListThoiKhoaBieu, ThanhToan
};
