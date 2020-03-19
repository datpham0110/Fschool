import React, { Component } from "react"
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    ListEmpty
} from "react-native"
import { nstyles } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import Utils from '../../app/Utils';
const { width, height } = Dimensions.get("window");
import { colors, sizes } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";

class ListChildThongBaoAll extends Component {
    constructor(props) {
        super(props);
    }
    _renderItemChild = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => Utils.goscreen(this, 'sc_ThongBaoAll', { IDHocSinh: item.IDKhachHang, flagNotifiy: false, IDChiNhanh: item.IDChiNhanh })}
                style={{
                    flexDirection: "row",
                    paddingVertical: 8,
                    backgroundColor: item.GioiTinh == "Nữ" ? colors.colorGreenThere1 : colors.colorGreenTwo1, alignItems: 'center',
                    marginHorizontal: 20,
                    marginVertical: 5,
                    borderRadius: 10
                }} >
                {item.GioiTinh == "Nữ" ?
                    (<Image resizeMode="contain" source={Images.icBe1} style={{ width: width * 0.15, height: width * 0.15, marginLeft: 20 }} />) :
                    (<Image resizeMode="contain" source={Images.icBe2} style={{ width: width * 0.15, height: width * 0.15, marginLeft: 20 }} />)}
                <View style={{ flexDirection: "column", marginLeft: 10, justifyContent: "center", flex: 1 }}>
                    <Text style={{ color: "white", fontSize: sizes.sizes.nImgSize18, fontWeight: '700' }}> {item.TenKhachHang}</Text>
                    <Text style={{ color: "white", fontSize: sizes.sizes.nImgSize16, fontWeight: '600', marginTop: 5 }}>{item.LopHoc}</Text>
                </View>
                {item.Soluong > 0 ?
                    <View style={styles.vIconNotifyBig}>
                        <Text style={{ color: 'white', fontWeight: '800', fontSize: sizes.sText18 }}>{item.Soluong}</Text>
                    </View> : null}

            </TouchableOpacity>
        );
    };

    render() {
        Utils.nlog('listChildBaoBai', this.props.listChildThongBaoAll)
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Danh sách học sinh'}
                />
                <ScrollView>
                    {this.props.listChildThongBaoAll.length == 0 ? <Text style={styles.styTitle}>Tài khoản chưa liên kết với học sinh </Text> : null}
                    <FlatList
                        renderItem={this._renderItemChild}
                        data={this.props.listChildThongBaoAll}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false} />
                </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    vIconNotifyBig: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.1,
        backgroundColor: '#f27972',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    styTitle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: sizes.fs(18),
        fontWeight: '800', 
        color: colors.colorVeryLightPinkTwo
    },
})
const mapStateToProps = state => ({
    listChildThongBaoAll: state.listChildThongBaoAll
});

export default Utils.connectRedux(ListChildThongBaoAll, mapStateToProps, true);