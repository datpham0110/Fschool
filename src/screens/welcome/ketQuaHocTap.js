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

class KetQuaHocTap extends Component {
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
    }
    componentDidMount() {
        if (this.props.listchild.length > 0) {
            this._getData(0);
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
        }
    }
    _getData = async (pageNow) => {
        let childSelected = Utils.getGlobal(nGlobalKeys.childSelected, undefined);
        if (childSelected != undefined) {
            this.setState({ hocsinh: childSelected })
        }
        let res = await ThongBao_ListAll_App_V2(8, pageNow);
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
            let res = await ThongBao_ListAll_App_V2(8, this.state.pageNow);
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
        Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, type: 'ketquahoctap' })
    }
    _renderItemChild = ({ item, index }) => {
        var { data } = this.state
        return (
            <View style={{}}>
                {index != 0 ? item.NgayGui != data[index - 1].NgayGui ?
                    <Text style={{ textAlign: 'left', paddingTop: 20, paddingLeft: 10 }}>
                        {item.NgayGui}
                    </Text>
                    : null :
                    <Text style={{ textAlign: 'left', paddingTop: 20, paddingLeft: 10 }}>
                        {item.NgayGui}
                    </Text>
                }
                <TouchableOpacity onPress={() => this.goModalChiTiet(item)} key={index}
                    style={[nstyles.nrow, {
                        paddingVertical: 15, paddingHorizontal: 10, backgroundColor: item.IDTrangThai == 1 ? 'white' : colors.BackgroundHome
                    }]}>
                    <Image source={Images.icBell} style={nstyles.nIcon18} resizeMode='contain' />
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        {
                            item.IDTrangThai == 0 ? <View>
                                <Text style={{ fontSize: sizes.reSize(14) }}>Giáo viên <Text style={{ fontWeight: 'bold' }}>{item.TenLop} </Text> gửi kết quả học tập đến <Text style={{ fontWeight: 'bold' }}>{item.TenHocSinh}</Text></Text>
                                <Text numberOfLines={3} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
                            </View> : <View>
                                    <Text style={{ fontSize: sizes.reSize(14) }}>Giáo viên {item.TenLop} gửi kết quả học tập đến {item.TenHocSinh}</Text>
                                    <Text numberOfLines={3} style={{ fontSize: sizes.reSize(17), marginTop: 8, fontWeight: '300' }}>{item.NoiDung}</Text>
                                </View>
                        }
                    </View>
                </TouchableOpacity>
                {
                    index == data.length - 1 ? null : <View style={{ height: 1, backgroundColor: colors.BackgroundHome }} />
                }
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
                    titleText={'Kết quả học tập'}
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
export default Utils.connectRedux(KetQuaHocTap, mapStateToProps)