import React, { Component, Fragment } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import Utils from '../../app/Utils';
import { nstyles, nColors, khoangcach } from '../../styles/styles';
import { fs } from '../../styles/size';
import YouTubePlay from '../../components/YouTubePlay';
import { nGlobalKeys } from '../../app/keys/globalKey';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ListEmpty from '../../components/ListEmpty';
import { ThongBao_ListAll_App_V2 } from '../../apis/notifycation';
import { ThongBao_ListAll_App } from '../../apis/notifycation';

const { width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import ButtonCom from '../../components/Button/ButtonCom';


class ListBaoBai extends Component {
    constructor(props) {
        super(props);
        nthisApp = this;
        this.dataBaobai = Utils.ngetParam(this, 'dataBaobai');
        this.dbTenHocSinh = Utils.ngetParam(this, 'dbTenHocSinh');
        this.dataBaiTap = Utils.ngetParam(this, 'dataBaiTap');
        this.idVideo = Utils.ngetParam(this, 'idVideo');
        this.state = {
            data: [],
            pageNow: 0,
            allPage: '',
            showload: false,
            hocsinh: '',
            refreshing: true,
            hocSinhData: '',
            showVideo: false,
            isBaiKiemTra: false,
            cauTraLoi: ''
        };
    }
    componentDidMount() {
        // if (data.IDLoai == 2 && data.IsCoBaiKiemTra == true) {
        // }
        this._getIDYoutube(this.idVideo);
    }
    _getIDYoutube = (string) => {
        if (string == null) return;
        const index = string.lastIndexOf('=');
        const index1 = string.lastIndexOf('/');
        if (index != -1 || index1 != -1) {
            if (index != -1) {
                const id = string.slice(index + 1);
                this.idVideo = id;
                return;
            };
            if (index1 != -1) {
                const id = string.slice(index1 + 1);
                this.idVideo = id;
                return;
            };
        };
    }
    goModalChiTiet = (item, noiDung) => {
        Utils.goscreen(this, 'Modal_ChiTietThongBao', { data: item, goBack: this.goBack, noiDung: noiDung, IDHocSinh: this.IDHocSinh, IDChiNhanh: this.IDChiNhanh })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._getData(this.IDHocSinh));
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
        const { showVideo, isBaiKiemTra } = this.state;
        var { data } = this.state
        let text = 'Giáo viên ' + item.TenLop
        text += item.IDLoai == 5 ? ' gửi ghi chú báo bài ' : ' gửi báo bài '
        text += 'đến ' + item.TenHocSinh

        return (
            <View key={index} style={{ flexDirection: 'column' }}>
                <View
                    style={{
                        paddingVertical: 15, paddingHorizontal: 12, minHeight: 100,
                        backgroundColor: 'white'
                    }}>
                    <View style={[nstyles.nrow, {}]}>
                        <Image
                            source={Images.icStarReview}
                            style={nstyles.nIcon22}
                            resizeMode='contain'
                        />
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Text numberOfLines={2} style={{ fontSize: sizes.fs(18) }}>Giáo viên Kiệt gửi báo bài đến {this.dbTenHocSinh}</Text>
                            <Text numberOfLines={2} style={{ fontSize: sizes.fs(22), paddingTop: 10, fontWeight: '300' }}>{item.NoiDung}</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, marginBottom: 5, flexDirection: 'row', backgroundColor: 'white' }}>
                        {item.TieuDeVideo != '' ?
                            <TouchableOpacity
                                onPress={() => { this.setState({ showVideo: !showVideo }) }}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Images.icPlayVideo} style={nstyles.nIcon20} resizeMode='contain' />
                                <Text style={{ marginLeft: 10, fontSize: sizes.fs(18), fontWeight: '500' }}>{item.TieuDeVideo}</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity></TouchableOpacity>
                        }
                    </View>

                </View>
            </View>
        );
    };
    _onChangeText = (text) => {
        this.state.cauTraLoi = text;
    }
    _renderItemCauHoi = ({ item, index }) => {
        return (
            <View style={{ marginVertical: 5, borderRadius: 3, backgroundColor: 'white' }}>
                <Text style={{ fontWeight: '500', fontSize: sizes.fs(20), paddingBottom: 5 }}>
                    Câu {index + 1}: {item.NoiDung}?
                </Text>
                <View>
                    <Text style={{ fontSize: sizes.fs(18), paddingBottom: 5 }}>A. {item.DapAn1}</Text>
                    <Text style={{ fontSize: sizes.fs(18), paddingBottom: 5 }}>B. {item.DapAn2}</Text>
                    <Text style={{ fontSize: sizes.fs(18), paddingBottom: 5 }}>C. {item.DapAn3}</Text>
                    <Text style={{ fontSize: sizes.fs(18), paddingBottom: 5 }}>D. {item.DapAn4}</Text>
                </View>

            </View>
        )
    }
    render() {
        var isTransparent = false
        Utils.nlog('database', this.dataBaobai)
        const { showVideo } = this.state;
        Utils.nlog('this.dataBaiTap', this.dataBaiTap, this.idVideo)
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Báo bài'}
                />
                <ScrollView style={nstyles.nbody}>
                    <View>
                        <FlatList
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                            renderItem={this._renderItemChild}
                            data={this.dataBaobai}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View>
                        {showVideo ? <YouTubePlay idVideo={this.idVideo} /> : null}
                    </View>
                    <View style={{ paddingHorizontal: 12 }}>
                        <Text style={{ fontSize: fs(20), fontWeight: '500', paddingVertical: 5 }}>Tiêu đề bài tập: {this.dataBaiTap.TieuDe} - Tổng số câu hỏi: {this.dataBaiTap.TongSoLuongCauHoi}</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={this.dataBaiTap.listCauHoiBaoBai}
                            renderItem={this._renderItemCauHoi}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={[nstyles.nrow, { paddingBottom: 5, paddingHorizontal: 12 }]}>
                        <Text style={{ fontSize: sizes.fs(18), paddingBottom: 3 }}>Đáp án:</Text>
                        <View style={{ flex: 1, borderBottomColor: colors.black_20, borderBottomWidth: 0.5 }}>
                            <TextInput
                                style={{ paddingVertical: 0, fontSize: sizes.fs(18) }}
                                onChangeText={this._onChangeText}
                            >{this.state.cauTraLoi}</TextInput>
                        </View>
                    </View>
                </ScrollView>
                <ButtonCom
                    colorChange={['#f8b199', '#f27972']}
                    Linear={true}
                    text={"Hoàn thành"}
                    style={{ marginHorizontal: khoangcach, marginVertical: 10 }}
                />
            </View>
        );
    }
}






const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(ListBaoBai, mapStateToProps)