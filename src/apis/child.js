import Utils from '../app/Utils';
const PREFIX = 'api/hocsinh/';
const PREFIX1 = 'api/dangkytaikhoan/';

async function listchild(IdPhuHuynh) {
	var res = await Utils.get_apiToken(PREFIX + `all?IdTaiKhoanPhuHuynh=` + IdPhuHuynh, true, true);
	return res;
}
async function deleteChildToAccount(msChild) {
	let strBody = JSON.stringify({
		MaKhachHang: msChild
	})
	Utils.nlog('----------------------- strBody', strBody)
	Utils.nlog(PREFIX1 + `XoaHocSinh?MaKhachHang=` + msChild)
	let res = await Utils.post_apiToken(PREFIX1 + `XoaHocSinh?MaKhachHang=` + msChild, strBody, false, false)
	Utils.nlog('----------------------- res', res)
	return res
}
export { listchild, deleteChildToAccount };
