import React, { Component } from "react";
import Utils from "../../app/Utils";
import {
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	ScrollView
} from "react-native";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, sizes } from "../../styles";
import { nkey } from "../../app/keys/keyStore";
import { Images } from "../../images";
import { nGlobalKeys } from "../../app/keys/globalKey";
import OneSignal from 'react-native-onesignal';
import { notifyParents, infoPhuhuyenh } from '../../apis/welcome';
const { width, height } = Dimensions.get("window");
import { ThongBao_ListAll_App, ThongBao_ListAll_App_V2 } from '../../apis/notifycation';

import ButtonCom from "../../components/Button/ButtonCom"
import { updateAvatarHS } from "../../apis/apiLogin";
import { appConfig } from "../../app/Config";
import { nstyles } from "../../styles/styles";
import IsLoading from "../../components/IsLoading";
export const db1 = db.database();
import { db } from '../../app/Config';
class MenuRight extends Component {
	constructor(props) {
		super(props);
		this.onOpened = this.onOpened.bind(this);
		let temp = props.listchild.length == 0 ? 0 : props.listchild[0].MaKhachHang;
		let tenKH =
			props.listchild.length == 0 ? 0 : props.listchild[0].TenKhachHang;
		let gioitinh =
			props.listchild.length == 0 ? 0 : props.listchild[0].GioiTinh;
		let IDKhachHang =
			props.listchild.length == 0 ? 0 : props.listchild[0].IDKhachHang;
		let IDChiNhanhHocSinh =
			props.listchild.length == 0 ? 0 : props.listchild[0].IDChiNhanh;
		let childSelect = props.listchild.length == 0 ? undefined : props.listchild[0];
		this.state = {
			listHocSinh: [],
			fullname: "",
			idHocSinh: temp,
			id: 0,
			imagesUpload: [{}, {}],
			infomationAccount: Utils.getGlobal(nGlobalKeys.informationAccount, '')
		};
		Utils.setGlobal(nGlobalKeys.childSelected, childSelect);
		Utils.setGlobal(nGlobalKeys.IdHocSinh, temp);
		Utils.setGlobal(nGlobalKeys.tenKH, tenKH);
		Utils.setGlobal(nGlobalKeys.GioiTinh, gioitinh);
		Utils.setGlobal(nGlobalKeys.IDKhachHang, IDKhachHang);
		Utils.setGlobal(nGlobalKeys.IDChiNhanhHocSinh, IDChiNhanhHocSinh);
	}
	dsHocSinh = async () => {
		//   //Lấy list
		db1.ref('/Tbl_HocSinh').on('value', (snapshot) => {
			let data = snapshot.val();
			// let keys = Object.keys(data);
			let items = Object.values(data);
			// let items2 = data[keys[0]];
			if (items != null) {
				for (let i = 0; i < items.length; i++) {
					items[i].isDiemDanh = -1
				}
				Utils.nlog('dsHocSinh------------', items)
				this.setState({ listHocSinh: items })
			} else {
				Utils.showMsgBoxOK(this, 'Thông báo', 'Không có học sinh để hiển thị', 'Đóng')
			}
		});
	}
	componentDidMount() {
		this.dsHocSinh()
		// OneSignal.addEventListener('opened', this.onOpened);
		// this._getData();
		// this._loadDataInfomation();
	}
	_loadDataInfomation = async () => {
		this._notifyThongBao();
		this._notifyThuMoiSuKien();
		this._notifyBaoBai();
		this._loadDataNotifyShow();
		this._notifyThongBaoAll();
	}
	_notifyThongBao = async () => {
		let res = await notifyParents(1); // Thông báo 1
		if (res.success == true) {
			if (res.data.HocSinh.length > 0) {
				this.props.setSumNotifyThongBao(this._sumNotify(res.data.HocSinh));
				this.props.setListChildThongBao(res.data.HocSinh)
			}
			else {
				this.props.setSumNotifyThongBao(0);
				this.props.setListChildThongBao([])

			}
		} else {
			this.props.setSumNotifyThongBao(0);
			this.props.setListChildThongBao([])

		}
	}
	_notifyThongBaoAll = async () => {
		let res = await notifyParents(0); // Thông báo all
		if (res.success == true) {
			if (res.data.HocSinh.length > 0) {
				this.props.setListChildThongBaoAll(res.data.HocSinh)
			}
			else {
				this.props.setListChildThongBaoAll([]);
			}
		} else {
			this.props.setListChildThongBaoAll([]);
		}
	}

	_notifyThuMoiSuKien = async () => {
		let res = await notifyParents(7); // Thư mời sự kiện 7
		if (res.success == true) {
			if (res.data.HocSinh.length > 0) {
				this.props.setSumNotifyThuMoiSuKien(this._sumNotify(res.data.HocSinh));
				this.props.setListChildThuMoiSuKien(res.data.HocSinh)
			}
			else {
				this.props.setSumNotifyThuMoiSuKien(0);
				this.props.setListChildThuMoiSuKien([])
			}
		} else {
			this.props.setSumNotifyThuMoiSuKien(0);
			this.props.setListChildThuMoiSuKien([])
		}
	}

	_notifyBaoBai = async () => {
		let res = await notifyParents(2); // Báo bài 2
		if (res.success == true) {
			if (res.data.HocSinh.length > 0) {
				this.props.setSumNotifyBaoBai(this._sumNotify(res.data.HocSinh));
				this.props.setListChildBaoBai(res.data.HocSinh)
			}
			else {
				this.props.setSumNotifyBaoBai(0);
				this.props.setListChildBaoBai([])

			}
		} else {
			this.props.setListChildBaoBai([]);
			this.props.setSumNotifyBaoBai(0);
		}
	}
	_loadDataNotifyShow = async () => {
		let res = await ThongBao_ListAll_App_V2(0, 0);
		if (res.success == true && res.data != null) {
			this.props.setSumNotifyAllApp(res.CountTT > 100 ? 99 : res.CountTT);
		} else {
			this.props.setSumNotifyAllApp([]);
		}
	}

	_sumNotify = (data) => {
		let count = 0;
		for (let i = 0; i < data.length; i++) {
			count += data[i].Soluong;
		}
		return count;
	}

	onOpened(openResult) {
		this._loadDataInfomation();
		let dataNotifycation1 = openResult.notification.payload.additionalData.data;
		if (dataNotifycation1.TypeNew == 'KetQuaHocTap') {
			Utils.goscreen(this, 'sc_KetQuaHocTap')
			return;
		}
		if (dataNotifycation1.TypeNew == 'GochocTap') {
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'gochoctap') {
				Utils.goback(nthisApp);
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_GochocTapp', { flagNoyify: true, data: dataNotifycation1 })
				}, 200);
				return;
			} else {
				Utils.goscreen(this, 'sc_GochocTapp', { flagNoyify: true, data: dataNotifycation1 })
			}
		}
		if (dataNotifycation1.TypeNew == 'ThuMoiSuKien') {
			Utils.goscreen(this, 'sc_ThuMoiSuKien', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
			return;
		}
		if (dataNotifycation1.TypeNew == 'GocHoatDong') {
			Utils.goscreen(this, 'sc_GocHoatDongHome', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
			return;
		}
		if (dataNotifycation1.TypeNew == 'ThoiKhoaBieu') {
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'ThoiKhoaBieu') {
				Utils.goback(nthisApp)
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_ThoiKhoaBieu', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
				}, 200);
				return;
			} else {
				Utils.goscreen(this, 'sc_ThoiKhoaBieu', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotify: true })
				return;
			}
		}

		if (dataNotifycation1.TypeNew == 'KhaoSat') {
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'KhaoSat') {
				Utils.goback(nthisApp)
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_KhaosatHome', { flagNotify: true })
				}, 200);
				return;
			} else {
				Utils.goscreen(this, 'sc_KhaosatHome')
				return;
			}
		}
		if (dataNotifycation1.TypeNew == 'GhiChu') {
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'sc_ListBaoBai') {
				Utils.goback(nthisApp)
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
				}, 200);
				return;
			}
			else {
				Utils.goscreen(this, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
				return;
			}
		}
		if (dataNotifycation1.TypeNew == 'BaoBai') {
			Utils.nlog('nGlobalKeys.screenChatDetailSelected-', Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, ''))
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'sc_ListBaoBai') {
				Utils.goback(nthisApp)
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
				}, 200);
				return;
			}
			else {
				Utils.goscreen(this, 'sc_ListBaoBai', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
				return;
			}
		}
		if (dataNotifycation1.TypeNew == 'DiemDanh') {
			if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'DiemDanh') {
				Utils.goback(nthisApp)
				setTimeout(() => {
					Utils.goscreen(nthisApp, 'sc_Diemdanh', { IDHocSinh: dataNotifycation1.IDHocSinh })
				}, 200);
				return;
			} else {
				Utils.goscreen(this, 'sc_Diemdanh', { IDHocSinh: dataNotifycation1.IDHocSinh })
				return;
			}
		}
		if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ThongBao') {
			Utils.goscreen(this, 'sc_ThongBao', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
			return;
		}
		if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/HocPhi') {
			Utils.goscreen(this, 'sc_ListChildThongBaoAll', { IDHocSinh: dataNotifycation1.IDHocSinh, flagNotifiy: true })
			return;
		}
		if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/ListTeacher') {
			Utils.nlog('-------------------------------------dataNotifycation1', dataNotifycation1)
			if (dataNotifycation1.LoaiChat == '1') {
				//Chat one-one
				if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
					Utils.goback(nthisApp)
					setTimeout(() => {
						Utils.goscreen(nthisApp, "sc_Chat", {
							IDGiaoVien: dataNotifycation1.IdTeacher,
							IdTaiKhoan: dataNotifycation1.IdTaiKhoan,
							FullName: dataNotifycation1.TenNguoiGui,
							isGroup: false,
							flagChatGroup: false,
							flagNotify: true,
							dataChatSimpleNotify: dataNotifycation1.GhiChu,
							dataAll: dataNotifycation1
						})
					}, 200);
					return;
				} else {
					Utils.goscreen(nthisApp, "sc_Chat", {
						IDGiaoVien: dataNotifycation1.IdTeacher,
						IdTaiKhoan: dataNotifycation1.IdTaiKhoan,
						FullName: dataNotifycation1.TenNguoiGui,
						isGroup: false,
						flagChatGroup: false,
						flagNotify: true,
						dataChatSimpleNotify: dataNotifycation1.GhiChu,
						dataAll: dataNotifycation1
					})
					return;
				}
			} else {
				// Group chat lớp TỰ TẠO 
				if (dataNotifycation1.LoaiChat == '3') {
					if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
						// Utils.goback(nthisApp)
						Utils.goback(nthisApp)
						setTimeout(() => {
							Utils.goscreen(nthisApp, "sc_Chat", {
								IdGroup: dataNotifycation1.IdGroup,
								LoaiChat: dataNotifycation1.LoaiChat,
								TenGroup: dataNotifycation1.TenGroup,
								flagChatGroup: true,
								flagNotify: true,
								dataChatGroupNotify: dataNotifycation1
							})
						}, 200);
						return;
					} else {
						Utils.goscreen(nthisApp, "sc_Chat", {
							IdGroup: dataNotifycation1.IdGroup,
							LoaiChat: dataNotifycation1.LoaiChat,
							TenGroup: dataNotifycation1.TenGroup,
							flagChatGroup: true,
							flagNotify: true,
							dataChatGroupNotify: dataNotifycation1
						})
					}
				} else {
					if (Utils.getGlobal(nGlobalKeys.screenChatDetailSelected, '') == 'chatDetail') {
						Utils.goback(nthisApp)
						setTimeout(() => {
							Utils.goscreen(nthisApp, "sc_Chat", {
								IdGroup: dataNotifycation1.IdGroup,
								LoaiChat: dataNotifycation1.LoaiChat,
								TenGroup: dataNotifycation1.TenGroup,
								flagChatGroup: true,
								flagNotify: true,
								dataChatGroupNotify: dataNotifycation1
							})
						}, 200);

						return;
					} else {
						Utils.goscreen(nthisApp, "sc_Chat", {
							IdGroup: dataNotifycation1.IdGroup,
							LoaiChat: dataNotifycation1.LoaiChat,
							TenGroup: dataNotifycation1.TenGroup,
							flagChatGroup: true,
							flagNotify: true,
							dataChatGroupNotify: dataNotifycation1
						})
						return;
					}
				}
			}
		}
		if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/GhiChu') {
			Utils.goscreen(this, 'Modal_ThongBaoAll')
			return;
		}
		if (dataNotifycation1.deeplink == 'jeekidstudent://app/root/DrawerNativatorRight/HomeStack/GochocTap') {
			Utils.goscreen(this, 'sc_GochocTapp')
			return;
		}
	}

	_getData = async () => {
		let fullname = await Utils.ngetStore(nkey.Fullname, "");
		this.setState({
			fullname: fullname
		});
	};

	_upload = () => {
		Utils.goscreen(this, 'Model_Upload');
	}
	_goMediapicker = (item, optionsCus) => {
		Utils.nlog('_goMediapicker', item)
		if (optionsCus == undefined || optionsCus == null)
			optionsCus = {};
		response = (res) => {
			if (res.iscancel) {
			}
			else if (res.error) {
			}
			else {
				this.checkChangeAvatar = true;
				this.avatar = res;
				this.setState({ avatar: res[0].uri + '?' + new Date() });
				this.uploadavatar(res, item);
			}
		};
		let options = {
			assetType: 'Photos', //All,Videos,Photos - default
			multi: false,// chọn 1 or nhiều item
			response: response, // callback giá trị trả về khi có chọn item
			limitCheck: -1, //gioi han sl media chon: -1 la khong co gioi han, >-1 la gioi han sl =  limitCheck
			...optionsCus
		};
		Utils.goscreen(this, 'sc_MediaPicker', options);
	}
	uploadavatar = async (res, item) => {
		this.waitting.show();
		const resBase64 = await Utils.parseBase64(res[0].uri, res[0].height, res[0].width);
		let ress = await updateAvatarHS(resBase64, res[0].idItem, item);
		Utils.nlog('uploadavatar', ress)
		if (ress.success == true) {
			Utils.showMsgBoxOK(this, 'Thông báo', 'Cập nhật avatar học sinh thành công', "Đóng")
			let res2 = await infoPhuhuyenh()
			if (res2.success == true) {
				this.props.setListChild(res2.data.HocSinh)
			}
		}
		this.waitting.hide();
	}

	_renderItemChild = ({ item, index }) => {
		return (
			<View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, backgroundColor: item.GioiTinh == "Nữ" ? colors.colorGreenThere1 : colors.colorGreenTwo1, alignItems: 'center' }} >
				<TouchableOpacity style={{ marginLeft: 20 }} onPress={() => this._goMediapicker(item.TenHocSinh)}>
					{item.GioiTinh == "Nữ" ?
						(<Image resizeMode='cover' source={Images.icBe1} style={[nstyles.nIcon65, { borderRadius: 32.5 }]} />) :
						(<Image resizeMode="cover" source={Images.icBe2} style={[nstyles.nIcon65, { borderRadius: 32.5 }]} />)}
				</TouchableOpacity>
				<View
					style={{ flexDirection: "column", marginLeft: 10, justifyContent: "center", flex: 1 }}>
					< Text style={{ color: "white", fontSize: sizes.fs(20), fontWeight: 'bold' }}>{item.TenHocSinh}</Text>
					< Text style={{ color: "white", fontSize: sizes.fs(18), marginTop: 5, fontWeight: '500' }}>{item.LopHoc}</Text>
				</View>
			</View>
		);
	};

	_clickMenu = route => () => {
		Utils.goscreen(this, route);
	};
	_clickChild = () => {
		// Utils.goscreen(this, "Modal_PlayVideo");

		Utils.goscreen(this, "Modal_EnterStudentInformation", { flag: true, goBackAddChild: this.goBackAddChild });
	};
	goBackAddChild = () => {
		this.props.navigation.closeDrawer();
	}
	render() {
		return (
			<View style={nstyles.ncontainerX} >
				<ScrollView showsVerticalScrollIndicator={false} style={nstyles.nbody}>
					<View style={{ height: 200, backgroundColor: colors.colorGreenOne1, alignItems: "center", paddingTop: 30 }} >
						<View style={{ borderRadius: 40, marginTop: 10, width: 80, height: 80, alignItems: 'center' }}>
							<Image
								source={Images.imgProfile}
								resizeMode="cover"
								style={{ borderRadius: 40, width: 80, height: 80, position: 'absolute' }} />
						</View>
						<Text style={[styles.text24, { justifyContent: "center", color: "white", marginTop: 10, fontWeight: '700' }]} > {'Phạm Văn Duyêt'} </Text>
						<Text style={[styles.text14, { justifyContent: "center", color: "white", marginTop: 5, marginBottom: 20 }]}>Phụ huynh</Text>
					</View>
					<View>
						<FlatList renderItem={this._renderItemChild} data={this.state.listHocSinh} extraData={this.state.id} keyExtractor={(item, index) => index.toString()} scrollEnabled={false} />
					</View>
					<TouchableOpacity
						onPress={this._clickChild}
						style={{ marginHorizontal: 20 }}
					// style={{ paddingVertical: 10, alignItems: 'center', backgroundColor: '#f8b199', marginVertical: 10, marginHorizontal: 10, borderRadius: 4 }}
					>
						{/* <View
								style={{ justifyContent: "center" }}>
								< Text style={{ color: "white", fontSize: sizes.sText30, fontWeight: '800' }}>Thêm  học sinh</Text>
							</View> */}
						<ButtonCom
							colorChange={['#f8b199', '#f27972']}
							onPress={this._clickChild}
							Linear={true}
							text={"Thêm học sinh"}
							style={{ paddingHorizontal: 50, marginTop: 10 }}
						/>
					</TouchableOpacity>
					<View style={{ flexDirection: "column", marginLeft: width * 0.0625, marginRight: width * 0.0625, marginTop: width * 0.05, marginBottom: 100 }}  >
						<TouchableOpacity onPress={this._clickMenu("sc_Setting")}>
							<View
								style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									resizeMode="contain"
									source={Images.icCaiDat1}
									style={styles.nImageMenuBig}
								/>
								<View style={styles.nViewMenuBig}>
									<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Cài đặt</Text>
									<Image
										resizeMode="contain"
										source={Images.iconNext1}
										style={{ width: width * 0.04, height: width * 0.04 }} />
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<IsLoading ref={refs => this.waitting = refs} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btnStyle: {
		height: height * 0.045,
		width: width * 0.28,
		borderRadius: (height * 0.5) / 2
	},
	txtStyle: {
		...Platform.select({
			ios: {
				paddingBottom: 0
			},
			android: {
				paddingVertical: 0
			}
		})
	},
	boxSearchHome: {
		borderColor: colors.softBlue,
		borderRadius: 6,
		borderWidth: 1,
		marginBottom: 0
	},
	text14: {
		fontSize: sizes.sizes.sText14
	},
	text12: {
		fontSize: sizes.sizes.sText12,
		color: "rgb(9, 9, 9)"
	},
	text16: {
		fontSize: sizes.sizes.sText16,
		color: "rgb(9, 9, 9)"
	},
	text20: {
		fontSize: sizes.sizes.sText20,
		color: "rgb(9, 9, 9)"
	},
	text24: {
		fontSize: sizes.sizes.sText24,
		color: "rgb(9, 9, 9)"
	},
	text26: {
		fontSize: sizes.sizes.sText26,
		color: "rgb(9, 9, 9)"
	},
	text28: {
		fontSize: sizes.sizes.sText28,
		color: "rgb(9, 9, 9)"
	},
	nImageMenuBig: {
		width: width * 0.07, height: width * 0.07, margin: 10
	},
	nViewMenuBig: {
		flex: 1,
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: colors.veryLightPinkThree,
		height: width * 0.12,
		alignItems: "center"
	}
});

const mapStateToProps = state => ({
	listchild: state.listchild,
	avatar: state.avatar,
	sumNotifyThongBao: state.sumNotifyThongBao,
	sumNotifyThuMoiSuKien: state.sumNotifyThuMoiSuKien,
	sumNotifyBaoBai: state.sumNotifyBaoBai,
	listChildBaoBai: state.listChildBaoBai,
	sumNotifiAllApp: state.sumNotifiAllApp,
	listChildThongBaoAll: state.listChildThongBaoAll,
	listChildThongBao: state.listChildThongBao,
	listChildThuMoiSuKien: state.listChildThuMoiSuKien

});

export default Utils.connectRedux(MenuRight, mapStateToProps, true);