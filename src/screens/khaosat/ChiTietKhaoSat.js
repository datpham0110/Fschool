
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import { appConfig } from '../../app/Config';
import Utils from '../../app/Utils';
import { nstyles, Height } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { KhaoSat_Detail, KhaoSat_Reply } from '../../apis/Khaosat';
const { width } = Dimensions.get('window');
import { Rating, AirbnbRating } from 'react-native-ratings';
import ButtonCom from '../../components/Button/ButtonCom';
export default class ChiTietKhaoSat extends Component {
    constructor(props) {
        super(props);
        this.ChiTiet = null;
        this.actionDetail = Utils.ngetParam(this, 'actionDetail');
        this.reload = Utils.ngetParam(this, 'reload', () => { })
        this.tinhtrangSelect = Utils.ngetParam(this, 'tinhtrangSelect');
        this.state = {
            check: [],
            starCount: 3,
            dataCauHoi: [],
            data: [],
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        }, () => this.KhaoSatDetail());
    }
    componentDidMount() {
        this.KhaoSatDetail();
        // Utils.nlog('------this.actionDetail', this.actionDetail)
    }
    _copyData = async (data) => {
        let IDUser = Utils.getGlobal(nGlobalKeys.rowId, {});
        const { starCount } = this.state
        var IDRowKS = this.actionDetail.IDRow
        this.ChiTiet = data.map(item => {
            const IDRowCT = item.IDRow
            if (item.Loai == 1) {
                return { IDRowKS, IDRowCT, Sao: -1, NoiDung: 'Co', IDUser };
            } else {
                return { IDRowKS, IDRowCT, Sao: starCount, NoiDung: '', IDUser };
            }
        });
    }
    _handleItem = (id, val, rate) => {
        if (rate == 0) {
            this.ChiTiet[id].NoiDung = val;
        } else {
            this.ChiTiet[id].Sao = rate;
        };
    }
    _clickItem = (id, val, rate = 0) => {
        const dataCauHoi = this.state.dataCauHoi;
        dataCauHoi[id].noidung = val;
        this.setState({ dataCauHoi }, () => this._handleItem(id, val, rate));
    }
    KhaoSatDetail = async () => {
        let res = await KhaoSat_Detail(this.actionDetail.IDRow)
        let check = [];
        let dataCauHoi = [];
        if (res.success == true) {
            const data = res.data.data;
            dataCauHoi = data.map(item => {
                return { ...item, noidung: 'Co' };
            });
            this._copyData(data);
        };
        Utils.nlog('-------------------- dataCauHoi', dataCauHoi)
        this.setState({ dataCauHoi })
    }
    KhaoSat_Reply = async () => {
        let res = await KhaoSat_Reply(this.actionDetail.IDRow, this.ChiTiet)
        if (res.success == true) {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Cảm ơn quý phụ huynh đã góp ý', 'Đóng', () => { this.reload(true); Utils.goback(this) })
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', res.error.message, 'Đóng')
        }
    }
    _renderItem = ({ item, index }) => {
        var { check, dataCauHoi } = this.state;
        return (
            <View>
                {item.Loai == 1 ? <View style={{ backgroundColor: 'white', marginTop: 20, paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: sizes.fs(18), fontWeight: 'bold' }}>
                        {item.NoiDung}
                    </Text>
                    <View style={[nstyles.nrow, { flex: 1, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5, paddingTop: 15 }]}>
                        <TouchableOpacity onPress={() => this._clickItem(index, 'Co')} style={[nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={{ borderWidth: 1, borderColor: '#39b44a', justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10 }}>
                                <Image source={item.noidung == 'Co' ? Images.KScheck : Images.KSUncheck} resizeMode="contain" />
                            </View>
                            <Text style={{ paddingLeft: 5, fontSize: sizes.fs(16), fontWeight: 'bold' }}>Đồng ý</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity onPress={() => this._clickItem(index, 'Khong')} style={[nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={{ borderWidth: 1, borderColor: '#39b44a', justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10 }}>
                                <Image source={item.noidung == 'Khong' ? Images.KScheck : Images.KSUncheck} resizeMode="contain" />
                            </View>
                            <Text style={{ paddingLeft: 5, fontSize: sizes.fs(16), fontWeight: 'bold' }}>Không đồng ý</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity onPress={() => this._clickItem(index, 'Khong y kien')} style={[nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={{ borderWidth: 1, borderColor: '#39b44a', justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10 }}>
                                <Image source={item.noidung == 'Khong y kien' ? Images.KScheck : Images.KSUncheck} resizeMode="contain" />
                            </View>
                            <Text style={{ paddingLeft: 5, fontSize: sizes.fs(16), fontWeight: 'bold' }}>Không ý kiến</Text>
                        </TouchableOpacity>
                    </View>
                </View> : <View style={{ backgroundColor: 'white', marginTop: 20, padding: 20 }}>
                        <Text style={{ fontSize: sizes.fs(18), fontWeight: 'bold' }}>
                            {item.NoiDung}
                        </Text>
                        <View style={{ justifyContent: 'space-around', paddingHorizontal: 20 }}>
                            <AirbnbRating
                                count={5}
                                reviews={["Chưa hài lòng", "Tạm hài lòng", "Hài lòng", "Tốt", "Xuất sắc"]}
                                defaultRating={this.state.starCount}
                                size={35}
                                onFinishRating={(rating) => this._clickItem(index, 'Sao', rating)}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    }
    render() {
        var { check, dataCauHoi, starCount, data } = this.state;
        // console.log('Check', this.tinhtrangSelect)
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Chi tiết khảo sát'}
                />
                <ScrollView showsVerticalScrollIndicator={false}
                    style={[nstyles.nbody, { backgroundColor: colors.whitegay, marginTop: 15, marginHorizontal: 10, borderRadius: 4 }]}>
                    <Text style={{ color: '#29a9e0', fontSize: sizes.fs(18), fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
                        {this.actionDetail.TieuDe}
                    </Text>
                    <Text style={{ fontSize: sizes.fs(16), fontWeight: '300', textAlign: 'center', marginBottom: 16 }}>
                        {'Khảo sát bắt đầu vào lúc ' + moment(this.actionDetail.NgayBatDau, 'MM/DD/YYYY hh:mm:ss A').format("DD/MM/YYYY HH:mm") + '\n và kết thúc lúc ' + moment(this.actionDetail.NgayKetThuc, 'MM/DD/YYYY hh:mm:ss A').format("DD/MM/YYYY HH:mm")}
                    </Text>
                    {
                        this.actionDetail.TrangThaiTraLoi == 1 ? <Text style={{ fontSize: sizes.fs(16), fontWeight: '300', color: 'red', textAlign: 'center', marginBottom: 10 }}>
                            {'Phụ huynh đã khảo sát'}
                        </Text> : null
                    }
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={dataCauHoi}
                        renderItem={this._renderItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </ScrollView>
                {
                    this.actionDetail.TrangThaiTraLoi == 1 || this.actionDetail.TrangThai == 2 || this.actionDetail.TrangThai == 3 ? <View style={[nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                        <ButtonCom
                            onPress={() => Utils.goback(this)}
                            text={"Quay lại"}
                            // disabled={!this.state.flagCapNhat}
                            txtStyle={{ color: '#00b096' }}
                            style={{ paddingHorizontal: 50, marginTop: 10, marginBottom: 25, borderColor: '#00b096', borderWidth: 1 }} />
                    </View> : <View style={[nstyles.nrow, { justifyContent: 'center', alignItems: 'center' }]}>
                            <ButtonCom
                                onPress={() => Utils.goback(this)}
                                text={"Huỷ"}
                                txtStyle={{ color: '#00b096' }}
                                style={{ paddingHorizontal: 50, marginTop: 10, marginBottom: 25, borderColor: '#00b096', borderWidth: 1 }} />
                            <View style={{ width: 20 }} />
                            <ButtonCom
                                onPress={this.KhaoSat_Reply}
                                text={"Hoàn tất"}
                                txtStyle={{ color: 'white' }}
                                style={{ paddingHorizontal: 30, backgroundColor: '#00b096', marginTop: 10, marginBottom: 25 }} />
                        </View>
                }
            </View >
        );
    }
}