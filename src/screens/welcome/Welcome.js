import React, { Component, PureComponent } from 'react';
import Utils from '../../app/Utils';
import { Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Linking } from 'react-native';
import HeaderCom from '../../components/HeaderCom';
import { nkey } from '../../app/keys/keyStore';
import { nstyles, nwidth, Height } from '../../styles/styles';
import { Images } from '../../images';
import { sizes, fs } from '../../styles/size';
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
			<View style={[nstyles.ncontainerX, { backgroundColor: colors.whitegay }]}>
				<HeaderCom
					titleText={this.state.fullname}
					nthis={this}
					iconLeft={Images.icMenu1}
					iconRight={Images.icBell1}
					onPressLeft={this._open}
					// notification={this.props.sumNotifiAllApp == 0 ? undefined : this.props.sumNotifiAllApp}
					// onPressRight={() => { Utils.goscreen(this, 'sc_ListChildThongBaoAll', { refesdata: this.refesdata }) }}
				/>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					colors={isTransparent ? [colors.nocolor, colors.nocolor] : ['#f8b199', '#f27972']}
					style={{ height: 130 }}>
				</LinearGradient >
				<View style={{ marginTop: -130, flex: 1 }} >
					<View style={{ paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center' }}>
						<Text style={{ fontSize: fs(20), fontWeight: '700', color: 'white', fontStyle: 'italic' }}>{'Giáo viên:  '}{'Lê Phạm Tuấn Kiệt'}</Text>
					</View>
					<ScrollView style={{ marginHorizontal: 10,paddingVertical:10, backgroundColor: 'white', borderRadius: 6 }} >
						<View style={[nstyles.nrow, { justifyContent: 'space-around', alignItems: 'center' }]}>
							<TouchableOpacity style={{ flexDirection: 'column' }}
								onPress={this._clickMenu('sc_ListStudentAttendance')}>
								<ImageBackground
									style={nstyles.nIcon120}
									resizeMode="stretch"
									source={Images.bgDiemDanh}>
								</ImageBackground>
								<Text style={[styles.nTextMenuBig]}>Điểm danh</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ flexDirection: 'column' }}
								onPress={this._clickMenu('sc_ListStudentTuition')}>
								<ImageBackground
									style={nstyles.nIcon120}
									resizeMode="stretch"
									source={Images.bgHocPhi}>
								</ImageBackground>
								<Text style={styles.nTextMenuBig}>Học phí</Text>
							</TouchableOpacity>
						</View>
						<View style={[nstyles.nrow, { justifyContent: 'space-around', alignItems: 'center', marginTop: 15 }]}>
							<TouchableOpacity style={{ flexDirection: 'column' }}
								onPress={this._clickMenu('sc_ListChildBaoBai')}>
								<ImageBackground
									style={nstyles.nIcon120}
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
									style={nstyles.nIcon120}
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
						<View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-around', marginTop: 15 }]}>
							<TouchableOpacity style={{ flexDirection: 'column' }}
								onPress={this._clickMenu('sc_ListChildThongBao')}>
								<ImageBackground
									style={nstyles.nIcon120}
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
								onPress={this._clickMenu('sc_timetable_Stack')}>
								<ImageBackground
									style={nstyles.nIcon120}
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
						<View style={[nstyles.nrow, { alignItems: 'center', justifyContent: 'space-around', marginTop: 15 }]}>
							<TouchableOpacity style={{ flexDirection: 'column' }}
								onPress={() => Utils.goscreen(this, 'sc_surveyStack')}>
								<ImageBackground
									style={nstyles.nIcon120}
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
									style={nstyles.nIcon120}
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
					</ScrollView>
				</View>
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
