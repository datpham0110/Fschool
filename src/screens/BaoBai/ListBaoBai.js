import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import Utils from '../../app/Utils';
import { nstyles } from '../../styles/styles';
import { fs } from '../../styles/size';

import { nGlobalKeys } from '../../app/keys/globalKey';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ListEmpty from '../../components/ListEmpty';
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import { ThongBao_ListAll_App } from '../../apis/notifycation';

const { width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';


class ListBaoBai extends Component {
    constructor(props) {
        super(props);
        nthisApp = this;
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null);
        this.IDChiNhanh = Utils.ngetParam(this, 'IDChiNhanh');
        this.flagNotifiy = Utils.ngetParam(this, 'flagNotifiy', false)
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
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'sc_ListBaoBai')
        // this._renderdata(this.IDHocSinh)
        if (this.flagNotifiy == true) {
            for (let i = 0; i < this.props.listchild.length; i++) {
                if (this.props.listchild[i].IDKhachHang == this.IDHocSinh) {
                    this.IDChiNhanh = this.props.listchild[i].IDChiNhanh;
                    this._renderdata(this.IDHocSinh)
                    break;
                }
            }
        } else {
            this._renderdata(this.IDHocSinh)
        }

    }

    componentWillUnmount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
    }
    _renderdata = (IDKhachHang) => {
        this.setState({ refreshing: true })
        this._getData(IDKhachHang)
    }
    _getData = async (IDKhachHang) => {
        let res = await ThongBao_ListAll_App_V2(2, 0, IDKhachHang, this.IDChiNhanh);
        if (res.success == true && res.data != null) {
            this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: this.state.pageNow + 1, refreshing: false, showload: false });
        } else {
            this.setState({ data: [], allPage: 0, pageNow: 0, refreshing: false, showload: false });
        };
    };
    goModalChiTiet = (item, noiDung) => {
        Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, noiDung: noiDung, IDHocSinh: this.IDHocSinh, IDChiNhanh: this.IDChiNhanh })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._getData(this.IDHocSinh));
    }
    loadMore = async () => {
        if (this.state.pageNow < this.state.allPage) {
            let res = await ThongBao_ListAll_App_V2(2, this.state.pageNow, this.IDHocSinh, this.IDChiNhanh);
            Utils.nlog('------------------ res', res)
            if (res.success == true) {
                data = this.state.data.concat(res.data);
            }
            this.setState({ data: data, pageNow: this.state.pageNow + 1, showload: false });
        }
    }
    goBack = async () => {
        // this._getData(this.IDHocSinh);
        let res = await ThongBao_ListAll_App_V2(2, 0, this.IDHocSinh, this.IDChiNhanh);
        if (res.success == true && res.data != null) {
            this.setState({ data: res.data, allPage: res.page.AllPage, pageNow: 1, refreshing: false, showload: false });
        } else {
            this.setState({ data: [], allPage: 0, pageNow: 0, refreshing: false, showload: false });
        };
    }

    _renderItemChild = ({ item, index }) => {
        var { data } = this.state
        let text = 'Giáo viên ' + item.TenLop
        text += item.IDLoai == 5 ? ' gửi ghi chú báo bài ' : ' gửi báo bài '
        text += 'đến ' + item.TenHocSinh
        return (
            <View>
                {index != 0 ? item.NgayGui != data[index - 1].NgayGui ?
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#f8b199', '#f27972']}
                        style={{ backgroundColor: colors.nocolor }}>
                        <Text style={stListBaoBai.styTitDat}>Ngày {item.NgayGui}</Text>
                    </LinearGradient>
                    : null :
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#f8b199', '#f27972']}
                        style={{ backgroundColor: colors.nocolor  }}>
                        <Text style={stListBaoBai.styTitDat}>Ngày {item.NgayGui}</Text>
                    </LinearGradient>
                }
                <TouchableOpacity onPress={() => this.goModalChiTiet(item, text)} key={index} style={{ borderBottomColor: colors.black_20, borderBottomWidth: 0.5, flexDirection: 'column' }}>
                    <View
                        style={{
                            paddingVertical: 15, paddingHorizontal: 12, minHeight: 100,
                            backgroundColor: item.IDTrangThai == 1 ? 'white' : '#edf2fa'
                        }}>
                        <View style={[nstyles.nrow, { }]}>
                            <Image
                                source={Images.icBell}
                                style={nstyles.nIcon22}
                                resizeMode='contain'
                            />
                            <View style={{ paddingLeft: 10 ,  paddingRight: 10 }}>
                                {item.IDTrangThai == 0 ? <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên <Text style={{ fontWeight: 'bold' }}>{item.TenLop} </Text>{item.IDLoai == 5 ? 'gửi ghi chú báo bài ' : 'gửi báo bài '}đến <Text style={{ fontWeight: 'bold' }}>{item.TenHocSinh}</Text></Text>
                                    :
                                    <Text numberOfLines={2} style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} {item.IDLoai == 5 ? 'gửi ghi chú báo bài ' : 'gửi báo bài '}đến {item.TenHocSinh}</Text>
                                }
                                <Text numberOfLines={2} style={{ fontSize: sizes.reSize(17), paddingTop: 10, fontWeight: '300' }}>{item.NoiDung}</Text>
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

const stListBaoBai = StyleSheet.create({
    styTitDat: {
        textAlign: 'center', marginVertical: 14, marginLeft: 10, color: 'white', fontWeight: '700', fontSize: fs(16)
    }
})




const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(ListBaoBai, mapStateToProps)