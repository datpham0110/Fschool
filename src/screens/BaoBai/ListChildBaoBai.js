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
export const db1 = db.database();
import { db } from '../../app/Config';
class ListChildBaoBai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHocSinh: [],
        }
    }
    _renderItemChild = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => Utils.goscreen(this, 'sc_ListBaoBai', { idVideo: item.dataBaoBai[0].linkVideo, dataBaobai: item.dataBaoBai, dbTenHocSinh: item.TenHocSinh, dataBaiTap: item.dataBaoBai[0].BaiKiemTra })}
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
                    <Text style={{ color: "white", fontSize: sizes.sizes.nImgSize18, fontWeight: '700' }}> {item.TenHocSinh}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    componentDidMount() {
        this.dsHocSinh()
    }
    dsHocSinh = async () => {
        //   //Lấy list
        db1.ref('/Tbl_BaoBai').on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            Utils.nlog('dsHocSinh------------', items)
            this.setState({ listHocSinh: items })
        });
    }
    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Danh sách học sinh'}
                />
                <ScrollView>
                    <FlatList
                        renderItem={this._renderItemChild}
                        data={this.state.listHocSinh}
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
    listChildBaoBai: state.listChildBaoBai
});

export default Utils.connectRedux(ListChildBaoBai, mapStateToProps, true);