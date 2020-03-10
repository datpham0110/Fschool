import Utils from "../app/Utils"

const PREFIX = "api/khaosat/"

async function KhaoSat_List(more = false, pageNumber = 0, pageSize = 10, sortOrder = 'desc', sortField = 'Tim', data, TrangThai) {
    let body = {
        "more": more,
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": sortOrder,
        "sortField": sortField,
        "filter": {
            "IDLopHoc": data,
            "TrangThai": TrangThai
        }
    }
    let strBody = JSON.stringify(body);
    Utils.nlog(PREFIX + "KhaoSat_List", strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX + 'KhaoSat_List', strBody, false, false);
    return res;
}
async function KhaoSat_Detail(IDRow) {
    let res = await Utils.post_apiTokenHeader(PREFIX + 'KhaoSat_Detail?IDRow=' + IDRow, 'dd', false, false);
    return res;
}

async function KhaoSat_Reply(IDRowKS, ChiTiet = []) {
    let body = {
        "IDRowKS": IDRowKS,
        "ChiTiet": ChiTiet
    }
    let strBody = JSON.stringify(body);
    Utils.nlog(PREFIX + "KhaoSat_Reply", strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX + 'KhaoSat_Reply', strBody, false, false);
    return res;
}

export { KhaoSat_List, KhaoSat_Detail, KhaoSat_Reply }
