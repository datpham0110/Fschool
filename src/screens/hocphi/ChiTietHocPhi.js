import React, { Component } from "react";
import { colors, sizes } from "../../styles";
import { Text, View, Dimensions, FlatList } from "react-native";
import Input from "../../components/componentsYSchool/Input";
import { Images } from "../../images";
import ButtonCom from "../../components/Button/ButtonCom";
import { styles } from "./styles";
import Utils from "../../app/Utils";
import { chiTietHocPhi } from "../../apis/notifycation";
import { nheight } from "../../styles/styles";

const { width, height } = Dimensions.get("window");
export default class ChiTietHocPhi extends Component {
  constructor(props) {
    super(props);
    this.MsHocSinh = Utils.ngetParam(this, "ID");
    this.state = {
      data: "",
      ChiTietHocPhi: Utils.ngetParam(this, "data")
    };
  }

  onCancel = () => {
    Utils.goback(this);
  };
  componentDidMount() {
    this._getData();
  }
  _getData = async () => {
    let data = await chiTietHocPhi(this.state.ChiTietHocPhi, this.MsHocSinh);
    this.setState({ data: data.data.Bills });
  };
  _renderItemChild = ({ item, index }) => {
    return (
      <Text>
        {index + 1} {item.Note}
      </Text>
    );
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.black_16,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: width * 0.9,
            padding: width * 0.1,
            borderRadius: 10,
            height: height * 0.7
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              textAlign: "center",
              marginBottom: 20,
              fontSize: sizes.sizes.sText18
            }}
          >
            Tháng {this.state.ChiTietHocPhi}
          </Text>
          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItemChild}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
          />
          <ButtonCom
            onPress={this.onCancel}
            style={{ marginTop: 10, backgroundColor: colors.colorGrayText }}
            text={"Đóng"}
          />
        </View>
      </View>
    );
  }
}
