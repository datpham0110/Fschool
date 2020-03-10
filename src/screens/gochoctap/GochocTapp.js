import React, { Component } from "react"
import { View, Dimensions, TouchableOpacity, Text, Image, FlatList } from "react-native"
import Utils from "../../app/Utils"
import { nstyles } from "../../styles/styles"
import { colors } from "../../styles/color"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images/index"
import ButtonCom from "../../components/Button/ButtonCom"
import { sizes } from "../../styles"
import DatePick from "../../components/DatePick"
import { GocHocTap_List } from '../../apis/gochoctap';
import Moment from "moment"
import { nGlobalKeys } from '../../app/keys/globalKey';
import ListEmpty from "../../components/ListEmpty"
const { width, height } = Dimensions.get("window")

class GochocTapp extends Component {
    constructor(props) {
        super(props)
        nthisApp = this;
        this.state = {
            date: "",
            tabNP: 0,
            hocSinhData: '',
            newDate: new Date,
            dataList: [],
            refreshing: true,
        }
        this.flagNoyify = Utils.ngetParam(this, 'flagNoyify', false);
        this.data = Utils.ngetParam(this, 'data')
    }

    componentDidMount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'gochoctap')
        if (this.flagNoyify == true) {
            if (this.props.listchild.length > 0) {
                for (let i = 0; i < this.props.listchild.length; i++) {
                    if (this.props.listchild[i].IDKhachHang == this.data.IDHocSinh) {
                        this.setState({ hocSinhData: this.props.listchild[i] }, this._loadListGocHocTap)
                        Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
                        break;
                    }
                }
            }
            else {
                Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
            }
        }
        else {
            if (this.props.listchild.length > 0) {
                this.setState({ hocSinhData: this.props.listchild[0] }, this._loadListGocHocTap)
                Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[0]);
            } else {
                Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
            }
        }
    }
    componentWillUnmount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')

    }
    _onRefresh = () => {
        this.setState({ refreshing: true }, () => this._loadListGocHocTap());
    }
    _loadListGocHocTap = async () => {
        let hours = Moment(this.state.newDate, 'MM/DD/YYYY h:m:s A').format("DD/MM/YYYY");
        let IDHocSinh = this.state.hocSinhData.IDKhachHang
        let IDLopHoc = this.state.hocSinhData.IDLopHoc
        let res = await GocHocTap_List(IDHocSinh, IDLopHoc, hours);
        if (res.success == 1) {
            dataList = res.data.reverse()
        } else {
            dataList = []
        }
        this.setState({ dataList, refreshing: false, })
    }
    _renderdata = async (item) => {
        this.setState({ hocSinhData: item });
        let hours = Moment(this.state.newDate, 'MM/DD/YYYY h:m:s A').format("DD/MM/YYYY");
        let IDHocSinh = item.IDKhachHang
        let IDLopHoc = item.IDLopHoc
        let res = await GocHocTap_List(IDHocSinh, IDLopHoc, hours);
        if (res.success == 1) {
            dataList = res.data.reverse()
        } else {
            dataList = []
        }
        this.setState({ dataList, refreshing: false, })
    }
    renderItem = ({ item, index }) => {
        var XepLoai = item.XepLoai
        switch (XepLoai) {
            case 1:
                XepLoai = 'Đồng',
                    color = '#9c876a'
                break;
            case 2:
                XepLoai = 'Bạc'
                color = '#aba7a2'
                break;
            case 3:
                XepLoai = 'Vàng'
                color = null
                break;
            case 0:
                XepLoai = 'Không có đánh giá'
                color = null
                break;
            default:
                break;
        }
        return (
            <View style={[nstyles.nrow, { marginHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#c9c7c7' }]}>
                <Text style={{ flex: 1, fontSize: sizes.reSize(14), fontWeight: 'bold' }}>
                    {item.TenMonHoc}
                </Text>
                <View style={[nstyles.nrow, { flex: 1, alignItems: 'center', justifyContent: 'flex-start' }]}>
                    {
                        XepLoai == 'Không có đánh giá' ? null : <Image source={Images.icStarYellow} style={[nstyles.nIcon15, { tintColor: color }]} />
                    }
                    <Text style={{ fontSize: sizes.reSize(12), marginLeft: 5 }}>{XepLoai == 'Không có đánh giá' ? 'Ghi chú trong học tập' : XepLoai}</Text>
                </View>
                <TouchableOpacity onPress={() => Utils.goscreen(this, 'Modal_ModalChiTietGHT', { dataChiTiet: item })} style={{ backgroundColor: '#29aae1', borderRadius: 4, alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
                        Chi tiết
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX,]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Góc học tập"} />
                <View style={[nstyles.nbody, { backgroundColor: colors.whitegay, marginHorizontal: 15 }]}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TouchableOpacity
                            style={[nstyles.nrow, {
                                backgroundColor: 'white', justifyContent: 'center', flex: 1,
                                alignItems: "center", paddingVertical: 10, borderRadius: 4
                            }]}
                            onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.hocSinhData, _renderdata: this._renderdata })}>
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
                    <View style={{ backgroundColor: 'white', paddingVertical: 5, borderRadius: 3 }}>
                        <View style={{ backgroundColor: colors.whitegay, flexDirection: 'row', justifyContent: 'space-between', margin: 5, paddingVertical: 8, paddingHorizontal: 25, borderRadius: 5 }}>
                            <View style={{ flex: 1 }}>
                                <DatePick
                                    value={this.state.newDate}
                                    style={{ fontWeight: 'bold', fontSize: sizes.reText(16), alignItems: 'center' }}
                                    format='DD/MM/YYYY'
                                    onValueChange={(val) => this.setState({ newDate: val }, this._loadListGocHocTap)}
                                />
                            </View>
                            <Image source={Images.calendarDate2} style={{ tintColor: '#b8b8b8' }} />
                        </View>
                    </View>

                    <FlatList
                        ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: 'white', marginVertical: 10, paddingBottom: 20 }}
                        data={this.state.dataList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            </View >
        )
    }
}
const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(GochocTapp, mapStateToProps, false)