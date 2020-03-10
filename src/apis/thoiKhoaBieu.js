import Utils from "../app/Utils";
import { nkey } from "../app/keys/keyStore";
import { nGlobalKeys } from "../app/keys/globalKey";

const PREFIX = "api/thoikhoabieu/";

async function ListThoiKhoaBieu(IDKhachHang) {
    let body = {
        more: false,
        pageNumber: 0,
        pageSize: 10,
        sortOrder: '',
        sortField: '',
        filter: {
            "IDHocSinh": IDKhachHang,
        }
    }
    let strBody = JSON.stringify(body);
    // console.log('body', body);
    let res = await Utils.post_apiTokenHeader(PREFIX + 'ThoiKhoaBieu_List_App', strBody, false, false)
    return res;
};

export default ListThoiKhoaBieu;

