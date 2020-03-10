import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, FlatList, Image
    , TextInput, StyleSheet
} from 'react-native';

import { sizes, colors, nstyles } from '../../styles';
import { Images } from '../../images';
import { RootLang } from '../../app/data/locales';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { styles } from '../hotels/styles';
import ButtonCom from '../../components/Button/ButtonCom';
import Utils from '../../app/Utils';
import { nGlobalKeys } from '../../app/keys/globalKey';
import apis from '../../apis';
export default class Upload extends Component {
    constructor(props) {
        super(props);
        this._callbackUpload = Utils.ngetParam(this, '_callbackUpload');
        this.imagesUpload = Utils.ngetParam(this, 'imagesUpload');
        const listImages = this.imagesUpload.filter((item, index) => item.height != undefined && index == Utils.ngetParam(this, 'type'));
        this.state = {
            listImages
        };
    }

    _goBack = () => {
        Utils.goback(this)
    }

    _goMediapicker = (optionsCus) => {
        if (optionsCus == undefined || optionsCus == null)
            optionsCus = {};
        response = (res) => {
            Utils.nlog('images', res)
            if (res.iscancel) {
            }
            else if (res.error) {
                //--lỗi khi chon media
            }
            else {
                const listImages = this.state.listImages.concat(res)
                this.setState({ listImages })

            }
        };
        let options = {
            assetType: 'Photos', //All,Videos,Photos - default
            multi: false,// chọn 1 or nhiều item
            response: response, // callback giá trị trả về khi có chọn item
            limitCheck: -1, //gioi han sl media chon: -1 la khong co gioi han, >-1 la gioi han sl =  limitCheck
            ...optionsCus
        };
        Utils.goscreen(this, 'sc_MediaPicker', options);
        //--End dialog media
    }

    _deleteImages = (id) => () => {
        const listImages = this.state.listImages.filter((item, index) => index != id);
        this.setState({ listImages });
    }

    _renderImages = ({ item, index }) => {
        const { nrow, nmiddle } = nstyles.nstyles;
        const { listImages } = this.state;
        // if (index == 0) {
        //     return <TouchableOpacity
        //         onPress={this._goMediapicker}
        //         activeOpacity={0.9}
        //         style={[nmiddle, {
        //             backgroundColor: colors.black_60,
        //             width: (nstyles.nwidth - 70) / 3.5, height: (nstyles.nwidth - 70) / 3.5, marginRight: 5, marginTop: 5,
        //             borderColor: '#E8E8E9', borderWidth: 0.5
        //         }]}>
        //         <Image
        //             style={{
        //                 width: 50, height: 50, tintColor: colors.white
        //             }}
        //             resizeMode='contain'
        //             source={item.icon}
        //         />
        //     </TouchableOpacity>
        return <View activeOpacity={0.9}
            style={[nmiddle, {
                backgroundColor: colors.black_60,
                width: (nstyles.nwidth - 70) / 3.5, height: (nstyles.nwidth - 70) / 3.5, marginRight: 5, marginTop: 5,
                borderColor: '#E8E8E9', borderWidth: 0.5
            }]}>
            <Image
                style={{
                    width: (nstyles.nwidth - 70) / 3.5, height: (nstyles.nwidth - 70) / 3.5
                }}
                resizeMode='cover'
                source={{ uri: item.uri }}
            />
            <TouchableOpacity style={{
                position: 'absolute', top: -5, right: -5,
                elevation: 2, shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black', shadowOpacity: 0.6, backgroundColor: 'red',
                borderRadius: 10
            }} activeOpacity={0.9}
                onPress={this._deleteImages(index)}>
                <Image
                    style={{ width: 20, height: 20, borderRadius: 10, tintColor: colors.white }}
                    resizeMode='cover'
                    source={Images.icCloseBlack}
                />
            </TouchableOpacity>
        </View>
    }

    _upload = () => {
        const item = this.state.listImages[0];
        this._callbackUpload(item, Utils.ngetParam(this, 'type'));
        Utils.goback(this);
    }

    render() {
        const { listImages } = this.state;
        return (
            <View style={[{ flex: 1, backgroundColor: 'rgba(255,255,255,0.65)', paddingHorizontal: 15, justifyContent: 'center' }]}>
                <View style={[nstyles.nstyles.shadow, { backgroundColor: colors.white, borderRadius: 6 }]}>
                    <View style={{ paddingHorizontal: 16, alignItems: 'center' }}>
                        <Image source={Images.icupload} style={{ width: sizes.reSize(54), height: sizes.reSize(40), marginTop: 5 }} resizeMode='contain' />
                        <Text style={[styles.text14, { marginVertical: 17, fontWeight: '500', width: '100%' }]}>{RootLang.lang.pleaseuploadaphotoofyourselfstraightlookingwithoutglasses}</Text>
                        <TouchableOpacity
                            disabled={this.state.listImages.length > 0}
                            onPress={this._goMediapicker}
                            style={{ borderColor: colors.softBlue, borderRadius: 6, borderWidth: 1, paddingVertical: 10, paddingHorizontal: this.state.listImages.length > 0 ? 10 : 25, width: '100%' }}>

                            {
                                this.state.listImages.length > 0 ?
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        data={listImages}
                                        renderItem={this._renderImages}
                                    />
                                    :
                                    <Text style={styles.text12}>+ {RootLang.lang.uploadyourdocuments}...</Text>
                            }

                        </TouchableOpacity>
                        <Text style={[styles.text12, { color: colors.black_16, marginVertical: 10, width: '100%' }]}>{RootLang.lang.weaccepttheformatJPGJPEGPNGPDFmaximumcapacity10MB}</Text>
                        <ButtonCom
                            disabled={this.state.listImages.length > 0 ? false : true}
                            onPress={this._upload}
                            text={RootLang.lang.uploadphoto}
                            style={{ borderRadius: 6, paddingHorizontal: 26, paddingVertical: 7 }}
                            Linear
                        // styleTouchable={{ flex: 1 }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this._goBack}
                        style={{ borderTopWidth: 1, borderTopColor: colors.black_20, marginTop: 17 }}>
                        <Text style={[styles.text14, { paddingVertical: 16, alignSelf: 'center', color: colors.sapphire }]}>{RootLang.lang.closed}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}