
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
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import ListEmpty from '../../components/ListEmpty';
const { width } = Dimensions.get('window');
import moment from "moment"
import LinearGradient from 'react-native-linear-gradient';
class ThuMoiSuKien extends Component {
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
        this.flagNotify = Utils.ngetParam(this, 'flagNotify', false)
    }
    componentDidMount() {
        // Utils.nlog('-----------------this.props.listchild--------------------', this.props.listchild)
        // Utils.nlog('-----------------this.props.listchild--------------------', this.props.listchild.length)
        if (this.props.listchild.length > 0) {
            Utils.nlog('-----------------this.flagNotifiy---------------', this.flagNotify)
            if (this.flagNotify == true) {
                Utils.nlog('-----------------this.flagNotifiy---------------', this.flagNotify)
                Utils.nlog('-----------------this.props.listchild.length', this.props.listchild.length)
                for (let i = 0; i < this.props.listchild.length; i++) {
                    Utils.nlog('--------------------------------this.props.listchild[i].IDKhachHang')
                    if (this.props.listchild[i].IDKhachHang == this.IDHocSinh) {
                        Utils.nlog('-----------------this.props.listchild[i]', this.props.listchild[i])
                        this.IDChiNhanh = this.props.listchild[i].IDChiNhanh;
                        this._getData(0)
                        break;
                    }
                }
            } else {
                this._getData(0)
            }
            // this._getData(0);
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
            this.setState({ refreshing: false, showload: false });
        }
    }
    _getData = async (pageNow) => {
        let childSelected = Utils.getGlobal(nGlobalKeys.childSelected, undefined);
        if (childSelected != undefined) {
            this.setState({ hocsinh: childSelected })
        }
        let res = await ThongBao_ListAll_App_V2(7, pageNow, this.IDHocSinh, this.IDChiNhanh);
        if (res.success == true && res.data != null) {
            this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: pageNow + 1 });
        } else {
            this.setState({ data: [], allPage: 0, pageNow: 0 });
        }
        this.setState({ refreshing: false, showload: false });
    };
    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._getData());
    }
    loadMore = async () => {
        if (this.state.pageNow < this.state.allPage) {
            let res = await ThongBao_ListAll_App_V2(7, this.state.pageNow, this.IDHocSinh, this.IDChiNhanh);
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
        Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, type: 'ThuMoiSuKien' })
    }
    _renderItemChild = ({ item, index }) => {
        // Utils.nlog('--------------------------------item.IDTrangThai', item.IDTrangThai == 1 ? 'white' : '#edf2fa')
        var { data } = this.state
        return (
            <View>
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
                            paddingVertical: 15, paddingHorizontal: 10, height: 110, backgroundColor: item.IDTrangThai == 1 ? '#fff' : '#edf2fa'
                        }]}>
                        <Image source={Images.icBell} style={nstyles.nIcon18} resizeMode='contain' />
                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            {
                                item.IDTrangThai == 0 ? <View>
                                    <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên <Text style={{ fontWeight: 'bold' }}>{item.TenLop} </Text> gửi thư mời sự kiện đến <Text style={{ fontWeight: 'bold' }}>{item.TenHocSinh}</Text></Text>
                                    <Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
                                </View> : <View>
                                        <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} gửi thư mời sự kiện đến {item.TenHocSinh}</Text>
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
                    titleText={'Thư mời sự kiện'}
                />
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
export default Utils.connectRedux(ThuMoiSuKien, mapStateToProps)