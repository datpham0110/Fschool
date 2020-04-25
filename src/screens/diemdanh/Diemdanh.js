
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

var data = [
    {
        DiemDanh: 1,
        Mon: 'Toán',
        GioVao: '08:00',
        GioRa: '17:00'
    }
]
class Diemdanh extends Component {
    constructor(props) {
        super(props)
        nthisApp = this;
        let tempDate = new Date();
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
        this.state = {
            allData: [],
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
        this.data = Utils.ngetParam(this, 'data')
    }

    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]} >
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Điểm danh"}
                />
                <View style={nstyles.nbody}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#31cde5', marginHorizontal: 21, marginTop: 20, marginBottom: 10, borderRadius: 4 }}>
                        <View
                            style={[nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}
                            onPress={() => Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, _renderdata: this._renderdata })}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16, fontWeight: "800", paddingVertical: 10, color: "white"
                                }} >
                                    {this.data.TenHocSinh}
                                </Text>
                                <Text style={{
                                    fontSize: 14, fontWeight: "500", paddingBottom: 5, color: "white",
                                }} >
                                    {this.data.LopHoc}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', padding: 20, marginHorizontal: 21, marginBottom: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: '#29a9e0' }}>
                                Điểm danh ngày {this.data.NgayDiemDanh}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={[nstyles.nrow, { justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'white' }]}>
                            <View>
                                <Text style={{ fontSize: sizes.reSize(16), paddingBottom: 5, fontWeight: 'bold' }}>{this.data.MonHoc}</Text>
                                <Text style={{ fontSize: sizes.reSize(14), paddingBottom: 5, fontWeight: '500' }}>Giáo viên: {'Kiệt'}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                                <Text style={{ fontSize: sizes.reSize(14), paddingBottom: 5, textAlign: 'right', fontWeight: 'bold', color: this.data.isDiemDanh == 0 ? colors.redStar : this.data.isDiemDanh == 2 ? colors.colorBlue : this.data.isDiemDanh == 3 ? colors.orange : colors.colorGreen }}>
                                    {this.data.isDiemDanh == 2 ? 'Vắng có phép' : 'Có mặt'}
                                </Text>
                                <Text style={{ fontSize: sizes.reSize(14), paddingBottom: 5, fontWeight: '600' }}>
                                    {this.data.GioVao} - {this.data.GioRa}
                                </Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#b3b3b3', height: 1 }} />
                    </View>
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(Diemdanh, mapStateToProps, false)