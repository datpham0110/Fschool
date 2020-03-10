import Utils from '../app/Utils';
import { nGlobalKeys } from '../app/keys/globalKey';

const PREFIX = 'api/chitiethocphi/';
const PREFIX1 = 'api/hocphi/';


async function getchiethocphi(thang1, nam1, thang2, nam2, IDKhachHang) {

    strBody = JSON.stringify({
        TuThang: thang1 + '/' + nam1,
        DenThang: thang2 + '/' + nam2,
        IDHocSinh: IDKhachHang
    })
    Utils.nlog('strBody', strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX1 + 'lichsuthanhtoan_v2', strBody, false, false);
    Utils.nlog('res', res)
    return res;
}
export { getchiethocphi }