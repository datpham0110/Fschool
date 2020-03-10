import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { nstyles } from '../../styles/styles';
import { styles } from './styles';
import { colors } from '../../styles/color';
import Utils from '../../app/Utils';
import { nkey } from '../../app/keys/keyStore';
import { enterPhoneNumber } from '../../apis/apiLogin';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { accuracyOTP } from "../../apis/apiLogin";
import { Images } from '../../images';

const { width, height } = Dimensions.get('window');

export default class NotifyEnterPhoneNumber extends React.Component {
	sdt = '';
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: '',
			checked: true
		};
	}
	componentDidMount() {
		this._getData();
	}
	async _getData() {
		let phone = await Utils.ngetStore(nkey.phonenumber);
		this.setState({ phoneNumber: phone });
		sdt = phone;
	}
	_next = () => {
		if (this._submit()) {
			Utils.goscreen(this, "sc_CreatePassword");
		}
	};
	_submit = async () => {
		res = await accuracyOTP();
		Utils.nlog('------------------  accuracyOTP', res)
		return res;
	};
	// _next = async () => {
	// 	// if (this.state.phoneNumber != '') {
	// 	// 	res = await enterPhoneNumber(this.state.phoneNumber);
	// 	// 	if (res.success == true) {
	// 	// 		Utils.setGlobal(nGlobalKeys.IdCN, res.data.IdCN);
	// 	// 		Utils.setGlobal(nGlobalKeys.IdUser, res.data.IdUser);
	// 	// 		Utils.setGlobal(nGlobalKeys.OTP, res.data.OTP);
	// 	// 		Utils.setGlobal(nGlobalKeys.OTPTime, res.data.OTPTime);
	// 	// 		Utils.setGlobal(nGlobalKeys.OTPTimeApp, res.data.OTPTimeApp);
	// 	// 		Utils.goscreen(this, 'sc_AccuracyOTP');
	// 	// 	} else if (res.success == false && res.error.code == 103) {
	// 	// 		Utils.goscreen(this, 'sc_AuthLogin');
	// 	// 	}
	// 	// }
	// 	Utils.goscreen(this, 'sc_AccuracyOTP');
	// };
	// check = () => {
	// };
	_dongYKiemKhoan = () => {
		Utils.goscreen(this, 'Modal_ThoaThuanNguoiDung', { returnData: this._returnData })
	}
	_returnData = (flag) => {
		if (flag == true) {
			this.setState({ checked: true })
		}
	}
	render() {
		return (
			<View style={([nstyles.nbody], { backgroundColor: colors.bgYSchoold, height: '100%' })}>
				<View
					style={{
						backgroundColor: colors.white,
						marginLeft: width / 10,
						marginRight: width / 10,
						padding: 20,
						borderRadius: 18,
						marginTop: height * 0.4
					}}>
					<Text>Đăng ký YSchool với số điện thoại</Text>
					<Text style={[styles.text24, { fontWeight: '800', marginTop: 5 }]}>{this.state.phoneNumber}</Text>
					<TouchableOpacity
						style={{ flexDirection: 'row', marginTop: 10 }}
						onPress={this._dongYKiemKhoan}
					>
						<Image
							resizeMode="contain"
							source={this.state.checked == false ? Images.unCheckTour : Images.CheckTour}
							style={{ width: 20, height: 20 }}
						/>
						<Text style={{ paddingLeft: 10, marginTop: -5, paddingRight: 5 }}>
							Bằng việc đăng ký, bạn đã đồng ý với <Text style={{
								fontWeight: '700', textDecorationLine: 'underline', color: colors.colorBlue1
							}}>Điều khoản sử dụng</Text> của YSchool
						</Text>
					</TouchableOpacity>
					<View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-end' }}>
						<Text onPress={() => Utils.goback(this)} style={{ marginRight: 30 }}>
							QUAY LẠI
						</Text>
						{this.state.checked == true ? (
							<TouchableOpacity onPress={this._next}>
								<Text style={{ color: colors.colorPink, fontWeight: '700' }}>TIẾP TỤC</Text>
							</TouchableOpacity>) : (<Text style={{ fontWeight: '700' }}>TIẾP TỤC</Text>)}
					</View>
				</View>
			</View>
		);
	}
}
