import { combineReducers } 			from 'redux';
import {
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
	setListChildThuMoiSuKien,
	setFullname
} 									from './setData';

export default combineReducers({
	listchild: 						setListChild,
	listChilDattendance: 			setListChilDattendance,
	avatar: 						setAvatar,
	sumNotifyThongBao: 				setSumNotifyThongBao,
	sumNotifyThuMoiSuKien: 			setSumNotifyThuMoiSuKien,
	sumNotifyBaoBai: 				setSumNotifyBaoBai,
	listChildBaoBai: 				setListChildBaoBai,
	listChildChat: 					setListChildChat,
	sumNotifiAllApp: 				setSumNotifyAllApp, 
	listChildThongBaoAll: 			setListChildThongBaoAll,
	listChildThongBao: 				setListChildThongBao,
	listChildThuMoiSuKien: 			setListChildThuMoiSuKien,
	fullname: 						setFullname
});
