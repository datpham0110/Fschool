import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import { appConfig } from '../../app/Config';
import { reText } from '../../styles/size';
import Utils from '../../app/Utils';
import { nstyles } from '../../styles/styles';
import { nGlobalKeys } from '../../app/keys/globalKey';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { HoatDong_Detail, HoatDong_Comment, HoatDong_TuongTac } from '../../apis/gocHoatDong';
import moment from "moment";

import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

function handleTime(second) {
    if (second < 60) return { value: second, name: 'giây' };
    if (second >= 60 && second < 3600) return { value: Math.round(second / 60), name: 'phút' };
    if (second >= 3600 && second < 86400) return { value: Math.round(second / 3600), name: 'giờ' };
    if (second >= 86400) return { value: Math.round(second / 86400), name: 'ngày' };
}
class ChiTietGocHoatDong extends Component {
    constructor(props) {
        super(props);
        this.onRefresh = Utils.ngetParam(this, '_onRefresh', () => { })
        this.state = {
            data: [],
            mes: '',
            desTouch: false,
            like: ''
        };
        this.actionDetail = Utils.ngetParam(this, 'actionDetail')
    }

    componentDidMount() {
        this._loadDetailAction(this.actionDetail.IDRow);
        setTimeout(() => {
            this.SCROLL.scrollToEnd()
        }, 200);
    }

    _loadDetailAction = async (IDRow) => {
        let res = await HoatDong_Detail(IDRow)
        Utils.nlog('Load', res)
        if (res.status == 1) {
            data = res.data
            like = res.data.TuongTac
        } else {
            data = []
        }
        this.setState({ data, like })
    }
    _tuongTac = async () => {
        if (this.state.desTouch == false) {
            this.setState({ desTouch: true })
            let informationAccount = Utils.getGlobal(
                nGlobalKeys.informationAccount,
                ''
            )
            if (this.state.data.IsTT == false) {
                let res = await HoatDong_TuongTac(true, this.actionDetail.IDRow, informationAccount.RowId)
                Utils.nlog('tesss 1', res)
                if (res.status == true) {
                    this._loadDetailAction(this.actionDetail.IDRow);
                }
            } else {
                let res = await HoatDong_TuongTac(false, this.actionDetail.IDRow, informationAccount.RowId)
                Utils.nlog('tesss 2', res)
                if (res.status == true) {
                    this._loadDetailAction(this.actionDetail.IDRow);
                }
            }
            this.setState({ desTouch: false })
        }

    }
    _goBack = () => {
        this.onRefresh();
        Utils.goback(this);
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={[nstyles.nrow, { paddingTop: 15 }]}>
                <Image source={Images.imgProfile} resizeMode='contain' style={nstyles.nIcon29} />
                <View style={{ borderBottomWidth: 1, borderRadius: 6, marginLeft: 7, padding: 5, flex: 1, borderColor: '#b8b8b8' }}>
                    <Text style={{ fontSize: sizes.reSize(10), fontWeight: 'bold' }}>
                        {item.TenNguoiBL}
                    </Text>
                    <Text style={{ fontSize: sizes.reSize(12), fontWeight: '400', paddingTop: 5 }}>
                        {item.NoiDung}
                    </Text>
                    <Text style={{ fontSize: sizes.reSize(10), fontWeight: '200', paddingVertical: 5 }}>
                        {/* {time ? (`${time.value} ${time.name} trước`) : ''} */}
                        {moment(item.ThoiGian, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}

                    </Text>
                </View>
            </View>
        )
    }
    renderItemImg = ({ item, index }) => {
        var imageList = appConfig.domain + item
        var { data } = this.state
        return (
            <TouchableOpacity
                onPress={this._showAllImageHotel(data.linkHinhAnh, index)}  >
                <Image source={{ uri: imageList }}
                    style={{ width: sizes.sizes.nImgSize90, height: sizes.sizes.nImgSize58, margin: 5, borderRadius: 4 }} />
            </TouchableOpacity>
        );
    }
    _showAllImageHotel = (arrImage, index) => () => {
        const imagesURL = [];
        for (let index = 0; index < arrImage.length; index++) {
            const item = arrImage[index];
            const obj = {
                url: appConfig.domain + item,
            };
            imagesURL.push(obj);
        };
        Utils.goscreen(this, 'sc_ViewImageListShow', { ListImages: imagesURL, index });
    }
    _sendComment = async () => {
        const { infoUser } = this.props;
        if (this.state.mes.trim().length > 0) {
            let res = await HoatDong_Comment(this.actionDetail.IDRow, this.state.mes, infoUser.FullName, infoUser.Id);
            if (res.status == 1) {
                this.setState({ mes: '' })
                this._loadDetailAction(this.actionDetail.IDRow);
            };
            setTimeout(() => {
                this.SCROLL.scrollToEnd()
            }, 200);
        }
    }

    render() {
        var { data, like } = this.state
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom
                    onPressLeft={this._goBack}
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Góc hoạt động'}
                />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                    <ScrollView ref={ref => this.SCROLL = ref}>
                        <View style={nstyles.nbody}>
                            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flex: 1 }}>
                                <Text style={{ color: '#29a9e0', fontSize: sizes.reSize(18), fontWeight: 'bold' }}>
                                    {this.actionDetail.TieuDe}
                                </Text>
                                <Text style={{ fontSize: sizes.reSize(14), fontWeight: '300', paddingVertical: 5 }}>
                                    {this.actionDetail.NoiDung}
                                </Text>
                                <Text style={{ fontSize: sizes.reSize(10), fontWeight: '300', paddingVertical: 5, color: colors.black_80 }}>
                                    {moment(this.actionDetail.NgayDang, 'MM/DD/YYYY h:mm:ss A').format('DD/MM/YYYY HH:mm')}
                                </Text>
                                <View style={{ flexWrap: 'wrap', paddingVertical: 10 }}>
                                    <FlatList
                                        data={data.linkHinhAnh}
                                        numColumns={3}
                                        renderItem={this.renderItemImg}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={data.linkHinhAnh}
                                    />
                                </View>
                                <View style={[nstyles.nrow, { marginVertical: 8, alignItems: 'center' }]}>
                                    <TouchableOpacity onPress={this._tuongTac}>
                                        <Image source={Images.icLikeGocHD} resizeMode='contain' style={{ width: 20, height: 20, tintColor: data.IsTT == false ? colors.black_20 : colors.redStar }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: sizes.reSize(20), marginLeft: 10 }}>{like.Tim > 0 ? like.Tim : 0}</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#b8b8b8', opacity: 0.4 }} />
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 7, backgroundColor: 'white' }}>
                            <FlatList
                                data={data.listCmt}
                                extraData={this.state}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>
                    <View style={[nstyles.shadow, {
                        backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 7,
                        borderTopWidth: 1, borderColor: colors.BackgroundHome, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }]}>
                        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: colors.BackgroundHome, justifyContent: 'center', width: width * 0.7 }}>
                            <TextInput
                                placeholder={"Viết bình luận"}
                                multiline={true}
                                style={{ margin: 6, textAlignVertical: 'top', paddingLeft: 4 }}
                                onChangeText={text => this.setState({ mes: text })}
                                placeholderTextColor="#DCDCDC"
                                returnKeyType="go"
                                onSubmitEditing={this.handleEditComplete}
                                value={this.state.mes} />
                        </View>
                        <TouchableOpacity onPress={this._sendComment}>
                            <Image
                                style={[styles.nicon2]}
                                source={Images.icSendMsg}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const stHoctap = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.whitegay,
        padding: 5,
        flex: 1, borderRadius: 4
    },
    stext: {
        fontSize: sizes.reText(13),
        fontWeight: '500'
    },
    containText: {
        backgroundColor: colors.whitegay,
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: 3,
        paddingHorizontal: 10
    }
})

const styles = StyleSheet.create({
    textNameStudent1: {
        marginTop: 15,
        color: colors.blackShadow,
        fontSize: reText(12),
        textAlign: 'center',
        // paddingHorizontal: 15,
        marginBottom: 10,
        flex: 1,
        width: 100
    },
    viewItemStudent1: {
        // width: '33%',
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    nicon2: {
        resizeMode: "contain",
        height: 30,
        width: 30,
        marginLeft: 10
    },
    body: {
        ...nstyles.nbody,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    viewTitle: {
        backgroundColor: colors.white,
        paddingTop: 21,
        paddingHorizontal: 25,
        paddingRight: 26,
    },
    viewStudents: {
        backgroundColor: colors.white,
    },
    textThuNgayThang: {
        color: colors.blackShadow,
        fontSize: reText(16),
        fontWeight: '500',
        textAlign: 'center'
    },
    textThuNgayThang1: {
        color: colors.blackShadow,
        fontSize: reText(20),
        fontWeight: '500',
        textAlign: 'center'
    },
    textSubtitle: {
        marginTop: 4,
        color: colors.grey,
        fontSize: reText(12),
        textAlign: 'center'
    },
    viewTime: {
        flex: 1,
        backgroundColor: colors.white,
        borderColor: colors.veryLightPinkFour,
        borderWidth: 0.2,
        borderRadius: 3,
        padding: 9,
        paddingTop: 7,
    },
    viewTotalStudents: {
        ...nstyles.nrow,
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switchEnoughAllStudents: {
        ...Platform.select({
            ios: {
                transform: [
                    { scaleX: .8 },
                    { scaleY: .8 }
                ],
            },

        }),
        marginLeft: 10
    },
    viewItemStudent: {
        // width: '33%',
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'
    },
    viewSelectStudent: {
        ...nstyles.nIcon32,
        marginTop: 22,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: colors.mediumGreen
    },
    textNameStudent: {
        marginTop: 15,
        color: colors.blackShadow,
        fontSize: reText(12),
        textAlign: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        flex: 1,
        width: 100


    },
    stext: {
        fontSize: sizes.reText(13),
        fontWeight: '500'
    },

})

const mapStateToProps = state => ({
    infoUser: state.infoUser
});

export default Utils.connectRedux(ChiTietGocHoatDong, mapStateToProps, true);