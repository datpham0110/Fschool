import React, { Component } from 'react';
import {
    Image, View, StyleSheet, Text, Platform, Alert, TouchableOpacity, ScrollView, TextInput, FlatList
} from 'react-native';

// import { nstyles, nColors, nwidth, nheight, Height, Width } from '../../styles/styles';
import Utils from '../../app/Utils';
import { Images } from '../../images/index';
import HeaderCom from '../../components/HeaderCom';
import ButtonCom from '../../components/Button/ButtonCom';
import DatePick from '../../components/DatePick';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { RootLang } from '../../app/data/locales';
import DatePickList from '../../components/DatePickList';
import { ROOTGlobal } from '../../app/data/dataGlobal';
import RootScreen from '../RootScreen';
import API from '../../apis';
import { colors, sizes, nstyles } from '../../styles';
import styles from './styles';
import Input from '../../components/Input';
const ndata = [
    {
        "idCategory": 1,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Chuyến bay",
        "slug": "faq-flight",
        "iCon": "",
        "pageTitle": "Chuyến bay",
        "metaDes": "Chuyến bay",
        "metaKeyword": "Chuyến bay",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/b1887c1d-1bce-43b5-9a16-94a970bdd1dc",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-02-21T15:25:39.457",
        "listLanguage": []
    },
    {
        "idCategory": 23,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "How to book ticket?",
        "slug": "OSCAR",
        "iCon": "",
        "pageTitle": "ticket2",
        "metaDes": "",
        "metaKeyword": "",
        "metaImage": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-02-26T16:34:33.633",
        "listLanguage": []
    },
    {
        "idCategory": 1029,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "e",
        "slug": "e",
        "pageTitle": "e",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:46:06.253",
        "listLanguage": []
    },
    {
        "idCategory": 1030,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "r",
        "slug": "r",
        "pageTitle": "r",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:46:21.927",
        "listLanguage": []
    },
    {
        "idCategory": 1031,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "r",
        "slug": "q",
        "pageTitle": "r",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:46:47.363",
        "listLanguage": []
    },
    {
        "idCategory": 1032,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "m",
        "slug": "m",
        "pageTitle": "m",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:47:06.16",
        "listLanguage": []
    },
    {
        "idCategory": 1033,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "v",
        "slug": "v",
        "pageTitle": "k",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:47:22.52",
        "listLanguage": []
    },
    {
        "idCategory": 1034,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "e",
        "slug": "o",
        "pageTitle": "b",
        "metaDes": "",
        "metaKeyword": "",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-05-29T17:47:48.987",
        "listLanguage": []
    },
    {
        "idCategory": 2028,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "g",
        "slug": "g",
        "pageTitle": "g",
        "metaDes": "g",
        "metaKeyword": "g",
        "createBy": 0,
        "menugroup": 1,
        "prior": 1,
        "createdDate": "2019-06-10T12:26:05.317",
        "listLanguage": []
    },
    {
        "idCategory": 7,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Trọn gói",
        "slug": "combo",
        "iCon": "https://cdn.bookve.com.vn/vietravel/FAQCategories/abba0196-9abf-4e2c-a7c2-5351c612678e",
        "pageTitle": "Trọn gói",
        "metaDes": "Trọn gói",
        "metaKeyword": "Trọn gói",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/7b57d38d-2dee-4747-b9cb-4473e82a7bbc",
        "createBy": 0,
        "menugroup": 1,
        "prior": 3,
        "createdDate": "2019-02-22T10:56:04.433",
        "listLanguage": []
    },
    {
        "idCategory": 8,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Nhắc nhở du lịch",
        "slug": "travel-alert",
        "iCon": "https://cdn.bookve.com.vn/vietravel/FAQCategories/c5b9d1af-f98a-489f-80fe-cf998512a579",
        "pageTitle": "Nhắc nhở du lịch",
        "metaDes": "Nhắc nhở du lịch",
        "metaKeyword": "Nhắc nhở du lịch",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/2e155506-165d-4a80-b3c7-ec72058ad4e8",
        "createBy": 0,
        "menugroup": 1,
        "prior": 3,
        "createdDate": "2019-02-22T11:08:10.237",
        "listLanguage": []
    },
    {
        "idCategory": 10,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Blog",
        "slug": "faq-blog",
        "iCon": "https://cdn.bookve.com.vn/vietravel/FAQCategories/50ec3295-ce8b-4768-95ec-a26f8cca8985",
        "pageTitle": "Blog",
        "metaDes": "Blog",
        "metaKeyword": "Blog",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/c136ffe4-7a59-46ec-965c-36aa839ff26c",
        "createBy": 0,
        "menugroup": 1,
        "prior": 5,
        "createdDate": "2019-02-22T14:20:03.987",
        "listLanguage": []
    },
    {
        "idCategory": 26,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "ATTRACTION vi",
        "slug": "attraction",
        "iCon": "https://cdn.bookve.com.vn/vietravel/FAQCategories/5192734f-07c1-4850-844a-8052af1aed8f",
        "pageTitle": "ATTRACTION vi",
        "metaDes": "ATTRACTION",
        "metaKeyword": "ATTRACTION",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/0486c724-140d-4a4c-8622-6ab584aa2849",
        "createBy": 0,
        "menugroup": 1,
        "prior": 6,
        "createdDate": "2019-03-07T11:00:43.367",
        "listLanguage": []
    },
    {
        "idCategory": 25,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Sim cart vi",
        "slug": "sim-cart",
        "iCon": "https://cdn.bookve.com.vn/vietravel/FAQCategories/b10b377a-ad6f-4489-b83a-82961746529f",
        "pageTitle": "Sim cart vi",
        "metaDes": "Sim cart vi",
        "metaKeyword": "Sim cart vi",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/1c55d625-2770-4275-8879-318591cce2bc",
        "createBy": 0,
        "menugroup": 1,
        "prior": 7,
        "createdDate": "2019-03-02T09:07:04.953",
        "listLanguage": []
    },
    {
        "idCategory": 3,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Thanh toán",
        "slug": "faq-payment",
        "iCon": "",
        "pageTitle": "Thanh toán",
        "metaDes": "Thanh toán",
        "metaKeyword": "Thanh toán",
        "createBy": 0,
        "menugroup": 2,
        "prior": 1,
        "createdDate": "2019-02-21T15:26:09.193",
        "listLanguage": []
    },
    {
        "idCategory": 2,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Khách sạn",
        "slug": "faq-hotel",
        "iCon": "",
        "pageTitle": "Khách sạn",
        "metaDes": "Khách sạn",
        "metaKeyword": "Khách sạn",
        "metaImage": "https://cdn.bookve.com.vn/vietravel/FAQCategories/d4767c41-e697-42c1-91f4-442c61875687",
        "createBy": 0,
        "menugroup": 2,
        "prior": 2,
        "createdDate": "2019-02-21T15:26:08.127",
        "listLanguage": []
    },
    {
        "idCategory": 12,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Cuộc sống",
        "slug": "live",
        "pageTitle": "Cuộc sống",
        "metaDes": "Cuộc sống",
        "metaKeyword": "cuoc song",
        "createBy": 0,
        "menugroup": 2,
        "prior": 3,
        "createdDate": "2019-02-25T13:35:04.207",
        "listLanguage": []
    },
    {
        "idCategory": 27,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Du lịch theo đoàn",
        "slug": "tour",
        "pageTitle": "Du lịch theo đoàn",
        "metaDes": "du lịch nhóm",
        "metaKeyword": "du lịch nhóm",
        "createBy": 0,
        "menugroup": 3,
        "prior": 1,
        "createdDate": "2019-04-05T09:09:05.787",
        "listLanguage": []
    },
    {
        "idCategory": 9,
        "langCode": "vi",
        "languageName": "Tiếng Việt (vi)",
        "title": "Thiết lập tài khoản",
        "slug": "account-setting",
        "pageTitle": "Thiết lập tài khoản",
        "metaDes": "Thiết lập tài khoản",
        "metaKeyword": "Thiết lập tài khoản",
        "createBy": 0,
        "menugroup": 3,
        "prior": 2,
        "createdDate": "2019-02-22T14:05:14.51",
        "listLanguage": []
    }
]
export default class FAQ_1 extends Component {
    constructor(props) {
        super(props);
        paddinggeneral = 22;
        this.co = true;
        this.email = null;
        this.state = {
            data: [],
            idCategory: null
        }
        // let date = new Date();
    }
    _contactUS = () => {
        Utils.goscreen(this, 'sc_FAQContact');
    }

    async componentDidMount() {
        this._getAllFAQCategories();
    }
    _renderItem = (item, index) => {
        let tam = index != 0 && ndata[index].menugroup != ndata[index - 1].menugroup;
        if (tam) this.co = false;
        return (
            <TouchableOpacity
                onPress={() => this._selectItem(item)}
                style={[styles.containerMenugroup, { marginTop: tam ? 15 : 0, marginHorizontal: 22, backgroundColor: 'white' }]}>
                <View style={{ backgroundColor: this.state.idCategory == item.idCategory ? colors.softBlue : 'white', width: 6 }} />
                <View style={[nstyles.nstyles.nrow, { alignItems:'center', flex: 1, backgroundColor: this.state.idCategory == item.idCategory ? 'rgba( 137, 170, 255, 0.5)' : 'white' }]}>
                    {item.metaImage ? <Image
                        style={[nstyles.nstyles.nIcon24, { marginLeft: 10 }]} resizeMode='contain'
                        source={{ uri: item.metaImage  }}
                    /> : null}
                    <Text style={[styles.text,{paddingVertical: 10, marginLeft:10}]}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _selectItem = (item, index) => {
        // this._getVT_ContentFAQ(item.slug);
        Utils.goscreen(this, 'sc_FAQItemMenu', { slug: item.slug, pageTitle: item.pageTitle });
        this.setState({ idCategory: item.idCategory })
    }
    _getAllFAQCategories = async () => {
        const res = await API.Content.AllFAQCategories();
        Utils.nlog(res)
        if (res.status == 1 && res.data.length > 0)
            this.setState({ data: res.data });
    }
    _handleOnChangeText = (txt) => {
        this.email = txt;
    }
    _handleSubscribe = async () => {
        if (this.email != null) {
            const res = await API.User.VT_CusAccounts_SubscribeEmail(this.email);
            if (res.status == 1)
                Utils.showMsgBoxOK(this, RootLang.lang.notification, res.error.message, RootLang.lang.ok);
            Utils.nlog('register', res)
        } else Utils.showMsgBoxOK(this, RootLang.lang.notification, RootLang.lang.emailcannotempty, RootLang.lang.ok);
    }
    render() {
        return (
            // ncontainerX support iPhoneX, ncontainer + nfooter mới sp iphoneX 
            <View style={nstyles.nstyles.ncontainer}>
                {/* Header  */}
                <HeaderCom nthis={this} />
                {/* BODY */}
                <View style={nstyles.nstyles.nbody}>
                    <ScrollView>
                        <Image source={Images.hotel} style={{ width: nstyles.Width(100), height: nstyles.Height(20) }} resizeMode='cover' />
                        <View style={nstyles.nstyles.nbody}>
                            <View style={{ paddingHorizontal: 22 }}>
                                <View style={[nstyles.nstyles.nrow, { alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, }]}>
                                    <Text style={[styles.title, { fontWeight: "500" }]}>{RootLang.lang.wereheretohelp}.</Text>
                                    <Text style={[styles.text2, { color: 'black' }]}>{RootLang.lang.browsehelptopics}</Text>
                                </View>
                                <View style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: colors.brownishGrey, borderTopColor: colors.brownishGrey, borderTopWidth: 0.5 }}>
                                    <View style={{ marginHorizontal: 60 }}>
                                        <Text style={{ fontSize: sizes.sText12, fontWeight: '600', textAlign: 'center' }}>{RootLang.lang.find24assistanceonsocical}</Text>
                                        <View style={[nstyles.nstyles.nrow, { marginTop: 15, justifyContent: 'space-between' }]}>
                                            <TouchableOpacity>
                                                <Image source={Images.btnFacebook} style={{ width: sizes.sizes.nImgSize90, height: sizes.sizes.nImgSize28, }} resizeMode='contain' />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image source={Images.btnTwitter} style={{ width: sizes.sizes.nImgSize75, height: sizes.sizes.nImgSize28 }} resizeMode='contain' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <ButtonCom
                                    onPress={() => this._contactUS()}
                                    text={RootLang.lang.contactus} style={{ marginTop: nstyles.Height(4), marginBottom: 10 }} />
                            </View>

                            <FlatList
                                data={this.state.data}
                                style={{ paddingVertical: 10 }}
                                renderItem={({ item, index }) => this._renderItem(item, index)}
                                keyExtractor={(item, index) => item.idCategory.toString()}
                            />
                            <Image source={Images.hotel} style={{ width: nstyles.Width(100), height: nstyles.Height(20), marginTop: 10 }} resizeMode='cover' />
                            <View style={{ paddingHorizontal: paddinggeneral }}>
                                <Text style={[styles.title, { fontWeight: "normal", marginTop: 10 }]}>Save time and save money</Text>
                                <Text style={[styles.text2, { color: 'black', fontWeight: "300", marginTop: 10 }]}>Sed non mauris vitae erat consequat auctor eu in elit</Text>
                                <Input
                                    customStyle={[styles.title, { fontWeight: '300', borderColor: colors.softBlue }]}
                                    placeholder={RootLang.lang.email}
                                    onChange={text => this._handleOnChangeText(text)}
                                />

                            </View>
                            <View style={{ alignItems: 'flex-end', paddingRight: paddinggeneral }}>
                                <ButtonCom
                                    onPress={() => this._handleSubscribe()}
                                    text={RootLang.lang.Subscribe}
                                    style={{ marginTop: nstyles.Height(3), backgroundColor: colors.softBlue, paddingHorizontal: 40, marginBottom: 20 }} />
                            </View>

                        </View>
                    </ScrollView>
                </View>


            </View >
        );
    }

}
