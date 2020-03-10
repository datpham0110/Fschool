import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from "react-native";
import HeaderCom from "../../components/HeaderCom";
import { colors } from "../../styles/color";
import Utils from "../../app/Utils";
import { nkey } from "../../app/keys/keyStore";
import { listchild } from "../../apis/child";
import { nGlobalKeys } from "../../app/keys/globalKey";
import { sizes } from "../../styles/size";
import { nstyles } from "../../styles/styles";

class PichChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  _logout = () => {
    Utils.nsetStore(nkey.nameuser, "");
    Utils.nsetStore(nkey.password, "");
    Utils.goscreen(this, "authLogin");
  };
  _loadListChild = async () => {
    let rowId = Utils.getGlobal(nGlobalKeys.rowId, {});
    let res = await listchild(rowId);
    if (res.success == true && res.data.length > 0) {
      // Utils.nlog('body FlightAvail', res.data);
      this.setState({ data: res.data });
    }
  };
  _ClickMenu = (IDLopHoc, IDKhachHang, IDChiNhanh, TenKH, GioiTinh) => () => {
    Utils.setGlobal(nGlobalKeys.IDLopHoc, IDLopHoc);
    Utils.setGlobal(nGlobalKeys.IDKhachHang, IDKhachHang);
    Utils.setGlobal(nGlobalKeys.IDChiNhanh, IDChiNhanh);
    Utils.setGlobal(nGlobalKeys.TenKH, TenKH);
    Utils.setGlobal(nGlobalKeys.GioiTinh, GioiTinh);

    Utils.goscreen(this, "sc_Welcome");
  };
  _renderItemMenu = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={this._ClickMenu(
          item.IDLopHoc,
          item.IDKhachHang,
          item.IDChiNhanh,
          item.TenKhachHang,
          item.GioiTinh
        )}
        style={{
          width: "100%",
          marginBottom: 15,
          borderColor: colors.black,
          borderWidth: 1
        }}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{ height: sizes.nImgSize42, width: sizes.nImgSize42 }}
          resizeMode="contain"
        />
        <Text style={[styles.text12, { marginTop: 8 }]}>
          {item.TenKhachHang}
        </Text>
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this._loadListChild();
  }
  render() {
    return (
      <View style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
        <HeaderCom nthis={this} iconLeft={null} titleText={"Chọn trẻ"} />
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: 20,
              backgroundColor: colors.white
            }}
            renderItem={this._renderItemMenu}
            data={this.state.data}
            keyExtractor={item => `${item.MaKhachHang}`}
            numColumns={1}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text12: {
    fontSize: sizes.sText12
  }
});

const mapStateToProps = state => ({
  language: state.language
});
export default Utils.connectRedux(PichChild, mapStateToProps);
