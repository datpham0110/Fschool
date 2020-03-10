import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, sizes } from '../../styles';
import { appConfig } from '../../app/Config';
import { reSize, reText } from '../../styles/size';
import Utils from '../../app/Utils';
import { nstyles, Height } from '../../styles/styles';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import { nkey } from '../../app/keys/keyStore';
import { nGlobalKeys } from '../../app/keys/globalKey';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HoatDong_Detail, HoatDong_Comment, HoatDong_TuongTac, HoatDongCommentList } from '../../apis/gochoatdong';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
const { width } = Dimensions.get('window');

function handleTime(second) {
    if (second < 60) return { value: second, name: 'giây' };
    if (second >= 60 && second < 3600) return { value: Math.round(second / 60), name: 'phút' };
    if (second >= 3600 && second < 86400) return { value: Math.round(second / 3600), name: 'giờ' };
    if (second >= 86400) return { value: Math.round(second / 86400), name: 'ngày' };
}
export default class ChiTietGocHoatDong extends Component {
    constructor(props) {
        super(props);
        this._onRefresh = Utils.ngetParam(this, '_onRefresh')
        this.state = {
            dsdata: [],
            mes: '',
            tim: 0,
            _page: 0,
            _allPage: 1,
            record: 10,
            listCmt: [],
            desTouch: false,
            showload: false
        };
        this.actionDetail = Utils.ngetParam(this, 'actionDetail')
        this.informationAccount = Utils.getGlobal(
            nGlobalKeys.informationAccount,
            ''
        )
    }
    componentDidMount() {
        this._loadDetailAction();
        this.loadCommentList()
        setTimeout(() => {
            this.SCROll.scrollToEnd()
        }, 200);
    }
    scrollToIndex = () => {
        let randomIndex = Math.floor(Math.random(this.state.dsdata.listCmt == 10));
        this.flatListRef.scrollToIndex({ animated: true, index: 20 });
    }
    _loadDetailAction = async (nextPage = 0) => {
        var { dsdata, tim, _page, _allPage, record } = this.state
        Utils.nlog('------------------ _loadDetailAction')
        let res = await HoatDong_Detail(this.actionDetail.IDRow, this.informationAccount.RowId, nextPage, record)
        Utils.nlog('------------------ _loadDetailAction', res)
        if (res.success == true) {
            dsdata = res.data
            tim = res.data.TuongTac.Tim
        } else {
            dsdata = []
        }
        this.setState({ dsdata, tim, showload: false })
    }
    loadCommentList = async () => {
        var { _page } = this.state;
        let res = await HoatDongCommentList(this.actionDetail.IDRow, this.informationAccount.RowId, _page)
        Utils.nlog('HoatDongCommentList', res)
        if (res.success == 1) {
            listCmt = res.data.listCmt
        } else {
            listCmt = []
        }
        this.setState({ listCmt })
    }
    loadMoreData = async () => {
        var { _page, _allPage } = this.state;
        if (_page < _allPage) {
            let res = await HoatDongCommentList(this.actionDetail.IDRow, this.informationAccount.RowId, _page + 1)
            Utils.nlog('_loadDetailAction', res)
            if (res.success == 1) {
                listCmt = this.state.listCmt.concat(res.data.listCmt)
            }
            this.setState({ listCmt })
        }
    }

    renderItem = ({ item, index }) => {
        const time = handleTime(Utils.datesDiff(new Date(), moment(item.ThoiGian, 'DD/MM/YYYY HH:mm'), true));
        return (
            <View style={[nstyles.nrow, { paddingVertical: 10 }]}>
                <Image source={Images.imgProfile} resizeMode='contain' style={nstyles.nIcon35} />
                <View style={{ borderBottomWidth: 1, borderRadius: 6, marginLeft: 7, padding: 5, flex: 1, borderColor: '#b8b8b8' }}>
                    <Text style={{ fontSize: sizes.reSize(14), fontWeight: 'bold' }}>
                        {item.TenNguoiBL}
                    </Text>
                    <Text style={{ fontSize: sizes.reSize(12), fontWeight: '400', paddingTop: 5 }}>
                        {item.NoiDung}
                    </Text>
                    <Text style={{ fontSize: sizes.reSize(10), fontWeight: '200', paddingVertical: 7 }}>
                        {moment(item.ThoiGian, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}
                    </Text>
                </View>
            </View>
        )
    }
    renderItemImg = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={this._showAllImageHotel(appConfig.domainImg + this.state.linkHinhAnh, index)} style={{ margin: 5 }}>
                <Image source={{ uri: appConfig.domainImg + item }} style={{ width: width * 0.25, height: width * 0.25 }} resizeMode='cover' />
            </TouchableOpacity>
        );
    }
    _showAllImageHotel = (arrImage, index) => () => {
        const imagesURL = [];
        for (let index = 0; index < this.state.dsdata.linkHinhAnh.length; index++) {
            const item = this.state.dsdata.linkHinhAnh[index];
            const obj = {
                url: appConfig.domainImg + item,
                // width: arrImage.width,
                // height: arrImage.height
            };
            imagesURL.push(obj);
        };
        Utils.goscreen(this, 'sc_ViewImageListShow', { ListImages: imagesURL, index });
    }
    _sendComment = async () => {
        if (this.state.mes.trim().length > 0) {
            let fullname = await Utils.ngetStore(nkey.Fullname, "");
            let info = Utils.getGlobal(nGlobalKeys.informationAccount, '')
            let res = await HoatDong_Comment(this.actionDetail.IDRow, this.state.mes, fullname, info.RowId);
            if (res.success == true) {
                this.setState({ mes: '' })
                this.loadCommentList(this.actionDetail.IDRow, this.informationAccount.RowId);

            };
            // setTimeout(() => {
            //     this.SCROll.scrollToEnd()
            // }, 200);
        }
    }
    _tuongTac = async () => {
        if (this.state.desTouch == false) {
            this.setState({ desTouch: true })
            let informationAccount = Utils.getGlobal(nGlobalKeys.informationAccount, '')
            if (this.state.dsdata.IsTT == false) {
                let res = await HoatDong_TuongTac(true, this.actionDetail.IDRow, informationAccount.RowId)
                if (res.success == true) {
                    this._loadDetailAction(this.actionDetail.IDRow, this.informationAccount.RowId);
                }
            } else {
                let res = await HoatDong_TuongTac(false, this.actionDetail.IDRow, informationAccount.RowId)
                if (res.success == true) {
                    this._loadDetailAction(this.actionDetail.IDRow, this.informationAccount.RowId);
                }
            }
        }
        this.setState({ desTouch: false })
    }
    _goback = () => {
        this._onRefresh()
        Utils.goback(this)
    }
    render() {
        var { dsdata, tim, listCmt } = this.state
        console.log('listCmt', listCmt)
        return (
            <View style={[nstyles.ncontainerX, { paddingBottom: 10 }]}>
                <HeaderCom onPressLeft={this._goback} nthis={this} iconLeft={Images.icbackspace} titleText={'Góc hoạt động'} />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
                    <ScrollView ref={ref => this.SCROll = ref}>
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flex: 1 }}>
                            <Text style={{ color: '#29a9e0', fontSize: sizes.reSize(18), fontWeight: 'bold' }}>
                                {this.actionDetail.TieuDe}
                            </Text>
                            <Text style={{ fontSize: sizes.reSize(14), fontWeight: '300', paddingVertical: 5 }}>
                                {this.actionDetail.NoiDung}
                            </Text>
                            <Text style={{ fontSize: sizes.reSize(10), fontWeight: '300', paddingVertical: 5, color: colors.black_80 }}>
                                {moment(this.actionDetail.NgayDang, 'MM/DD/YYYY h:mm:ss A').format("DD/MM/YYYY HH:mm")}
                            </Text>
                            <View style={{ flexWrap: 'wrap', paddingVertical: 10 }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={dsdata.linkHinhAnh}
                                    numColumns={3}
                                    renderItem={this.renderItemImg}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View style={{ height: 1, backgroundColor: '#b8b8b8', opacity: 0.4 }} />
                            <View style={[nstyles.nrow, { marginVertical: 8, alignItems: 'center' }]}>
                                <TouchableOpacity onPress={this._tuongTac}>
                                    <Image source={Images.icLikeGocHD} resizeMode='contain' style={{ width: 20, height: 20, tintColor: dsdata.IsTT == false ? colors.black_20 : null }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: sizes.reSize(20), marginLeft: 5 }}>{tim > 0 ? tim : 0}</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#b8b8b8', opacity: 0.4 }} />
                        </View>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 7, backgroundColor: 'white' }}>
                            <FlatList
                                data={listCmt}
                                extraData={this.state}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                            {
                                listCmt.length == 10 ? <TouchableOpacity onPress={this.loadMoreData} style={{ marginTop: 5 }}>
                                    <Text style={{ color: '#84D3A5' }}>Xem thêm bình luận</Text>
                                </TouchableOpacity> : null
                            }
                        </View>
                    </ScrollView>
                    {/* <View style={[nstyles.shadow, {
                        backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 7,
                        borderTopWidth: 1, borderColor: colors.BackgroundHome, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }]}> */}
                    <View style={{
                        backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 7, paddingBottom: 10,
                        borderTopWidth: 1, borderColor: colors.BackgroundHome, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: colors.BackgroundHome, justifyContent: 'center', width: width * 0.7 }}>
                            <TextInput
                                extraHeight={300}
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
                            <Image style={[styles.nicon2,]} source={Images.icSendMsg} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View >
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

// const mapStateToProps = state => ({
//     infoUser: state.infoUser
// });

// export default Utils.connectRedux(ChiTietGocHoatDong, mapStateToProps, true);