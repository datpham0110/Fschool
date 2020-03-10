import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import Utils from '../../app/Utils';
import { nstyles } from '../../styles/styles';
import { nGlobalKeys } from '../../app/keys/globalKey';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ListEmpty from '../../components/ListEmpty';
import LinearGradient from 'react-native-linear-gradient';
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';

const { width } = Dimensions.get('window');

class BaoBai extends Component {
	constructor(props) {
		super(props);
		nthisApp = this;
		this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null)
		this.state = {
			data: [],
			pageNow: 0,
			allPage: '',
			showload: false,
			hocsinh: '',
			refreshing: true,
			hocSinhData: '',
		};
	}
	componentDidMount() {
		Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'BaoBai')
		this.checkID()
	}
	checkID = async () => {
		if (this.props.listchild.length > 0) {
			if (this.IDHocSinh != null) {
				for (let i = 0; i < this.props.listchild.length; i++) {
					if (this.IDHocSinh == this.props.listchild[i].IDKhachHang) {
						this.setState({ hocSinhData: this.props.listchild[i] })
						Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
						this._getData(this.IDHocSinh)
						break;
					}
				}
			} else {
				this.setState({ hocSinhData: this.props.listchild[0], refreshing: true }, Utils.nlog('listchild', this.state.hocSinhData))
				this._getData(this.props.listchild[0].IDKhachHang)
			}
		} else {
			Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
		}
	}
	componentWillUnmount() {
		Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
	}
	_renderdata = (item) => {
		this.setState({ refreshing: true })
		this._getData(item.IDKhachHang)
		this.setState({ refreshing: false, hocSinhData: item });
	}
	_getData = async (pageNow) => {
		let res = await ThongBao_ListAll_App_V2(2, 0);
		if (res.success == true && res.data != null) {
			this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: pageNow + 1 });
		} else {
			this.setState({ data: [], allPage: 0, pageNow: 0 });
		}
		this.setState({ refreshing: false, showload: false });
	};
	goModalChiTiet = (item, noiDung) => {
		Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, noiDung: noiDung })
	}

	_onRefresh = () => {
		this.setState({ refreshing: true }, () => this._getData(this.state.hocSinhData.IDKhachHang));
	}
	loadMore = async () => {
		if (this.state.pageNow < this.state.allPage) {
			let res = await ThongBao_ListAll_App_V2(2, this.state.pageNow);
			if (res.success == true) {
				data = this.state.data.concat(res.data);
			}
			this.setState({ data: data, pageNow: this.state.pageNow + 1, showload: true });
		}
	}
	goBack = () => {
		this._getData(this.state.hocSinhData.IDKhachHang);
	}

	_renderItemChild = ({ item, index }) => {
		var { data } = this.state
		let text = 'Giáo viên ' + item.TenLop
		text += item.IDLoai == 5 ? ' gửi ghi chú báo bài ' : ' gửi báo bài '
		text += 'đến ' + item.TenHocSinh
		return (
			<View>
				{index != 0 ? item.NgayGui != data[index - 1].NgayGui ?
					<Text style={{ textAlign: 'left', marginVertical: 20, marginLeft: 10 }}>{item.NgayGui}</Text> : null :
					<Text style={{ textAlign: 'left', marginVertical: 20, marginLeft: 10 }}>{item.NgayGui}</Text>
				}
				<View style={{ borderColor: colors.black_20, borderWidth: 0.5 }}>
					<TouchableOpacity onPress={() => this.goModalChiTiet(item, text)} key={index}
						style={[nstyles.nrow, {
							paddingVertical: 15, paddingHorizontal: 10, height: 110, backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa'
						}]}>
						<Image
							source={Images.icBell}
							style={nstyles.nIcon18}
							resizeMode='contain'
						/>
						<View style={{ marginLeft: 10, marginRight: 10 }}>
							{item.IDTrangThai == 0 ? <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên <Text style={{ fontWeight: 'bold' }}>{item.TenLop} </Text>{item.IDLoai == 5 ? 'gửi ghi chú báo bài ' : 'gửi báo bài '}đến <Text style={{ fontWeight: 'bold' }}>{item.TenHocSinh}</Text></Text>
								:
								<Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} {item.IDLoai == 5 ? 'gửi ghi chú báo bài ' : 'gửi báo bài '}đến {item.TenHocSinh}</Text>
							}
							<Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View >
		);
	};
	render() {
		var isTransparent = false
		return (
			<View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
				<HeaderCom
					nthis={this}
					iconLeft={Images.icbackspace}
					titleText={'Báo bài'}
				/>
				{this.props.listchild.length == 0 ? null :
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={isTransparent ? [colors.nocolor, colors.nocolor] : ['#84D3A5', '#2FBACF']}	>
					</LinearGradient>
				}
				<View style={{ flexDirection: 'row', backgroundColor: 'white', marginHorizontal: 20, marginVertical: 7, borderRadius: 4 }}>
					<TouchableOpacity
						style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}
						onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, _renderdata: this._renderdata })}>
						<View>
							<Text style={{
								fontSize: 16, fontWeight: "800", paddingVertical: 10, color: "black"
							}} >
								{this.state.hocSinhData.TenKhachHang}
							</Text>
							<Text style={{ paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: 'black' }}>
								Học sinh {this.state.hocSinhData.LopHoc}
							</Text>
						</View>
						<Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nIcon20, { tintColor: colors.black_20, marginLeft: 5, top: -10 }]} />
					</TouchableOpacity>
				</View>
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
			</View >
		);
	}
}


const mapStateToProps = state => ({
	listchild: state.listchild
})
export default Utils.connectRedux(BaoBai, mapStateToProps)