import Utils from "../app/Utils";
import Moment from "moment";

const PREFIX = "api/gochoatdong/";

async function HoatDong_List(more = false, pageNumber = 0, pageSize = 10, sortOrder = 'desc', sortField = 'NgayDang', data) {
    let body = {
        "data": [data],
        "query": {
            "more": more,
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "sortOrder": sortOrder,
            "sortField": sortField,
            "filter": {
                "IDLopHoc": data
            }
        }
    }
    let strBody = JSON.stringify(body);
    Utils.nlog(PREFIX + "HoatDong_List", strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX + 'HoatDong_List', strBody, false, false);
    return res;
}

async function HoatDong_Detail(IDRow, IDUser, pageNumber = 0, pageSize = 10, more = false, sortOrder = "", sortField = "") {
    Utils.nlog(PREFIX + "HoatDong_Detail?IDRow=" + IDRow + '&IDUser=' + IDUser)
    let body = {
        "more": more,
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": sortOrder,
        "sortField": sortField,
        "filter": {
            "IDRow": IDRow,
            "IDUser": IDUser
        }
    }
    let strBody = JSON.stringify(body);
    Utils.nlog('----------- body', strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX + "HoatDong_Detail", strBody, false, false);
    Utils.nlog("HoatDong_Detail?IDRow=", res)
    return res;
}

async function HoatDongCommentList(IDRow, IDUser, pageNumber = 0, pageSize = 10, more = false, sortOrder = "", sortField = "") {
    Utils.nlog(PREFIX + "HoatDongCommentList?IDRow=" + IDRow + '&IDUser=' + IDUser)
    let body = {
        "more": more,
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": sortOrder,
        "sortField": sortField,
        "filter": {
            "IDRow": IDRow,
            "IDUser": IDUser
        }
    }
    let strBody = JSON.stringify(body);
    Utils.nlog('----------- body', strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX + "HoatDong_Comment_List", strBody, false, false);
    Utils.nlog("HoatDong_Detail?IDRow=", res)
    return res;
}

async function HoatDong_Comment(IDRowHoatDong, NoiDung, TenNguoiBL, IDNguoiBL) {
    let body = {
        "IDRowHoatDong": IDRowHoatDong,
        "NoiDung": NoiDung,
        "TenNguoiBL": TenNguoiBL,
        "IDNguoiBL": IDNguoiBL
    }
    let strBody = JSON.stringify(body);
    let res = await Utils.post_apiTokenHeader(PREFIX + "HoatDong_Comment", strBody, false, false);
    return res;
}

async function HoatDong_TuongTac(TuongTac, IDRow, IDUser) {
    Utils.nlog(PREFIX + "HoatDong_TuongTac?TuongTac=" + TuongTac + '&IDRow=' + IDRow, IDUser)
    let res = await Utils.post_apiTokenHeader(PREFIX + "HoatDong_TuongTac?TuongTac=" + TuongTac + '&IDRow=' + IDRow + '&IDUser=' + IDUser, 'body', false, false);
    return res;
}
export { HoatDong_List, HoatDong_Detail, HoatDongCommentList, HoatDong_Comment, HoatDong_TuongTac };
