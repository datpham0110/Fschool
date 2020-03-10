import Utils from '../app/Utils';
import { nGlobalKeys } from '../app/keys/globalKey';

const PREFIX = 'api/changepassword';

async function postChangePassword(OldPassword, NewPassword, ConfirmPassword) {
	let IDKHDPS = Utils.getGlobal(nGlobalKeys.rowId);
	let strBody = JSON.stringify({
		OldPassword: OldPassword,
		NewPassword: NewPassword,
		ConfirmPassword: ConfirmPassword,
		IdPhuHuynh: IDKHDPS
	});
	// console.log(strBody);
	let res = await Utils.post_apiToken(PREFIX, strBody, false, false);
	return res;
}

export { postChangePassword };
