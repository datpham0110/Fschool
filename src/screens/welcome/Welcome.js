import React, { Component, PureComponent } from 'react';
import Utils from '../../app/Utils';
import { Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Linking } from 'react-native';
import HeaderCom from '../../components/HeaderCom';
import { nkey } from '../../app/keys/keyStore';
import { nstyles } from '../../styles/styles';
import { Images } from '../../images';
import { sizes } from '../../styles/size';
import { colors } from '../../styles/color';
import { ThongBaoInsertUpdate } from '../../apis/getNotifycation';
import { nGlobalKeys } from '../../app/keys/globalKey';
import LinearGradient from 'react-native-linear-gradient';
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import { infoPhuhuyenh } from "../../apis/welcome";
import { DanhSachHocSinh } from '../../apis/chat';
import { appConfig } from '../../app/Config';
import { Version } from '../../apis/apiLogin';
const Pulse = require('react-native-pulse').default;

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullname: "",
			countNotifyAllDoneRead: 0
		};
		nthisApp = this;
		nthisRedux = this;
	}
	componentDidMount() {
		this._checkVersion();
		this.postNotification();
		this._getData();
		this._loadDataNotifyShow();
		this._loadAvatar();
		this._loadListChildChat();
	}
	_checkVersion = async () => {
		let res = await Version();
		if (res.success == true) {
			for (let i = 0; i < res.data.length; i++) {
				if (res.data[i].TenApp == 'PhuHuynh') {
					if (appConfig.versionApp < res.data[i].Version) {
						Utils.showMsgBoxOK(this, 'Thông báo', 'Ứng dụng đã có phiên bản cập nhật mới, vui lòng cập nhật ứng dụng', 'Cập nhật', this._goStore);
					}
				}
			}
		}
	}
	_goStore = () => {
		if (Platform.OS === 'android') {
			Linking.openURL('https://play.google.com/store/apps/details?id=com.yschool.app').catch((err) => Utils.nlog('Bạn phải cài đặt ứng dụng Viber trên điện thoại để sử dụng chức năng này!'));
		} else {
			Linking.openURL('https://apps.apple.com/us/app/yschool/id1486322665?ls=1').catch((err) => Utils.nlog('Bạn phải cài đặt ứng dụng Viber trên điện thoại để sử dụng chức năng này!'));
		}
	}
	_logout = () => {
		Utils.nsetStore(nkey.token, '');
		Utils.nsetStore(nkey.nameuser, '');
		Utils.nsetStore(nkey.password, '');
		Utils.goscreen(this, 'sc_EnterYourPhoneNumber');
	};
	_loadDataNotifyShow = async () => {
		let res = await ThongBao_ListAll_App_V2(0, 0);
		Utils.nlog('-------------------------------ThongBao_ListAll_App_V2ThongBao_ListAll_App_V2', res)
		if (res.success == true && res.data != null) {
			this.props.setSumNotifyAllApp(res.CountTT > 100 ? 99 : res.CountTT);
		} else {
			this.props.setSumNotifyAllApp([]);
		}
	}
	_loadAvatar = async () => {
		let res = await infoPhuhuyenh();
		if (res.success == true) {
			this.props.setAvatar(res.data.Avatar);
		}
	}

	_loadListChildChat = async () => {
		let res = await DanhSachHocSinh();
		if (res.success == true) {
			this.props.setListChildChat(res.data);
		}
	}
	_clickMenu = (route) => () => {
		Utils.goscreen(this, route);
	};
	_getData = async () => {
		let fullname = await Utils.ngetStore(nkey.Fullname, "");
		this.setState({
			fullname: fullname
		});
	};
	_open = () => {
		this.props.navigation.openDrawer();
	};
	postNotification = async () => {
		let device = Utils.getGlobal(nGlobalKeys.notification, '');
		let rowId = Utils.getGlobal(nGlobalKeys.rowId, '');
		let res = await ThongBaoInsertUpdate(device.userId, rowId, Platform.OS)
	}
	refesdata = async () => {
		this._loadDataNotifyShow();
	}
	_countNotifyChilldChat = (data) => {
		let count = 0;
		for (let i = 0; i < data.length; i++) {
			count += data[i].IsRead
		}
		return count;
	}
	render() {
		isTransparent = false
		return (
			<View style={[nstyles.ncontainerX, { backgroundColor: colors.whitegay, width: width }]}>
				<HeaderCom
					titleText={this.state.fullname}
					nthis={this}
					iconLeft={Images.icMenu1}
					iconRight={Images.icBell1}
					onPressLeft={this._open}
					notification={this.props.sumNotifiAllApp == 0 ? undefined : this.props.sumNotifiAllApp}
					onPressRight={() => { Utils.goscreen(this, 'sc_ListChildThongBaoAll', { refesdata: this.refesdata }) }}
				/>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					colors={isTransparent ? [colors.nocolor, colors.nocolor] : ['#f8b199', '#f27972']}
					style={{ height: 130 }}>
				</LinearGradient >
				<View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 15, marginHorizontal: 20, top: -100, borderRadius: 6 }} >
					<View style={[nstyles.nrow, { justifyContent: 'space-between', alignItems: 'center' }]}>
						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={this._clickMenu('sc_Diemdanh')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.bgDiemDanh}>
							</ImageBackground>
							<Text style={[styles.nTextMenuBig]}>Điểm danh</Text>
						</TouchableOpacity>

						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={this._clickMenu('sc_HocPhi')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.bgHocPhi}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Học phí</Text>
						</TouchableOpacity>
					</View>
					<View style={[nstyles.nrow, { justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }]}>
						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={this._clickMenu('sc_ListChildBaoBai')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.bgBaoBai}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Báo bài</Text>
							{this.props.sumNotifyBaoBai > 0 ?
								<View style={styles.vIconNotifyBig}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
						<TouchableOpacity style={{ flexDirection: 'column' }} onPress={this._clickMenu('sc_SelectChildChat')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.bgChat}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Trao đổi</Text>
							{this._countNotifyChilldChat(this.props.listChildChat) > 0 ?
								<View style={[styles.vIconNotifyBig, { right: -10, }]}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
					</View>
					<View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }]}>
						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={this._clickMenu('sc_ListChildThongBao')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.icThonbao}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Thông báo</Text>
							{this.props.sumNotifyBaoBai > 0 ?
								<View style={styles.vIconNotifyBig}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={this._clickMenu('sc_ThoiKhoaBieu')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.icThpiKhoaBieu1}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Thời khoá biểu</Text>
							{this._countNotifyChilldChat(this.props.listChildChat) > 0 ?
								<View style={[styles.vIconNotifyBig, { right: -10, }]}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
					</View>
					<View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }]}>
						<TouchableOpacity style={{ flexDirection: 'column' }}
							onPress={() => Utils.goscreen(this, 'sc_KhaosatHome')}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.icKhaoSat}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Khảo sát</Text>
							{this.props.sumNotifyBaoBai > 0 ?
								<View style={styles.vIconNotifyBig}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
						<TouchableOpacity style={{ flexDirection: 'column' }}>
							<ImageBackground
								style={nstyles.nIcon140}
								resizeMode="stretch"
								source={Images.icoCam}>
							</ImageBackground>
							<Text style={styles.nTextMenuBig}>Camera</Text>
							{this._countNotifyChilldChat(this.props.listChildChat) > 0 ?
								<View style={[styles.vIconNotifyBig, { right: -10, }]}>
									<Pulse
										color={colors.redStar}
										numPulses={3}
										diameter={width * 0.09}
										speed={50}
										duration={2}
									/>
									<Image
										style={{ width: 18, height: 18, tintColor: colors.redStar }}
										source={Images.icStarReview}>
									</Image>
								</View>
								: null}
						</TouchableOpacity>
					</View>
				</View>


				{/* <View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-around', marginHorizontal: width * 0.0625 }]}>
					<TouchableOpacity onPress={() => Utils.goscreen(this, 'sc_GochocTapp')} style={{ alignItems: 'center' }}>
						<Image source={Images.icGochoctap} resizeMode='contain' style={{ width: width * 0.26, height: width * 0.26 }} />
					</TouchableOpacity>
					<View style={{ width: 10 }} />
					<TouchableOpacity onPress={() => Utils.goscreen(this, 'sc_GocHoatDongHome')} style={{ alignItems: 'center' }}>
						<Image source={Images.icGocHoatDong} resizeMode='contain' style={{ width: width * 0.26, height: width * 0.26 }} />
					</TouchableOpacity>
					<View style={{ width: 10 }} />
					<TouchableOpacity onPress={() => Utils.goscreen(this, 'sc_KhaosatHome')} style={{ alignItems: 'center' }}>
						<Image source={Images.icKhaoSat} resizeMode='contain' style={{ width: width * 0.26, height: width * 0.26 }} />
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: 'column',
						marginTop: width * 0.05,
						marginHorizontal: width * 0.0625
					}}>
					<TouchableOpacity onPress={this._clickMenu('sc_ListChildThongBao')}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image
								resizeMode="contain"
								source={Images.icNotifycation1}
								style={{ width: width * 0.07, height: width * 0.07, margin: 10 }}
							/>
							<View style={styles.viewTextMenuSmall}>
								<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Thông báo</Text>
								{
									this.props.sumNotifyThongBao > 0 ?
										<View>
											<Image
												style={{ width: 18, height: 18, tintColor: colors.redStar }}
												source={Images.icStarReview}>
											</Image>
											<Pulse
												color={colors.redStar}
												numPulses={3}
												diameter={width * 0.09}
												speed={50}
												duration={2}
											/>
										</View>
										: null}
								<Image resizeMode="contain" source={Images.iconNext1} style={{ width: width * 0.04, height: width * 0.04 }} />
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						//sc_ListChillThuMoiSuKien
						//sc_ThuMoiSuKien
						onPress={this._clickMenu('sc_ListChillThuMoiSuKien')}>
						<View style={styles.vMenuSmall}>
							<Image resizeMode="contain" source={Images.iconMail1} style={{ width: width * 0.07, height: width * 0.07, margin: 10 }} />
							<View style={styles.viewTextMenuSmall}>
								<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Thư mời - Sự kiện</Text>
								{
									this.props.sumNotifyThuMoiSuKien > 0 ?
										<View>
											<Image style={{ width: 18, height: 18, tintColor: colors.redStar }} source={Images.icStarReview}></Image>
											<Pulse
												color={colors.redStar}
												numPulses={3}
												diameter={width * 0.09}
												speed={50}
												duration={2}
											/>
										</View>
										: null}
								<Image
									resizeMode="contain"
									source={Images.iconNext1}
									style={{ width: width * 0.04, height: width * 0.04 }}
								/>
							</View>

						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._clickMenu('sc_ThoiKhoaBieu')}>
						<View style={styles.vMenuSmall}>
							<Image resizeMode="contain" source={Images.icThpiKhoaBieu1} style={{ width: width * 0.07, height: width * 0.07, margin: 10 }} />
							<TouchableOpacity
								onPress={this._clickMenu('sc_ThoiKhoaBieu')}
								style={styles.viewTextMenuSmall}>
								<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Thời khóa biểu</Text>
								<Image
									resizeMode="contain"
									source={Images.iconNext1}
									style={{ width: width * 0.04, height: width * 0.04 }}
								/>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._clickMenu('sc_TienichHome')}>
						<View style={styles.vMenuSmall}>
							<Image resizeMode="contain" source={Images.icFeedRed} style={{ width: width * 0.07, height: width * 0.07, margin: 10 }} />
							<TouchableOpacity
								onPress={this._clickMenu('sc_TienichHome')}
								style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, height: width * 0.12, alignItems: 'center', borderBottomColor: colors.veryLightPinkThree }}	>
								<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Các tiện ích khác</Text>
								<Image resizeMode="contain" source={Images.iconNext1} style={{ width: width * 0.04, height: width * 0.04 }} />
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={this._clickMenu('sc_Hotro')}>
						<View style={styles.vMenuSmall}>
							<Image resizeMode="contain" source={Images.icCall} style={{ width: width * 0.07, height: width * 0.07, margin: 10 }} />
							<TouchableOpacity
								onPress={this._clickMenu('sc_Hotro')}
								style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, height: width * 0.12, alignItems: 'center', borderBottomColor: colors.veryLightPinkThree }}	>
								<Text style={{ flex: 1, marginLeft: 5, fontSize: sizes.sText17 }}>Hỗ trợ 24/7</Text>
								<Image resizeMode="contain" source={Images.iconNext1} style={{ width: width * 0.04, height: width * 0.04 }} />
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				</View> */}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	nTextMenuBig: {
		textAlign: 'center',
		fontWeight: '500',
		fontSize: sizes.sText20,
		color: colors.black_80,
	},
	vMenuSmall: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	viewTextMenuSmall: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		height: width * 0.12,
		alignItems: 'center',
		borderBottomColor: colors.veryLightPinkThree
	},
	vIconNotifyBig: {
		width: width * 0.08,
		height: width * 0.08,
		// borderRadius: width * 0.1,
		// backgroundColor: '#f27972',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		alignSelf: 'flex-end',
		// paddingRight: -50
	},
	vIconNotifySmall: {
		width: width * 0.06,
		height: width * 0.06,
		borderRadius: width * 0.04,
		backgroundColor: '#f27972',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10
	}
})

const mapStateToProps = state => ({
	avatar: state.avatar,
	sumNotifyThongBao: state.sumNotifyThongBao,
	sumNotifyThuMoiSuKien: state.sumNotifyThuMoiSuKien,
	sumNotifyBaoBai: state.sumNotifyBaoBai,
	listChildChat: state.listChildChat,
	sumNotifiAllApp: state.sumNotifiAllApp,
	listChildThongBaoAll: state.listChildThongBaoAll,
	listChildThongBao: state.listChildThongBao,
	listChildThuMoiSuKien: state.listChildThuMoiSuKien

});

export default Utils.connectRedux(Welcome, mapStateToProps, true);
