
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import ListEmpty from "../../components/ListEmpty";
import { reSize, reText } from '../../styles/size';
import Utils from '../../app/Utils';
import { nstyles, Height } from '../../styles/styles';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { HoatDong_List } from '../../apis/gochoatdong';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { Picker } from 'native-base';
import DatePick from '../../components/DatePick';
import { ROOTGlobal } from '../../app/data/dataGlobal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from "moment";
import { ScrollView } from 'react-native-gesture-handler';
import { KhaoSat_List } from '../../apis/Khaosat';
import moment from 'moment';
const { width } = Dimensions.get('window');
const dangtienhanh = 1, daxong = 2, tatca = 0, chuatienhanh = 3
class KhaosatHome extends Component {
    constructor(props) {
        super(props);
        nthisApp = this;
        this.state = {
            listLop: [],
            valuListLop: 'Mam non',
            valuListTruong: ROOTGlobal.IdCN,
            classSelected: '',
            listAction: [],
            hocSinhData: [],
            tinhtrangSelect: tatca,
            refreshing: true,
        };
        this.more = true;
        this.pageNumber = 0;
        this.pageSize = 10;
        this.sortOrder = 'desc';
        this.sortField = 'Tim';
        this.listChild = props.listchild;
        this.codeClassList = [];
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null);
        this.flagNotify = Utils.ngetParam(this, 'flagNotify', false)
    }
    componentDidMount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'KhaoSat')
        this.CheckList()
    }
    componentWillUnmount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
    }
    CheckList = async () => {
        if (this.props.listchild.length > 0) {
            if (this.flagNotify == false) {
                if (this.IDHocSinh != null) {
                    for (let i = 0; i < this.props.listchild.length; i++) {
                        if (this.IDHocSinh == this.props.listchild[i].IDKhachHang) {
                            this.setState({ hocSinhData: this.props.listchild[i] })
                            Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
                            this._loadListAction(this.props.listchild[i])
                            break;
                        }
                    }
                } else {
                    this.setState({ hocSinhData: this.props.listchild[0] })
                    Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);
                    this._loadListAction(this.props.listchild[0])

                }
            } else {
                this.setState({ hocSinhData: this.props.listchild[0] })
                Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);
                this._loadListAction(this.props.listchild[0])
            }
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
        }
    }
    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._loadListAction(this.state.hocSinhData));
    }
    _loadListAction = async (item) => {
        var { tinhtrangSelect, classSelected } = this.state
        let res = await KhaoSat_List(this.more, this.pageNumber, this.pageSize, this.sortOrder, this.sortField, item.IDLopHoc, tinhtrangSelect)
        Utils.nlog('------------', res)
        if (res.status == 1) {
            listAction = res.data
        } else {
            listAction = []
        }
        this.setState({ listAction, refreshing: false, hocSinhData: item })
    }
    reload = (flaf) => {
        this.CheckList()
    }
    goChiTiet = (item) => {
        var { tinhtrangSelect } = this.state
        Utils.goscreen(this, 'sc_ChiTietKhaoSat', { actionDetail: item, reload: this.reload, tinhtrangSelect: tinhtrangSelect })
    }
    _renderItem = ({ item, index }) => {
        Utils.nlog('-------------------- Khảo sát', item.NgayTao)
        return (
            <View>
                <TouchableOpacity onPress={() => this.goChiTiet(item)}
                    style={{ paddingVertical: 14, paddingHorizontal: 18, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={[styles.text13, { fontWeight: 'bold', textAlign: 'left' }]}>{item.TieuDe}</Text>
                    </View>
                    <View style={[nstyles.nrow, { justifyContent: 'space-between', paddingTop: 15 }]}>
                        <Text style={{ fontSize: sizes.reSize(12), fontStyle: 'italic', flex: 1 }}>{moment(item.NgayTao, 'MM/DD/YYYY hh:mm:ss A').format("DD/MM/YYYY HH:mm")}</Text>
                        <View>
                            <Text style={{ fontSize: sizes.reSize(12), color: item.TrangThai == 2 ? '#29AAE1' : item.TrangThai == 1 ? '#f5911e' : '#74d497' }}>{item.TrangThai == 2 ? 'Đã xong' : item.TrangThai == 1 ? 'Đang tiến hành' : 'Chưa tiến hành'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#b8b8b8', marginHorizontal: 18, opacity: 0.4 }} />
            </View>
        )
    }
    render() {
        var { listAction, tinhtrangSelect } = this.state
        console.log('tinhtrangSelect', tinhtrangSelect)
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Khảo sát'} />
                <View style={[nstyles.nbody, { backgroundColor: colors.whitegay, marginTop: 15, marginHorizontal: 20, borderRadius: 4 }]}>
                    <View style={[nstyles.nrow, { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, borderRadius: 4 }]}>
                        <TouchableOpacity
                            style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}
                            onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, _renderdata: this._loadListAction })}>
                            <View>
                                <Text style={{ fontSize: 15, paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: 'black' }}>
                                    {this.state.hocSinhData.LopHoc}
                                </Text>
                                <Text style={{
                                    fontSize: 16, fontWeight: "800", color: "black"
                                }}>
                                    {this.state.hocSinhData.TenKhachHang}
                                </Text>
                            </View>
                            <Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nIcon20, { tintColor: colors.black_20, marginLeft: 5, top: -10 }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={[nstyles.nrow, { backgroundColor: 'white', marginBottom: 10, paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' }]}>
                        <View style={[nstyles.nrow, stHoctap.container]}>
                            <View style={{ flex: 1, }}>
                                {Platform.OS == 'ios' ?
                                    <View style={{ position: 'absolute', right: 5, top: 0, bottom: 0, justifyContent: 'center' }}>
                                        <Image source={Images.icDown} resizeMode='contain' style={[nstyles.nIcon20, { tintColor: '#A3A3A3' }]} />
                                    </View>
                                    : null
                                }
                                <Picker
                                    mode="dropdown"
                                    placeholder={'Chọn tính trạng'}
                                    style={{ width: '100%', height: 30 }}
                                    textStyle={{ fontWeight: 'bold', fontSize: 13 }}
                                    selectedValue={tinhtrangSelect}
                                    onValueChange={(val) => {
                                        this.setState({ tinhtrangSelect: val }, () => this._onRefresh())
                                    }}>
                                    <Picker.Item label={'Tất cả'} value={tatca} />
                                    <Picker.Item label={'Đang tiến hành'} value={dangtienhanh} />
                                    <Picker.Item label={'Chưa tiến hành'} value={chuatienhanh} />
                                    <Picker.Item label={'Đã xong'} value={daxong} />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        showsVerticalScrollIndicator={false}
                        data={listAction}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View >
        );
    }
}
const stHoctap = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.whitegay,
        padding: 5,
        flex: 1, borderRadius: 4
    },
    stext: {
        fontSize: sizes.reText(13),
        fontWeight: '500'
    },
    containText: {
        backgroundColor: colors.whitegay,
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 3,
        paddingHorizontal: 10
    }
})
const styles = StyleSheet.create({
    textNameStudent1: {
        marginTop: 15,
        color: colors.blackShadow,
        fontSize: reText(12),
        textAlign: 'center',
        marginBottom: 10,
        flex: 1,
        width: 100
    },
    viewItemStudent1: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        ...nstyles.nbody,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    viewTitle: {
        backgroundColor: colors.white,
        paddingTop: 21,
        paddingHorizontal: 25,
        paddingRight: 26,
    },
    viewStudents: {
        backgroundColor: colors.white,
    },
    textThuNgayThang: {
        color: colors.blackShadow,
        fontSize: reText(16),
        fontWeight: '500',
        textAlign: 'center'
    },
    textThuNgayThang1: {
        color: colors.blackShadow,
        fontSize: reText(20),
        fontWeight: '500',
        textAlign: 'center'
    },
    textSubtitle: {
        marginTop: 4,
        color: colors.grey,
        fontSize: reText(12),
        textAlign: 'center'
    },
    viewTime: {
        flex: 1,
        backgroundColor: colors.white,
        borderColor: colors.veryLightPinkFour,
        borderWidth: 0.2,
        borderRadius: 3,
        padding: 9,
        paddingTop: 7,
    },
    viewTotalStudents: {
        ...nstyles.nrow,
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switchEnoughAllStudents: {
        ...Platform.select({
            ios: {
                transform: [
                    { scaleX: .8 },
                    { scaleY: .8 }
                ],
            },
        }),
        marginLeft: 10
    },
    viewItemStudent: {
        flex: 1,
        alignItems: 'center',
    },
    viewSelectStudent: {
        ...nstyles.nIcon32,
        marginTop: 22,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colors.mediumGreen
    },
    textNameStudent: {
        marginTop: 15,
        color: colors.blackShadow,
        fontSize: reText(12),
        textAlign: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        flex: 1,
        width: 100
    },
    stext: {
        fontSize: sizes.reText(13),
        fontWeight: '500'
    },
})
const mapStateToProps = state => ({
    listchild: state.listchild
});
export default Utils.connectRedux(KhaosatHome, mapStateToProps, false);