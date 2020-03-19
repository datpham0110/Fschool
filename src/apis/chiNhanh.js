import Utils from '../app/Utils';

const PREFIX = 'api/chinhanh';
const PREFIX1 = 'api/chinhanh_List';

async function getListChiNhanh() {
    let res = await Utils.get_api(PREFIX, false, false);
    Utils.nlog('------------------- getListChiNhanh', res)
    return res;
}
async function getListChiNhanhV2(tenchinhanh = '', pageNumber = 0, pageSize = 300) {
    let strBody = JSON.stringify({
        "filter": {
            "TenChiNhanh": tenchinhanh
        },
        "more": false,
        "pageNumber": pageNumber,
        "pageSize": pageSize,
        "sortOrder": "desc",
        "sortField": ""
    })
    Utils.nlog('------------------- getListChiNhanh', PREFIX1)
    Utils.nlog('------------------- getListChiNhanh body', strBody)
    let res = await Utils.post_apiTokenHeader(PREFIX1, strBody, false, false);
    Utils.nlog('------------------- getListChiNhanh', res)
    return res;
}
export {
    getListChiNhanh, getListChiNhanhV2
};
