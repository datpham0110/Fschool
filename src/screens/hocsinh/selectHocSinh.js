import React, { Component } from "react"
import { sizes } from "../../styles"
import { Text, View, Dimensions, TouchableOpacity, FlatList, Image } from "react-native"
import Input from "../../components/componentsYSchool/Input"
import { Images } from "../../images"
import { colors } from "../../styles/color"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { updateCN } from '../../apis/apiLogin';

import Utils from "../../app/Utils"
const { width, height } = Dimensions.get("window")

class SelectHocSinh extends Component {
    constructor(props) {
        super(props)
        this._renderdata = Utils.ngetParam(this, "_renderdata", undefined);
        this.callback = Utils.ngetParam(this, 'callback'); // dùng cho THời khoá biểu
        this.state = {
            listChild: props.listchild,
            selectChild: '',
            childSelected: this._renderdata ? Utils.getGlobal(nGlobalKeys.childSelected) : Utils.ngetParam(this, 'childSelected')
        };
    };

    _goBack = () => {
        Utils.goback(this)
    };

    _touchItem = item => () => {
        // this.updateCN(item.MaKhachHang)
        if (this._renderdata) {
            Utils.setGlobal(nGlobalKeys.childSelected, item);
            this._renderdata(item);
        } else {
            this.callback(item);
        };
        Utils.goback(this);
    }

    updateCN = async (codeStuden) => {
        let res = await updateCN(codeStuden);
    }
    _renderItemChild = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={this._touchItem(item)}
                style={{ fontSize: sizes.sizes.sText18, borderWidth: 1, marginVertical: 5, marginHorizontal: 5, borderRadius: 5, backgroundColor: this.state.childSelected.MaKhachHang == item.MaKhachHang ? colors.colorGreenTwo1 : colors.white, borderColor: colors.veryLightPinkThree }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                    <Image resizeMode="contain" source={Images.icBe1} style={{ width: width * 0.15, height: width * 0.15, marginLeft: 20 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ marginVertical: 5, color: this.state.childSelected.MaKhachHang == item.MaKhachHang ? colors.white : colors.black }} >{item.TenKhachHang}</Text>
                        <Text style={{ marginVertical: 5, color: this.state.childSelected.MaKhachHang == item.MaKhachHang ? colors.white : colors.black }} >{item.LopHoc}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{
                justifyContent: 'center', alignItems: 'center', flex: 1,
            }}>
                <View style={{
                    opacity: 0.7, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
                    backgroundColor: 'black'
                }} onTouchEnd={this._goBack} />
                <View style={{ backgroundColor: colors.white, width: width * 0.8, borderRadius: 3, height: height * 0.5 }} >
                    <Text style={{ textAlign: "center", marginBottom: 10, marginTop: 15, fontSize: sizes.sizes.sText15 }}>Danh sách học sinh</Text>
                    <View style={{ marginHorizontal: 5, marginBottom: 5, flex: 1 }} >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            renderItem={this._renderItemChild} data={this.state.listChild}
                            extraData={this.state.childSelected}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(SelectHocSinh, mapStateToProps, true)
