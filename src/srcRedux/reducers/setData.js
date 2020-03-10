import {
	SET_AVATAR,
	SET_LIST_CHILD,
	SET_LIST_ATTENDANCE,
	SET_SUM_NOTIFY_THONGBAO,
	SET_SUM_NOTIFY_THUMOISUKIEN,
	SET_SUM_NOTIFY_BAOBAI,
	SET_LIST_CHILD_BAOBAI,
	SET_LIST_CHILD_CHAT,
	SET_SUM_NOTIFY_ALL_APP,  // Notify bell all app
	SET_LIST_CHILD_THONGBAO_ALL,
	SET_LIST_CHILD_THONGBAO,
	SET_LIST_CHILD_THUMOISUKIEN
} from '../actions/type';

const initialState = {};


function setListChildChat(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD_CHAT:
			return action.data;
		default:
			return state;
	}
}


function setListChild(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD:
			return action.data;
		default:
			return state;
	}
}


function setListChilDattendance(state = [], action) {
	switch (action.type) {
		case SET_LIST_ATTENDANCE:
			return action.data;
		default:
			return state;
	}
}
function setAvatar(state = [], action) {
	switch (action.type) {
		case SET_AVATAR:
			return action.data;
		default:
			return state;
	}
}


function setSumNotifyThongBao(state = [], action) {
	switch (action.type) {
		case SET_SUM_NOTIFY_THONGBAO:
			return action.data;
		default:
			return state;
	}
}

function setSumNotifyThuMoiSuKien(state = [], action) {
	switch (action.type) {
		case SET_SUM_NOTIFY_THUMOISUKIEN:
			return action.data;
		default:
			return state;
	}
}

function setSumNotifyBaoBai(state = [], action) {
	switch (action.type) {
		case SET_SUM_NOTIFY_BAOBAI:
			return action.data;
		default:
			return state;
	}
}


function setListChildBaoBai(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD_BAOBAI:
			return action.data;
		default:
			return state;
	}
}


function setSumNotifyAllApp(state = [], action) {
	switch (action.type) {
		case SET_SUM_NOTIFY_ALL_APP:
			return action.data;
		default:
			return state;
	}
}

function setListChildThongBaoAll(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD_THONGBAO_ALL:
			return action.data;
		default:
			return state;
	}
}

function setListChildThongBao(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD_THONGBAO:
			return action.data;
		default:
			return state;
	}
}

function setListChildThuMoiSuKien(state = [], action) {
	switch (action.type) {
		case SET_LIST_CHILD_THUMOISUKIEN:
			return action.data;
		default:
			return state;
	}
}


export {
	setListChild,
	setListChilDattendance,
	setAvatar,
	setSumNotifyThongBao,
	setSumNotifyThuMoiSuKien,
	setSumNotifyBaoBai,
	setListChildBaoBai,
	setListChildChat,
	setSumNotifyAllApp,
	setListChildThongBaoAll,
	setListChildThongBao,
	setListChildThuMoiSuKien
};
