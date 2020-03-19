import Utils from "../app/Utils";
import Moment from "moment";

const PREFIX = "api/gochoctap/";

async function GocHocTap_List(IDHocSinh, IDLopHoc, NgayThang) {
    let res = await Utils.post_apiTokenHeader(PREFIX + "GocHocTap_List?IDHocSinh=" + IDHocSinh + '&IDLopHoc=' + IDLopHoc + '&NgayThang=' + NgayThang, 'ss', false, false);
    return res;
}
async function GocHocTapDetail(IDGocHocTap) {
    let res = await Utils.post_apiTokenHeader(PREFIX + "GocHocTap_Detail?IDGocHocTap=" + IDGocHocTap, 'ddd', false, false);
    return res;
}
export { GocHocTap_List, GocHocTapDetail };
