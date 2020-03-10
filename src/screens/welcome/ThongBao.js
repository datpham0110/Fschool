import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import Utils from '../../app/Utils';
import { nstyles } from '../../styles/styles';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { notification } from '../../apis/notifycation';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { ThongBao_ListAll_App, ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import ListEmpty from '../../components/ListEmpty';
const { width } = Dimensions.get('window');
import moment from "moment"
import LinearGradient from 'react-native-linear-gradient';

class ThongBao extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			pageNow: 0,
			allPage: '',
			flag: false,
			hocsinh: '',
			showload: false,
			refreshing: true,
		};
		this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null);
		this.IDChiNhanh = Utils.ngetParam(this, 'IDChiNhanh');
		this.flagNotifiy = Utils.ngetParam(this, 'flagNotifiy', false)
	}
	componentDidMount() {
		if (this.props.listchild.length > 0) {
			// this._getData(0);
			if (this.flagNotifiy == true) {
				for (let i = 0; i < this.props.listchild.length; i++) {
					if (this.props.listchild[i].IDKhachHang == this.IDHocSinh) {
						this.IDChiNhanh = this.props.listchild[i].IDChiNhanh;
						this._getData(0)
						break;
					}
				}
			} else {
				this._getData(0)
			}

		} else {
			Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng')
			this.setState({ refreshing: false });
		}
	}
	_getData = async (pageNow) => {
		let childSelected = Utils.getGlobal(nGlobalKeys.childSelected, undefined);
		if (childSelected != undefined) {
			this.setState({ hocsinh: childSelected })
		}
		let res = await ThongBao_ListAll_App_V2(1, pageNow, this.IDHocSinh, this.IDChiNhanh);
		Utils.nlog('ThongBao_ListAll_App', res)
		if (res.success == true && res.data != null) {
			this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: pageNow + 1, refreshing: false, showload: false });
		} else {
			this.setState({ data: [], allPage: 0, pageNow: 0, refreshing: false, showload: false });
		};
	};
	_onRefresh = () => {
		this.setState({ refreshing: true }, () => this._getData());
	}
	loadMore = async () => {
		if (this.state.pageNow < this.state.allPage) {
			let res = await ThongBao_ListAll_App_V2(1, this.state.pageNow, this.IDHocSinh, this.IDChiNhanh);
			// let res = await ThongBao_ListAll_App_V2(1, this.state.pageNow);
			if (res.success == true) {
				data = this.state.data.concat(res.data);
				this.setState({ showload: true, data: data, pageNow: this.state.pageNow + 1 });
			}
		}
	}
	goBack = () => {
		this._getData(0);
	}
	goModalChiTiet = (item) => {
		Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, IDChiNhanh: item.IDChiNhanh })
	}
	_renderItemChild = ({ item, index }) => {
		var { data } = this.state
		return (
			<View >
				{index != 0 ? item.NgayGui != data[index - 1].NgayGui ?
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={['#f8b199', '#f27972']}
						style={{
							backgroundColor: colors.nocolor
						}}>
						<Text style={{ textAlign: 'center', marginVertical: 14, marginLeft: 10, color: 'white', fontWeight: '700' }}>Ngày {item.NgayGui}</Text>
					</LinearGradient>
					: null :
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={['#f8b199', '#f27972']}
						style={{
							backgroundColor: colors.nocolor
						}}>
						<Text style={{ textAlign: 'center', marginVertical: 14, marginLeft: 10, color: 'white', fontWeight: '700' }}>Ngày {item.NgayGui}</Text>
					</LinearGradient>
				}
				<View style={{ borderColor: colors.black_20, borderWidth: 0.5 }} >
					<TouchableOpacity onPress={() => this.goModalChiTiet(item)} key={index}
						style={[nstyles.nrow, {
							paddingVertical: 15, paddingHorizontal: 10, height: 110, backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa'
						}]}>
						<Image
							source={Images.icBell}
							style={nstyles.nIcon18}
							resizeMode='contain'
						/>
						<View style={{ marginLeft: 10, marginRight: 10 }}>
							{
								item.IDTrangThai == 0 ? <View>
									<Text style={{ fontSize: sizes.reSize(14) }}> <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>Giáo viên {item.TenLop} </Text>gửi thông báo đến<Text style={{ fontWeight: 'bold' }}> {item.TenHocSinh}</Text></Text>
									<Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
								</View> : <View>
										<Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} gửi thông báo đến  {item.TenHocSinh}</Text>
										<Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
									</View>
							}
						</View>
					</TouchableOpacity>
				</View>
			</View >
		);
	}
	_renderdata = () => {
		this._getData(0);
	}
	render() {
		var isTransparent = false
		return (
			<View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
				<HeaderCom
					nthis={this}
					iconLeft={Images.icbackspace}
					titleText={'Thông báo'}
				/>
				{/* <View style={{ paddingRight: 20, paddingTop: 10 }}>
					<Text style={{ textAlign: 'right' }}>Đã đọc tất cả </Text>
				</View> */}
				{
					this.props.listchild.length == 0 ? null :
						<LinearGradient
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							colors={isTransparent ? [colors.nocolor, colors.nocolor] : ['#84D3A5', '#2FBACF']}
						>
						</LinearGradient>
				}
				<FlatList
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
					renderItem={this._renderItemChild}
					data={this.state.data}
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.2}
					ListFooterComponent={this.state.showload ?
						<ActivityIndicator size='small' /> : null}
				/>
			</View>
		);
	}
}



const mapStateToProps = state => ({
	listchild: state.listchild
})
export default Utils.connectRedux(ThongBao, mapStateToProps)