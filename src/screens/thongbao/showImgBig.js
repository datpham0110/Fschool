import React, { Component } from "react";
import { colors, sizes } from "../../styles";
import { Text, View, Dimensions, FlatList, ListEmpty, Image, TouchableOpacity, Modal, StyleSheet } from "react-native";
import ButtonCom from "../../components/Button/ButtonCom";
import Utils from "../../app/Utils";
const { width, height } = Dimensions.get("window");
import { appConfig } from "../../app/Config"
import ImageViewer from 'react-native-image-zoom-viewer';
import App from '../../../App';

export default class ShowImgBig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listImg: Utils.ngetParam(this, "data"),
    };
  }

  onCancel = () => {
    Utils.goback(this, null);
  };

  render() {
    const images = [{ url: appConfig.domainImg + this.state.listImg },];
    Utils.nlog('imtttt', images)
    return (
      <View style={{ backgroundColor: colors.black_16, flex: 1, alignItems: "center", justifyContent: "center" }} >
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black'
          }} >
          <View style={{
            width: width,
            alignSelf: 'center',
            alignContent: 'center',
            height: height * 0.9
          }}>
            <ImageViewer imageUrls={images} />
          </View>
          <ButtonCom
            onPress={() => this.onCancel()}
            style={{ backgroundColor: colors.colorPink, marginBottom: 80, marginHorizontal: 20 }}
            text={"ĐÓNG"}
          />
        </View>
      </View >
    );
  }
}
