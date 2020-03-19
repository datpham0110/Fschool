import {
	SETCOUNTRY,
	SETLANGUAGE,
	SETPROFILES,
	SET_REQUEST_FLIGHT_AVAIL,
	SET_FLIGHT_VALUES,
	SET_ITEM_FLIGHT_AVAIL,
	SET_FLIGHT_HOLDER_CONTACT,
	SET_FLIGHT_PAX,
	SET_VALUE_FILTER_FLIGHT,
	SET_REQUEST_FILTER_FLIGHT,
	SET_LIST_CHILD,
	SET_AVATAR,
	SET_SUM_NOTIFY_THONGBAO,
	SET_SUM_NOTIFY_THUMOISUKIEN,
	SET_SUM_NOTIFY_BAOBAI,
	SET_LIST_CHILD_BAOBAI,
	SET_LIST_CHILD_CHAT,
	SET_SUM_NOTIFY_ALL_APP, // Notify bell all app
	SET_LIST_CHILD_THONGBAO_ALL,
	SET_LIST_CHILD_THONGBAO, 
	SET_LIST_CHILD_THUMOISUKIEN,
	SET_FULLNAME
} from './type';

export const setCountry = (val) => ({ type: SETCOUNTRY, data: val });
export const setLanguage = (val) => ({ type: SETLANGUAGE, data: val });
export const setProfiles = (val) => ({ type: SETPROFILES, data: val });
export const setRequestFlight = (val) => ({ type: SET_REQUEST_FLIGHT_AVAIL, data: val });
export const setFlightValues = (val) => ({ type: SET_FLIGHT_VALUES, data: val });
export const setItemFlightAvail = (val) => ({ type: SET_ITEM_FLIGHT_AVAIL, data: val });
export const setFlightHolderContact = (val) => ({ type: SET_FLIGHT_HOLDER_CONTACT, data: val });
export const setFlightPax = (val) => ({ type: SET_FLIGHT_PAX, data: val });
export const setValueFilterFlight = (val) => ({ type: SET_VALUE_FILTER_FLIGHT, data: val });
export const setListChild = (val) => ({ type: SET_LIST_CHILD, data: val });
export const setAvatar = (val) => ({ type: SET_AVATAR, data: val });
export const setSumNotifyThongBao = (val) => ({ type: SET_SUM_NOTIFY_THONGBAO, data: val });
export const setSumNotifyThuMoiSuKien = (val) => ({ type: SET_SUM_NOTIFY_THUMOISUKIEN, data: val });
export const setSumNotifyBaoBai = (val) => ({ type: SET_SUM_NOTIFY_BAOBAI, data: val });
export const setSumNotifyAllApp = (val) => ({ type: SET_SUM_NOTIFY_ALL_APP, data: val }); // Notify bell all app
export const setListChildBaoBai = (val) => ({ type: SET_LIST_CHILD_BAOBAI, data: val });
export const setListChildChat = (val) => ({ type: SET_LIST_CHILD_CHAT, data: val });
export const setListChildThongBaoAll = (val) => ({ type: SET_LIST_CHILD_THONGBAO_ALL, data: val });
export const setListChildThongBao = (val) => ({ type: SET_LIST_CHILD_THONGBAO, data: val });
export const setListChildThuMoiSuKien = (val) => ({ type: SET_LIST_CHILD_THUMOISUKIEN, data: val });
export const setFullname = (val) => ({ type: SET_FULLNAME, data: val });

