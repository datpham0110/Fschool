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
import { ROOTGlobal } from '../../app/data/dataGlobal';

import Moment from "moment";

import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
const { width } = Dimensions.get('window');

class GocHoatDongHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLop: [],
            valuListLop: '',
            valuListTruong: ROOTGlobal.IdCN,
            classSelected: '',
            listAction: [],
            hocSinhData: '',
            refreshing: true,
        };
        this.more = false;
        this.pageNumber = 0;
        this.pageSize = 10;
        this.sortOrder = 'desc';
        this.sortField = 'NgayDang';
        this.listChild = props.listchild;
        this.codeClassList = [];
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh')
        this.flagNotify = Utils.ngetParam(this, 'flagNotify', false)
    }
    componentDidMount() {
        if (this.listChild.length > 0) {
            if (this.flagNotify == true) {
                for (let i = 0; i < this.listChild.length; i++) {
                    if (this.IDHocSinh == this.listChild[i].IDKhachHang) {
                        this.setState({ hocSinhData: this.listChild[i] })
                        Utils.setGlobal(nGlobalKeys.childSelected, this.listChild[i]);
                        this._loadListActionNotify(this.listChild[i].IDLopHoc)
                        break;
                    }
                }
            } else {
                this.setState({ hocSinhData: this.props.listchild[0] })
                Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);

                this._loadListAction(this.props.listchild[0])
            }
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng')
            Utils.goback(this)
        }
    }

    _loadListActionNotify = async (IDHocSinh) => {
        let res = await HoatDong_List(this.more, this.pageNumber, this.pageSize, this.sortOrder, this.sortField, IDHocSinh)
        if (res.status == 1) {
            listAction = res.data
        } else {
            listAction = []
        }
        this.setState({ listAction, refreshing: false })

    }
    _loadListAction = async (item) => {
        this.setState({ hocSinhData: item })
        let res = await HoatDong_List(this.more, this.pageNumber, this.pageSize, this.sortOrder, this.sortField, item.IDLopHoc)
        if (res.status == 1) {
            listAction = res.data
        } else {
            listAction = []
        }
        this.setState({ listAction, refreshing: false })
    }
    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._loadListActionNotify(this.state.hocSinhData.IDLopHoc));
    }
    _renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => Utils.goscreen(this, 'sc_ChiTietGocHoatDong', { actionDetail: item, _onRefresh: this._onRefresh })} style={[nstyles.nrow, { paddingVertical: 14, paddingHorizontal: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={{ width: sizes.reSize(48), height: sizes.reSize(48), borderRadius: sizes.reSize(24), borderWidth: 1, borderColor: colors.veryLightPinkThree }}>
                        <Image style={{ width: sizes.reSize(47), height: sizes.reSize(47) }} source={Images.icGocHD} resizeMode='contain' />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ flex: 1, paddingHorizontal: 7 }}>
                            <Text style={[styles.text13, { fontWeight: 'bold' }]}>{item.TieuDe}</Text>
                        </View>
                        <View style={[nstyles.nrow, { flex: 1, paddingHorizontal: 7, paddingVertical: 8 }]}>
                            <Text numberOfLines={1} style={{ fontSize: sizes.reSize(12), flex: 1, fontStyle: 'italic' }}>{item.NoiDung}</Text>
                        </View>
                        <View style={[nstyles.nrow, { flex: 1, paddingHorizontal: 7 }]}>
                            <Text numberOfLines={1} style={{ fontSize: sizes.reSize(10), flex: 1, fontStyle: 'italic', color: colors.black_80 }}>{moment(item.NgayDang, 'MM/DD/YYYY h:mm:ss A').format("DD/MM/YYYY HH:mm")}</Text>
                        </View>
                    </View>
                    <View style={nstyles.nrow}>
                        <Image source={Images.icLikeGocHD} resizeMode='contain' />
                        <Text style={{ fontSize: sizes.reSize(12), marginLeft: 5 }}>{item.Tim}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: '#b8b8b8', marginLeft: 85, opacity: 0.4 }} />
            </View>
        )
    }
    render() {
        var { listAction } = this.state
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Góc hoạt động'} />
                {this.listChild.length > 0 ?
                    <View style={[nstyles.nbody, { backgroundColor: colors.whitegay, marginTop: 15, marginHorizontal: 20, borderRadius: 4 }]}>
                        <View style={{ flexDirection: 'row', marginBottom: 10, paddingVertical: 15, backgroundColor: 'white', borderRadius: 4 }}>
                            <TouchableOpacity
                                style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}
                                onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, _renderdata: this._loadListAction })}>
                                <View>
                                    <Text style={{ fontSize: 15, paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: 'black' }}>
                                        {this.state.hocSinhData.LopHoc}
                                    </Text>
                                    <Text style={{
                                        fontSize: 16, fontWeight: "800", color: "black"
                                    }} >
                                        {this.state.hocSinhData.TenKhachHang}
                                    </Text>
                                </View>
                                <Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nIcon20, { tintColor: colors.black_20, marginLeft: 5, top: -10 }]} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                            showsVerticalScrollIndicator={false}
                            data={listAction}
                            renderItem={this._renderItem}
                            extraData={listAction}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    </View> :
                    <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "500", textAlign: 'center', color: 'black' }}>
                        Không có liên kết với học sinh
             </Text>}
            </View>
        );
    }
}


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
        // width: '33%',
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'
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

export default Utils.connectRedux(GocHoatDongHome, mapStateToProps, false);