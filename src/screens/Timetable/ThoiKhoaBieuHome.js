import React, { Component, Fragment } from "react";
import { colors, sizes, nstyles } from "../../styles";
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Utils from "../../app/Utils";
import { appConfig } from "../../app/Config"
import HeaderCom from "../../components/HeaderCom";
import { Images } from "../../images";
import apis from '../../apis';
import { RootLang } from "../../app/data/locales";
import moment from 'moment';
import { nGlobalKeys } from "../../app/keys/globalKey"
import ListEmpty from '../../components/ListEmpty';
class ThoiKhoaBieuHome extends Component {
    constructor(props) {
        super(props);
        nthisApp = this;
        this.state = {
            listTKB: [],
            txtEmpty: RootLang.lang.loading,
            isLoading: true,
            childSelected: {}
        };
        this.IDHocSinh = Utils.ngetParam(this, 'IDHocSinh')
        this.flagNotify = Utils.ngetParam(this, 'flagNotify', false);
        this.student = Utils.ngetParam(this, 'student', '');
    }


    componentDidMount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'ThoiKhoaBieu')
        if (this.flagNotify == true) {
            this._setHocSinh(this.IDHocSinh);
        } else {
            this._setHocSinh(this.student.IDKhachHang);
        }
    }
    componentWillUnmount() {
        Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
    }
    _showAllImageHotel = (arrImage, index) => () => {
        const imagesURL = [];
        if (!Array.isArray(arrImage)) {
            const obj = {
                url: `${appConfig.domainImg}${arrImage}`,
            };
            imagesURL.push(obj);
        } else
            for (let index = 0; index < arrImage.length; index++) {
                const item = arrImage[index];
                const obj = {
                    url: item.uri,
                    width: item.width,
                    height: item.height
                };
                imagesURL.push(obj);
            };
        Utils.goscreen(this, 'sc_ViewImageListShow', { ListImages: imagesURL, index });
    }

    _renderItemListTKB = ({ item, index, arrImages }) => {
        return <Fragment>
            <View style={[nstyles.nstyles.nrow, { paddingHorizontal: 10, backgroundColor: colors.white, marginTop: 10, paddingVertical: 10 }]}>
                <View style={{ flex: 1, paddingRight: 20 }}>
                    <Text
                        style={{ fontSize: sizes.reText(14), fontWeight: '700' }}>{item.TieuDe}</Text>
                    <Text style={{ fontSize: sizes.reText(12), color: colors.black_60, fontStyle: 'italic', marginTop: 5 }}>{`Cập nhật lúc ${moment(item.ModifiedDate ? item.ModifiedDate : item.NgayTao).format('HH:mm')}, ${moment(item.ModifiedDate ? item.ModifiedDate : item.NgayTao).format('DD/MM/YYYY')}`}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={{ width: sizes.reSize(120), height: sizes.reSize(120), marginBottom: 15, marginTop: 10, marginLeft: 10 }}
                onPress={this._showAllImageHotel(item.LinkHinh, 0)}>
                <Image
                    resizeMode="cover"
                    source={{ uri: `${appConfig.domainImg}${item.LinkHinh}` }}
                    tintColorLeft={colors.black_11}
                    style={{ width: sizes.reSize(120), height: sizes.reSize(120) }}
                />
            </TouchableOpacity>
            <View style={{ height: 0.5, backgroundColor: colors.black_20 }} />
        </Fragment>
    }

    _selectHocSinh = () => {
        Utils.goscreen(this, "Model_SelectHocSinh", { childSelected: this.state.childSelected, callback: this.callback })
    }

    callback = async (item) => {
        if (item.IDLopHoc != this.state.childSelected.IDLopHoc) {
            this.setState({ isLoading: true });
            const listTKB = await this._getThoiKhoaBieu(item.IDKhachHang);
            this.setState({ childSelected: item, isLoading: false, listTKB, txtEmpty: RootLang.lang.noData });
        } else {
            this.setState({ childSelected: item });
        };
    }

    _setHocSinh = async (IDKhachHang = false) => {
        const { listchild } = this.props;
        if (!IDKhachHang) {
            if (listchild.length > 0) {
                const childSelected = listchild[0];
                const listTKB = await this._getThoiKhoaBieu(childSelected.IDKhachHang);
                this.setState({ childSelected, isLoading: false, listTKB, txtEmpty: RootLang.lang.noData });
            } else {
                Utils.showMsgBoxOK(this, 'Thông báo', 'Tài khoản chưa liên kết với học sinh', 'Đóng', () => { Utils.goback(this) })
            };
        } else {
            let childSelected;
            for (let i = 0; i < listchild.length; i++) {
                if (listchild[i].IDKhachHang == IDKhachHang) {
                    childSelected = listchild[i];
                    break;
                }
            }
            const listTKB = await this._getThoiKhoaBieu(IDKhachHang);
            this.setState({ childSelected, isLoading: false, listTKB, txtEmpty: RootLang.lang.noData });
        };
    }

    _getThoiKhoaBieu = async (IDKhachHang) => {
        const res = await apis.ListThoiKhoaBieu(IDKhachHang);
        let data = [];
        if (res.status == 1) {
            data = res.data;
        };
        return data;
    }


    render() {
        const { childSelected, listTKB, txtEmpty } = this.state;
        const { nrow } = nstyles.nstyles;
        return (
            <View style={[nstyles.nstyles.ncontainerX, { backgroundColor: colors.BackgroundHome }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Thời khoá biểu"} />
                <View style={[nstyles.nstyles.nbody, { paddingHorizontal: nstyles.khoangcach }]}>
                    {/* <TouchableOpacity
                        style={[nrow, { alignItems: "center", marginHorizontal: 10, alignSelf: 'center' }]}
                        onPress={this._selectHocSinh}>
                        <Text style={{ fontSize: sizes.reText(16), fontWeight: "800", paddingVertical: 10 }}>
                            {childSelected.TenKhachHang ? childSelected.TenKhachHang : '...'}
                        </Text>
                        <Image resizeMode="contain" source={Images.icShowLessDown} style={[nstyles.nstyles.nIcon20, { tintColor: colors.black_20, marginLeft: 5 }]} />
                    </TouchableOpacity> */}

                    <View style={[nstyles.nstyles.nrow, { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10, borderRadius: 4 }]}>
                        <View
                            style={[nstyles.nstyles.nrow, { alignItems: "center", marginHorizontal: 10, justifyContent: 'center', flex: 1 }]}>
                            <View>
                                <Text style={{ fontSize: 15, paddingBottom: 5, fontWeight: "500", textAlign: 'center', color: 'black' }}>
                                    {this.state.childSelected.LopHoc}
                                </Text>
                                <Text style={{
                                    fontSize: 16, fontWeight: "800", color: "black"
                                }}>
                                    {this.state.childSelected.TenKhachHang}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: colors.white }}>
                        <FlatList
                            refreshing={this.state.isLoading}
                            onRefresh={() => this._setHocSinh(childSelected.IDKhachHang)}
                            data={listTKB}
                            renderItem={this._renderItemListTKB}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(ThoiKhoaBieuHome, mapStateToProps, false)

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
    },
});
