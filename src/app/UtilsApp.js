import { nkey } from './keys/keyStore';
import { RootLang } from './data/locales';
import apis from '../apis';
import Utils from './Utils';
import { nGlobalKeys } from './keys/globalKey';

//function click yêu thích
async function clickLove(nthis, hotelCode, objSearchHotel) {
	const token = await Utils.ngetStore(nkey.token);
	if (token != null) {
		const res = await apis.User.WatchListHotelSave(
			objSearchHotel.destinationZone,
			objSearchHotel.start,
			objSearchHotel.end,
			hotelCode,
			objSearchHotel.rooms,
			objSearchHotel.adults,
			objSearchHotel.children.length,
			objSearchHotel.children
		);
	} else {
		Utils.showMsgBoxOK(
			nthis,
			RootLang.lang.notification,
			RootLang.lang.youneedtobeloggedintoperformthisaction,
			RootLang.lang.ok
		);
	}
}

// làm tròn rating , max Rating là 5.
function roundRating(number) {
	let rating = null;
	if (`${number}`.length <= 3) {
		rating = number.toFixed(1);
		return rating;
	} else {
		rating = Math.floor(number * 10 + 1) / 10;
		return rating;
	}
}

function AdultChildrenRoom(adults = 1, children = 0, rooms = 1) {
	const data = `${adults} ${RootLang.lang.Adult} ${children.length == 0 ? '' : children.length}${children.length == 0
		? ''
		: RootLang.lang.Children}${children.length == 0
		? ''
		: children.length != 0 && rooms != '' ? ', ' : ''}${rooms} ${rooms != '' ? RootLang.lang.rooms : ''}`;
	return data;
}

function getNumberStar(numberStar) {
	// example numberStar = '2est'
	let sl = Number.parseInt(numberStar);
	if (Number.isNaN(sl)) return (sl = 0);
	return sl;
}

function checkExpiredPayment(nthis) {
	const check = Utils.getGlobal(nGlobalKeys.checkExpiredPayment);
	if (check) {
		Utils.showMsgBoxOK(nthis, RootLang.lang.notification, RootLang.lang.paymenttimedoutpleasereset);
		return true;
	} else return false;
}

//  Children: mặc định 5 tuổi
//	Infants: mặc định 1 tuổi
function getRelPaxesDist_Pax_Flights(Adult, Child, Infant) {
	let relPax = [];
	let Pax = [];
	let Sum = Adult + Child + Infant;

	for (let i = 1; i <= Sum; i++) {
		let id = i;
		let age = 30;
		if (i <= Adult) age = 30;
		if (i > Adult && i <= Adult + Child) age = 5;
		if (i > Adult + Child) age = 1;

		Pax.push({ idPax: id, age: age });
		relPax.push(id);
	}
	return {
		relPaxesDist: [ { relPax: relPax } ],
		pax: Pax
	};
}

//-------END---------
export default {
	getNumberStar,
	clickLove,
	roundRating,
	AdultChildrenRoom,
	checkExpiredPayment,
	getRelPaxesDist_Pax_Flights
};
