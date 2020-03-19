import React, { Component } from "react"
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native"
import { nstyles } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import Utils from '../../app/Utils';
const { width, height } = Dimensions.get("window");
import { colors, sizes } from "../../styles";
import { DanhSachHocSinh } from '../../apis/chat';
import { nGlobalKeys } from "../../app/keys/globalKey"

class SelectChildChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = async () => {
        let res = await DanhSachHocSinh();
        if (res.success == true) {
            this.props.setListChildChat(res.data);
        }
        this.setState({ refreshing: false })
    }
    _reloadData = () => {
        this.setState({ refreshing: true }, () => this.loadData())
    }
    _touchItem = (item) => {
        for (let i = 0; i < this.props.listchild.length; i++) {
            if (this.props.listchild[i].IDKhachHang == item.IDHocSinh) {
                Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i])
            }
        }
        Utils.goscreen(this, 'sc_listteacher', { itemChill: item, reloadData: this._reloadData })
    }
    _renderItemChild = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this._touchItem(item)}
                style={{
                    flexDirection: "row",
                    paddingVertical: 8,
                    backgroundColor: index % 2 == 0 ? colors.colorGreenThere1 : colors.colorGreenTwo1, alignItems: 'center',
                    marginHorizontal: 20,
                    marginVertical: 5,
                    borderRadius: 10
                }} >
                <View style={{ flexDirection: "column", marginLeft: 10, justifyContent: "center", flex: 1 }}>
                    <Text style={{ color: "white", fontSize: sizes.sizes.nImgSize18, fontWeight: '700' }}> {item.TenHocSinh}</Text>
                    <Text style={{ color: "white", fontSize: sizes.sizes.nImgSize16, fontWeight: '600', marginTop: 5 }}>{item.TenLop}</Text>
                </View>
                {item.IsRead > 0 ?
                    <View style={styles.vIconNotifyBig}>
                        <Text style={{ color: 'white', fontWeight: '800', fontSize: sizes.sText18 }}>{item.IsRead}</Text>
                    </View> : null}

            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    _onPressLeftDefault={() => Utils.gobackTop(this)}
                    titleText={'Danh sách học sinh'}
                />
                <View style={nstyles.nbody}>
                    {this.props.listChildChat.length == 0 ? 
                    <Text style={styles.styTitle}>Tài khoản chưa liên kết với học sinh </Text> : 
                    null
                    }
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={this._reloadData}
                        renderItem={this._renderItemChild}
                        data={this.props.listChildChat}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
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
    listChildChat: state.listChildChat,
    listchild: state.listchild
});

export default Utils.connectRedux(SelectChildChat, mapStateToProps, true);