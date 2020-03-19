import React, { Component } from 'react';
import { nstyles, paddingTopMul } from '../styles/styles'

import {
  Text, StyleSheet, View, StatusBar, CameraRoll, Keyboard,
  TouchableOpacity, Image, Platform, PermissionsAndroid, ImageBackground
} from 'react-native';

import { Images } from '../images';
import Utils from '../app/Utils';
import { RNCamera } from 'react-native-camera';
import { colors } from '../styles/color';

//styles màn hình popupMore
const stTakeCamera = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  imgPreview: {
    borderColor: colors.white,
    borderWidth: 1.5
  }
});

var check = 1;
export default class TakeCamera extends Component {
  constructor(props) {
    super(props);
    this.takePictureData = null;
    this.state = {
      type: 'back',
      defaultPhoto: undefined,
      missingPermission: false,
      cancel: 1,   // 1: take picture, 2: preview picture
    };
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS == 'ios')
      this.loadMedia();
    else
      this.androidRequestPermissionAndLoadMedia();
    StatusBar.setHidden(true);
    Keyboard.dismiss();

  }

  UNSAFE_componentWillMount() {
    StatusBar.setHidden(false);
    Keyboard.dismiss();
  }

  loadMedia = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos'
    })
      .then(r => {
        let Temp = r.edges[0].node.image.uri;
        this.setState({ defaultPhoto: Temp });
      },
        (reason) => {
          if (reason.toString().includes('User denied access') && Platform.OS == 'ios')
            this.setState({ permissionIOS: false });
        })
      .catch((err) => {
        // console.log('no ok');
        //Error Loading Images
      });
  }

  androidRequestReadStoragePermission() {
    return new Promise((resolve, reject) => {
      if (
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        return resolve();
      }

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        .then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(err => {
          reject();
          alert(err);
        });
    });
  }

  androidRequestPermissionAndLoadMedia = () =>
    this.androidRequestReadStoragePermission()
      .then(() => {
        this.setState({ missingPermission: false });
        this.loadMedia();
      })
      .catch(() => this.setState({ missingPermission: true }));

  postFeeds = (optionsCus) => {
    Keyboard.dismiss();
    if (optionsCus == undefined || optionsCus == null)
      optionsCus = {};
    //--Open dialog choose media - ncustom
    Utils.nlog('res', res)
    response = (res) => {
      if (res.iscancel) {
        //--ko chon item or back
        this.setState({ opacityMain: 1 });
      } else if (res.error) {
        //--lỗi khi chon media
      } else {
        //--dữ liệu media trả về là 1 item or 1 mảng item
        //--Xử lý dữ liệu trong đây-----
        Utils.nlog('img', res);
        this.setState({ dataMedia: res });
        //-----
      };
    };
    options = {
      type: 'Photos', //All,Videos,Photos - default
      multi: false,// chọn 1 or nhiều item
      response, // callback giá trị trả về khi có chọn item
      ...optionsCus
    };
    nthisMediaPicker.setState({ opacityMain: 1 });
    Utils.goscreen(this, 'sc_MediaPicker', options);
    //--End dialog media
  }

  checkCancel = () => {
    if (this.state.cancel == 1) {
      nthisMediaPicker.setState({ opacityMain: 1 });
      Utils.goback(this);
    } else {
      this.setState({ cancel: 1 });
    };
  }

  changeType = () => {
    type = this.state.type;
    if (type == "back") {
      this.setState({ type: 'front' })
    } else {
      this.setState({ type: 'back' })
    };
  }

  _submitSend = () => {
    const options = Utils.ngetParam(this, 'options');
    options.response([this.takePictureData]);
    Utils.goback(this);
    Utils.goback(nthisMediaPicker);
  }

  render() {
    return (
      <View style={stTakeCamera.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam
          }}
          style={stTakeCamera.preview}
          type={this.state.type}
          captureAudio={false}
          autoFocus='on'
        >
          {/* Custom component in Camera View */}
          <View style={[nstyles.nrow, {
            justifyContent: 'space-around', width: '100%',
            alignItems: 'flex-end', marginBottom: 30
          }]}>
            <TouchableOpacity onPress={this.postFeeds}>
              <Image style={[nstyles.nAva50, stTakeCamera.imgPreview]} source={{ uri: this.state.defaultPhoto }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePicture}>
              <Image style={nstyles.nAva80} source={Images.icCaptureImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeType()}>
              <Image style={nstyles.nIcon40} source={Images.icCameraSwitchWhite} />
            </TouchableOpacity>
          </View>
        </RNCamera>
        {
          this.state.cancel == 2 ?
            <ImageBackground resizeMode="contain" style={{
              position: 'absolute', top: 0, left: 0,
              right: 0, bottom: 0, backgroundColor: 'black'
            }} source={{ uri: this.state.defaultPhoto }}>
              <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 20 }}
                onPress={this._submitSend}>
                <Image source={Images.icSendMsg} resizeMode='contain' style={nstyles.nAva70} />
              </TouchableOpacity>
            </ImageBackground>
            : null
        }
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20, right: 0, bottom: 0, width: 30, height: 30, marginTop: paddingTopMul }}
          onPress={this.checkCancel}>
          <Image source={Images.icCloseWhite} style={nstyles.nIcon28} />
        </TouchableOpacity>
        {
          false ?
            <View style={{ position: 'absolute', top: '30%', left: 0, right: 0 }}>
              <TouchableOpacity style={[nstyles.nbtn_Bgr, {
                borderRadius: 5, paddingHorizontal: 18,
                alignSelf: 'center', paddingVertical: 5, backgroundColor: colors.colorBlue, marginTop: 20
              }]}
                onPress={() => {
                  Linking.openURL('app-settings:').catch((err) => {
                    // console.log(err);
                  });
                }}>
                <Text style={[nstyles.ntextbtn_Bgr, { fontSize: sText14 }]}>Go to Settings</Text>
                <Text style={[nstyles.ntextbtn_Bgr, { fontSize: sText14 }]}>(Allow access Camera)</Text>
              </TouchableOpacity>
            </View> : null
        }
      </View>
    );
  }

  saveImage = async (data) => {
    CameraRoll.saveToCameraRoll(data, 'photo');
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        const options = { quality: 0.5, forceUpOrientation: true, fixOrientation: true };
        const data = await this.camera.takePictureAsync(options);
        this.takePictureData = data;
        this.setState({ defaultPhoto: data.uri, cancel: 2 });
        this.saveImage(data.uri);
        // console.log(data);
      } catch (error) {
        // console.log('error takePicture', error)
      };
    };
  }

}

