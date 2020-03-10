
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
import { withNavigationFocus } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { ThongBao_Update } from '../../apis/getNotifycation';

class ThongBaoAll extends Component {
    constructor(props) {
        super(props);
        nthisAppNotifyAll = this;
        this.state = {
            data: '',
            pageNow: 0,
            allPage: '',
            flag: false,
            hocsinh: '',
        };
        this.refesdata = Utils.ngetParam(this, 'refesdata', () => { })
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null);
        this.IDChiNhanh = Utils.ngetParam(this, 'IDChiNhanh');
        this.flagNotifiy = Utils.ngetParam(this, 'flagNotifiy', false)
    }
    componentDidMount() {
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
        // this._getData(0);
    }
    _getData = async (pageNow) => {
        this.setState({ flag: true });
        let res = await ThongBao_ListAll_App_V2(0, pageNow, this.IDHocSinh, this.IDChiNhanh);
        if (res.success == true && res.data != null) {
            this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: pageNow + 1 });
        } else {
            this.setState({ data: [], allPage: 0, pageNow: 0 });
        }
        this.setState({ flag: false });
    };
    loadMore = async () => {
        this.setState({ flag: true });
        if (this.state.pageNow < this.state.allPage) {
            let res = await ThongBao_ListAll_App_V2(0, this.state.pageNow, this.IDHocSinh, this.IDChiNhanh);
            if (res.success == true) {
                let data = this.state.data.concat(res.data);
                this.setState({ data: data, pageNow: this.state.pageNow + 1 });
            }
        }
        this.setState({ flag: false });
    }
    goBack = async () => {
        this._getData(0);
    }
    goModalChiTiet = async (item) => {
        if (item.IDLoai == 3) {
            Utils.goscreen(this, 'sc_HocPhi', { isNotify: true, dataNotify: item, goBack: this.goBack })
            let res = await ThongBao_Update(
                item.IDThongBao,
            );

        } else {
            Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack })
        }
    }
    _renderItemChild = ({ item, index }) => {
        let tieude = item.TenThongBao == 'Thư mời sự kiện' ? 'Giáo viên ' + item.TenLop + ' gửi thư mời sự kiện đến ' + item.TenHocSinh : item.TenThongBao == 'Kết quả học tập' ? 'Giáo viên ' + item.TenLop + ' gửi kết quả học tập đến ' + item.TenHocSinh : 'null'
        var { data } = this.state
        return (
            <View>
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
                            style={{
                                borderColor: colors.black_20,
                                // borderWidth: 0.5,
                                flexDirection: 'column'
                            }}
                        // style={[nstyles.nrow, { paddingVertical: 15, paddingHorizontal: 10, height: 110, backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa' }]}
                        >
                            <View
                                style={{
                                    paddingVertical: 15, paddingHorizontal: 15, minHeight: 100,
                                    backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa'
                                }}>
                                <View style={[nstyles.nrow, { alignItems: 'center' }]}>
                                    <Image
                                        source={Images.icBell}
                                        style={nstyles.nIcon18}
                                        resizeMode='contain' />
                                    <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
                                        {item.TenThongBao != 'Thông báo học phí' ?
                                            item.IDTrangThai == 0 ? tieude == 'null' ? <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên <Text style={{ fontWeight: 'bold' }}>{item.TenLop} </Text>{item.IDLoai == 5 ? 'gửi ghi chú báo bài ' : 'gửi báo bài '} đến <Text style={{ fontWeight: 'bold' }}>{item.TenHocSinh}</Text></Text> : <Text style={{ fontSize: sizes.reSize(14) }}>{tieude}</Text>
                                                :
                                                tieude == 'null' ?
                                                    <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} gửi báo bài {item.TieuDe} đến {item.TenHocSinh}</Text> :
                                                    <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>{tieude}</Text> : <Text style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} gửi thông báo học phí đến {item.TenHocSinh}</Text>}
                                        <Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, marginBottom: 5, flexDirection: 'row', backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa' }}>
                                    {item.TieuDeVideo != '' ?
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={Images.icPlayVideo} style={nstyles.nIcon20} resizeMode='contain' />
                                            <Text style={{ marginLeft: 10, fontSize: sizes.fs(18), fontWeight: '500' }}>{item.TieuDeVideo}</Text>
                                        </View> :
                                        <View></View>
                                    }
                                    {
                                        item.IsCoBaiKiemTra == true ?
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={Images.icBaiKiemTra} style={nstyles.nIcon20} resizeMode='contain' />
                                                <Text style={{ marginLeft: 10, fontSize: sizes.fs(18), fontWeight: '500' }}>Bài kiểm tra</Text>
                                            </View> : null
                                    }
                                </View>
                            </View>






                        </TouchableOpacity>
                    </View>
                </View >
            </View>
        );
    }
    _renderdata = () => {
        this._getData(0);
    }
    goBack1 = () => {
        this.refesdata()
        Utils.goback(this, null)
    }
    //this.refesdata
    render() {
        var isTransparent = false
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    onPressLeft={this.goBack1}
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Thông báo'}
                />
                {
                    this.state.flag == false && this.state.data == '' ?
                        <Text>Không có dữ liệu</Text> : null
                }
                <FlatList
                    showsVerticalScrollIndicator={false}
                    // ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                    renderItem={this._renderItemChild}
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => this.loadMore()}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={
                        this.state.flag == true ?
                            <ActivityIndicator>
                            </ActivityIndicator> : null
                    }
                />
            </View>
        );
    }
}


const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(withNavigationFocus(ThongBaoAll), mapStateToProps)