import React, { Component } from 'react';
import {
    Image, View, StyleSheet, Text, Platform, Alert, TouchableOpacity, ScrollView, TextInput, FlatList,
} from 'react-native';

import Utils from '../../app/Utils';
import { Images } from '../../images/index';
import HeaderCom from '../../components/HeaderCom';

import { colors, sizes, nstyles } from '../../styles';
import styles from './styles';
import { WebView } from 'react-native-webview';

const data = [
    {
        "idFAQ": 10020,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "gg",
        "answer": "ggg",
        "menugroup": 1,
        "prior": 2,
        "updateDate": "2019-06-10T12:13:52.567",
        "cast_UpdateDate": "10/06/2019 12:13",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 30,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "s",
        "answer": "s",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:55:51.1",
        "cast_UpdateDate": "29/05/2019 03:55",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 29,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "s",
        "answer": "s",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:55:41.273",
        "cast_UpdateDate": "29/05/2019 03:55",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 28,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "s",
        "answer": "s",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:55:31.787",
        "cast_UpdateDate": "29/05/2019 03:55",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 27,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "azz",
        "answer": "aa",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:55:20.773",
        "cast_UpdateDate": "29/05/2019 03:55",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 26,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "ss",
        "answer": "cxx",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:55:09.677",
        "cast_UpdateDate": "29/05/2019 03:55",
        "updateBy": 52021,
        "name": "Trị Quản"
    },
    {
        "idFAQ": 25,
        "idCate": 1,
        "cateName": "Flight",
        "langCode": "en",
        "languageName": "Tiếng Anh (en)",
        "question": "1",
        "answer": "111",
        "menugroup": 1,
        "prior": 1,
        "updateDate": "2019-05-29T15:54:59.913",
        "cast_UpdateDate": "29/05/2019 03:54",
        "updateBy": 52021,
        "name": "Trị Quản"
    }
];
export default class FAQItemDetailQuestion extends Component {
    constructor(props) {
        super(props);
        paddinggeneral = 22;
        this.item = Utils.ngetParam(this, 'item');
        this.state = {
            indexSelect: null
        }
        // let date = new Date();
    }

    _renderItem = (item, index) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => { }}
                    style={[nstyles.nstyles.nrow, { paddingVertical: 12, alignItems: 'center', backgroundColor: 'rgba(79, 128 ,255,0.1)', paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: colors.colorSapphireTwo }]}>
                    <Image source={Images.icShowLessDown} style={[nstyles.nstyles.nIcon8, { tintColor: colors.colorSapphireTwo, transform: [{ rotate: '-90deg' }] }]} resizeMode='contain' />
                    <Text style={[styles.text, { marginLeft: 10, color: colors.colorSapphireTwo }]}>{item.question}</Text>
                </TouchableOpacity>
                {/* <WebView
                    source={{ uri: 'https://github.com/facebook/react-native' }}
                /> */}
            </View>

        )
    }
    _selectItem = (item, index) => {
        this.setState({ indexSelect: item.idFAQ })
    }


    render() {
        const menugr = false;

        return (
            // ncontainerX support iPhoneX, ncontainer + nfooter mới sp iphoneX 
            <View style={nstyles.nstyles.ncontainer}>
                {/* Header  */}
                <HeaderCom iconLeft={Images.icBackWhite} nthis={this} />
                {/* BODY */}
                <View style={nstyles.nstyles.nbody}>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: this.item.answer }}
                    />
                </View>
                {/* <WebView
                    // originWhitelist={['*']}
                    source={{ html: "<span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">The&nbsp;</span><strong style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\"><a href=\"https://www.agoda.com/hotels-near-national-palace-museum/attractions/taipei-tw.html\" target=\"blank\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; color: rgb(2, 131, 223); transition: all 0.2s ease 0s; cursor: pointer;\">National Palace Museum</a></strong><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">&nbsp;was established in 1965, and it holds one of the world’s largest collections of Chinese imperial artifacts and pieces of art, with a collection size of almost 700,000 pieces.&nbsp;</span><div><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\"><br></span></div><div><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">The size of the collection is staggering and, whether you’re an art fan or not, you have to appreciate the scope of this wondrous collection.&nbsp;</span></div><div><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\"><br></span></div><div><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">Steep yourself in Chinese history as you move through the collection at the&nbsp;</span><strong style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\"><a href=\"https://www.agoda.com/hotels-near-national-palace-museum/attractions/taipei-tw.html\" target=\"blank\" style=\"background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; color: rgb(2, 131, 223); transition: all 0.2s ease 0s; cursor: pointer;\">National Palace Museum</a></strong><span style=\"color: rgb(51, 51, 51); font-family: mallory, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 16px;\">&nbsp;and experience the relics of the past as you remember that much of this collection was once owned by former Chinese emperors.</span></div>" }}
                /> */}
                {/* <ScrollView> */}
                {/* <FlatList
                        data={data}
                        style={{ paddingVertical: 10 }}
                        renderItem={({ item, index }) => this._renderItem(item, index)}
                        keyExtractor={(item, index) => item.idFAQ.toString()}
                    /> */}


                {/* <Image source={Images.hotel} style={{ width: nstyles.Width(100), height: nstyles.Height(20) }} resizeMode='cover' />
                    <View style={nstyles.nstyles.nbody}>
                        <View style={{ paddingHorizontal: 22 }}>
                            <View style={[nstyles.nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, }]}>
                                <Text style={{ fontSize: sizes.sText16 }}>We're here to help.</Text>
                                <Text style={{ fontSize: sizes.sText12 }}>Browse Help Topics</Text>
                            </View>
                            <View style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: colors.brownishGrey, borderTopColor: colors.brownishGrey, borderTopWidth: 0.5 }}>
                                <Text style={{ textAlign: 'center', fontSize: sizes.sText12, fontWeight: '600' }}>Find 24/7 assistance on social {'\n'}media only with</Text>
                                <View style={[nstyles.nstyles.nrow, { marginTop: 15, justifyContent: 'center' }]}>
                                    <TouchableOpacity>
                                        <Image source={Images.btnFacebook} style={{ width: sizes.sizes.nImgSize90, height: sizes.sizes.nImgSize28, marginRight: 20 }} resizeMode='contain' />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={Images.btnTwitter} style={{ width: sizes.sizes.nImgSize75, height: sizes.sizes.nImgSize28 }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <FlatList

                            data={ndata}
                            style={{ paddingVertical: 10 }}
                            renderItem={({ item, index }) => this._renderItem(item, index)}
                            keyExtractor={(item, index) => item.idCategory.toString()}
                        />
                        <ButtonCom
                            style={{ marginHorizontal: 22 }}
                            onPress={() => this._contactUS()}
                            text={'Contact Us'} style={{ marginTop: nstyles.Height(2) }} />



                    </View> */}

                {/* </ScrollView> */}

            </View >
        );
    }

}
