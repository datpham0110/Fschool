import React, { Component } from "react"
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { nstyles } from '../../styles/styles';
import { fs } from "../../styles/size";
import { colors, sizes } from "../../styles";
import { Images } from '../../images';
import HeaderCom from '../../components/HeaderCom';
import Utils from '../../app/Utils';
const { width } = Dimensions.get("window");
export const db1 = db.database();
import { db } from '../../app/Config';
class ListStudentAttendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listHocSinh: [],
        }
    }
    componentDidMount() {
        this.dsHocSinh()
    }
    dsHocSinh = async () => {
        //   //Lấy list
        db1.ref('/Tbl_DiemDanh').on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            Utils.nlog('dsHocSinh------------', items)
            this.setState({ listHocSinh: items })
        });
    }
    _renderItemChild = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => Utils.goscreen(this, 'sc_Diemdanh', { data: item })}
                style={[styles.styTouchChild, { backgroundColor: item.GioiTinh == "Nữ" ? colors.colorGreenThere1 : colors.colorGreenTwo1 }]}>
                {item.GioiTinh == "Nữ" ?
                    (<Image resizeMode="contain" source={Images.icBe1} style={[styles.imgAvatarStudent]} />) :
                    (<Image resizeMode="contain" source={Images.icBe2} style={[styles.imgAvatarStudent]} />)
                }
                <View style={styles.styViwTitName}>
                    <Text style={styles.styViwTit2}> {item.TenHocSinh}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Danh sách học sinh'}
                />
                <ScrollView showsVerticalScrollIndicator={false}>

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
    imgAvatarStudent: {
        width: width * 0.15,
        height: width * 0.15,
        marginLeft: 20
    },
    styTitle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: fs(18),
        fontWeight: '800',
        color: colors.colorVeryLightPinkTwo
    },
    styTouchChild: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10
    },
    styViwTitName: {
        flexDirection: "column",
        marginLeft: 10,
        justifyContent: "center",
        flex: 1
    },
    styViwTit2: {
        color: "white",
        fontSize: sizes.sizes.nImgSize18,
        fontWeight: '700',
        fontSize: fs(20),
    },
    styCountNotify: {
        color: 'white',
        fontWeight: '800',
        fontSize: fs(18)
    }
})
const mapStateToProps = state => ({
    listchild: state.listchild
});

export default Utils.connectRedux(ListStudentAttendance, mapStateToProps, true);