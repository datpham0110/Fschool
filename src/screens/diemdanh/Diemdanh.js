
import React, { Component } from "react"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { Dimensions } from "react-native"
import { colors, sizes } from "../../styles"
import Utils from "../../app/Utils"
import { nstyles } from "../../styles/styles"
import { nGlobalKeys } from "../../app/keys/globalKey"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images"
import { DiemDanh_List_App_New } from "../../apis/diemdanh"
const { width, height } = Dimensions.get("window");

class Diemdanh extends Component {
    constructor(props) {
        super(props)
        nthisApp = this;
        let tempDate = new Date();
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
        this.state = {
            allData: [],
            // tenHocSinh: Utils.getGlobal(nGlobalKeys.tenKH, null),
            // IDHocSinh: Utils.getGlobal(nGlobalKeys.IdHocSinh, ''),
            childSelected: Utils.getGlobal(nGlobalKeys.childSelected, undefined),
            flagNextDate: false,
            hocSinhData: '',
            refreshing: true,
            dateShowSelect: (tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate()) + '/' + ((tempDate.getMonth() + 1) < 10 ? ('0' + (tempDate.getMonth() + 1)) : (tempDate.getMonth() + 1)) + '/' + tempDate.getFullYear(),
            dateSelect: new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()),
            dateShowSelectOld: (tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate()) + '/' + ((tempDate.getMonth() + 1) < 10 ? ('0' + (tempDate.getMonth() + 1)) : (tempDate.getMonth() + 1)) + '/' + tempDate.getFullYear(),
            dateSelectOld: new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
        }
        this.IDKhachHang = [];
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh', null);
    }
    componentDidMount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'DiemDanh')
        this.checkID()
    }
    componentWillUnmount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
    }
    checkID = async () => {
        if (this.props.listchild.length > 0) {
            if (this.IDHocSinh != null) {
                for (let i = 0; i < this.props.listchild.length; i++) {
                    if (this.IDHocSinh == this.props.listchild[i].IDKhachHang) {
                        this.setState({ hocSinhData: this.props.listchild[i] })
                        Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
                        this._loadData(this.state.dateShowSelect, this.IDHocSinh)
                        break;
                    }
                }
            } else {
                this.setState({ hocSinhData: this.props.listchild[0], refreshing: true })
                Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);
                this._loadData(this.state.dateShowSelect, this.props.listchild[0].IDKhachHang)
            }
        } else {
            Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
        }
    }
    _loadData = async (date, IDKhachHang) => {
        let res = await DiemDanh_List_App_New(IDKhachHang, date)
        if (res.status == 1 && res.data.length > 0) {
            allData = res.data
        } else {
            allData = []
        }
        this.setState({ allData, refreshing: false })
    }
    back = async () => {
        let dateSelect = this.state.dateSelect;
        let dateNew = new Date(dateSelect.getFullYear(), dateSelect.getMonth(), dateSelect.getDate() - 1)
        let dataSearch = (dateNew.getDate() < 10 ? '0' + dateNew.getDate() : dateNew.getDate()) + '/' + ((dateNew.getMonth() + 1) < 10 ? ('0' + (dateNew.getMonth() + 1)) : (dateNew.getMonth() + 1)) + '/' + dateNew.getFullYear()
        this.setState({ dateSelect: dateNew, dateShowSelect: dataSearch });
        this._loadData(dataSearch, this.state.hocSinhData.IDKhachHang)
    }
    _renderdata = (item) => {
        this._loadData(this.state.dateShowSelectOld, item.IDKhachHang);
        this.setState({ refreshing: false, hocSinhData: item, dateShowSelect: this.state.dateShowSelectOld, dateSelect: this.state.dateSelectOld });
    }
    next = async () => {
        let dateSelect = this.state.dateSelect;
        let dateNew = new Date(dateSelect.getFullYear(), dateSelect.getMonth(), dateSelect.getDate() + 1)
        let dataSearch = (dateNew.getDate() < 10 ? '0' + dateNew.getDate() : dateNew.getDate()) + '/' + ((dateNew.getMonth() + 1) < 10 ? ('0' + (dateNew.getMonth() + 1)) : (dateNew.getMonth() + 1)) + '/' + dateNew.getFullYear()
        this.setState({ dateSelect: dateNew, dateShowSelect: dataSearch });
        this._loadData(dataSearch, this.state.hocSinhData.IDKhachHang)
    }
    renderItemDate = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: 20 }}>
                <View style={[nstyles.nrow, { justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'white' }]}>
                    <View>
                        <Text style={{ fontSize: sizes.reSize(16), paddingBottom: 5, fontWeight: 'bold' }}>{item.TenMonHoc}</Text>
                        <Text style={{ fontSize: sizes.reSize(10), paddingBottom: 5, fontWeight: '500' }}>Giáo viên: {item.TenGiaoVien}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 1 }}>
                        <Text style={{ fontSize: sizes.reSize(14), paddingBottom: 5, textAlign: 'right', fontWeight: 'bold', color: item.DiemDanh == 0 ? colors.redStar : item.DiemDanh == 2 ? colors.colorBlue : item.DiemDanh == 3 ? colors.orange : colors.colorGreen }}>
                            {item.DiemDanh == 0 ? 'Vắng không phép' : item.DiemDanh == 2 ? 'Vắng có phép' : item.DiemDanh == 3 ? 'Tham gia hoạt động của trường' : 'Có mặt'}
                        </Text>
                        <Text style={{ fontSize: sizes.reSize(14), paddingBottom: 5, fontWeight: '600' }}>
                            {item.GioVao} - {item.GioRa}
                        </Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#b3b3b3', height: 1 }} />
            </View>

        )
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]} >
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Điểm danh"}
                />
                {this.props.listchild.length > 0 ?
                    <View style={nstyles.nbody}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#31cde5', marginHorizontal: 21, marginTop: 20, marginBottom: 10, borderRadius: 4 }}>
                            <View
                                style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}
                                onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, _renderdata: this._renderdata })}>
                                <View>
                                    <Text style={{
                                        fontSize: 16, fontWeight: "800", paddingVertical: 10, color: "white"
                                    }} >
                                        {this.state.hocSinhData.TenKhachHang}
                                    </Text>
                                    <Text style={{
                                        fontSize: sizes.reSize(16), paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: 'white'
                                    }}>
                                        {this.state.hocSinhData.LopHoc}
                                    </Text>
                                </View>
                                {/* <Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nIcon20, { tintColor: colors.whitegay, marginLeft: 15, top: -10 }]} /> */}
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 20, marginHorizontal: 21, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.back()} style={{ justifyContent: 'center' }}>
                                    <Image resizeMode="contain" source={Images.icNext}
                                        style={[nstyles.nIcon20, { marginLeft: 5, transform: [{ rotate: '180deg' }], tintColor: '#29a9e0' }]} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: '#29a9e0' }}>
                                        Điểm danh ngày {this.state.dateShowSelect}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.next()} style={{ justifyContent: 'center' }}>
                                    <Image resizeMode="contain" source={Images.icNext} style={[nstyles.nIcon20, { marginRight: 5, tintColor: '#29a9e0' }]} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.allData.length == 0 ? <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có dữ liệu điểm danh để hiển thị</Text> :
                            <FlatList
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._loadData(this.state.dateShowSelect, this.state.hocSinhData.IDKhachHang)}
                                data={this.state.allData}
                                renderItem={this.renderItemDate}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state.allData}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                    </View>
                    :
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Tài khoản chưa liên kết với học sinh</Text>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(Diemdanh, mapStateToProps, false)