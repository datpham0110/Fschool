import Utils from "../app/Utils";
import Moment from "moment";

const PREFIX = "api/gochoctap/";
// async function GocHocTap_Create(IDNhomKH, TenNhomKH, IDMonHoc, NoiDung, Ngay, ThoiGian, ListHinhAnh, ListHocSinh) {
//     Utils.nlog('IDMonHoc', IDMonHoc)
//     let hours = Moment(new Date(), 'MM/DD/YYYY h:m:s A').format("hh:mm");
//     let body = {
//         "IDNhomKH": IDNhomKH,
//         "TenNhomKH": TenNhomKH,
//         "IDMonHoc": IDMonHoc,
//         "NoiDung": NoiDung,
//         "Ngay": Ngay,
//         "ThoiGian": hours,
//         "ListHinhAnh": ListHinhAnh,
//         "ListHocSinh": ListHocSinh
//     }
//     let strBody = JSON.stringify(body);
//     Utils.nlog('strBody', strBody)
//     let res = await Utils.post_apiTokenHeader(PREFIX + "GocHocTap_Create", strBody, false, false);
//     return res;
// }
async function GocHocTap_List(IDHocSinh, IDLopHoc, NgayThang) {
    Utils.nlog(PREFIX + "GocHocTap_List?IDHocSinh=" + IDHocSinh + '&IDLopHoc=' + IDLopHoc + '&NgayThang=' + NgayThang)
    let res = await Utils.post_apiTokenHeader(PREFIX + "GocHocTap_List?IDHocSinh=" + IDHocSinh + '&IDLopHoc=' + IDLopHoc + '&NgayThang=' + NgayThang, 'ss', false, false);
    Utils.nlog(PREFIX + 'GocHocTap_List?IDHocSinh', res)
    return res;
}
async function GocHocTapDetail(IDGocHocTap) {
    Utils.nlog(PREFIX + "GocHocTap_Detail?IDGocHocTap=" + IDGocHocTap)
    let res = await Utils.post_apiTokenHeader(PREFIX + "GocHocTap_Detail?IDGocHocTap=" + IDGocHocTap, 'ddd', false, false);
    return res;
}
export { GocHocTap_List, GocHocTapDetail };
