import React, { Component } from "react"
import { View, Dimensions, TouchableOpacity, Text, Image, FlatList } from "react-native"
import Utils from "../../app/Utils"
import { nstyles } from "../../styles/styles"
import { colors } from "../../styles/color"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images/index"
import ButtonCom from "../../components/Button/ButtonCom"
import { sizes } from "../../styles"
import { appConfig } from "../../app/Config"
import ListEmpty from "../../components/ListEmpty"
import { GocHocTapDetail } from "../../apis/gochoctap"
const { width, height } = Dimensions.get("window")

export default class ModalChiTietGHT extends Component {
    constructor(props) {
        super(props)
        this.dataChiTiet = Utils.ngetParam(this, 'dataChiTiet', [])
        nthis = this
        this.state = {
            data: [],
            dataImage: []
        }
    }
    componentDidMount() {
        this.Post_GocHocTapDetail();
    }
    Post_GocHocTapDetail = async () => {
        Utils.nlog('---------------', this.dataChiTiet)
        let res = await GocHocTapDetail(this.dataChiTiet.IDRow)
        Utils.nlog('res ------', res)
        if (res.success == 1) {
            data = res.data
            dataImage = res.data.ChiTiet
        } this.setState({ data, dataImage })
    }
    goBack = () => {
        Utils.goback(this)
    }
    renderItem = ({ item, index }) => {
        Utils.nlog(' appConfig.domainImg + item', appConfig.domainImg + item.LinkHinh)
        return (
            <TouchableOpacity onPress={this._showAllImageHotel(appConfig.domainImg + item.LinkHinh, index)} style={{ margin: 5 }}>
                <Image source={{ uri: appConfig.domainImg + item.LinkHinh }} style={{ width: width * 0.25, height: width * 0.25 }} resizeMode='cover' />
            </TouchableOpacity>
        )
    }
    _showAllImageHotel = (arrImage, index) => () => {
        Utils.nlog('arrImage', arrImage)
        const imagesURL = [];
        for (let index = 0; index < dataImage.length; index++) {
            const item = dataImage[index];
            const obj = {
                url: appConfig.domainImg + item.LinkHinh,
                // width: arrImage.width,
                // height: arrImage.height
            };
            imagesURL.push(obj);
        };
        Utils.goscreen(this, 'sc_ViewImageListShow', { ListImages: imagesURL, index });
    }
    render() {
        var { data, dataImage } = this.state
        return (
            <View style={[nstyles.ncontainerX,]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={"Chi tiết"}
                />
                <View style={[nstyles.nbody, { backgroundColor: colors.whitegay, marginHorizontal: 20 }]}>
                    <View style={{ backgroundColor: 'white', marginTop: 20, marginBottom: 12, paddingHorizontal: 20, paddingTop: 15, paddingBottom: 20 }}>
                        <Text style={{ color: '#29a9e0', fontWeight: 'bold' }}>Kết quả học tập trong ngày</Text>
                        {/* <View style={{ backgroundColor: '#b8b8b8', height: 1, marginVertical: 13 }} /> */}
                        <View style={{ padding: 15, borderRadius: 6, borderWidth: 0.5, borderColor: '#b8b8b8' }}>
                            <Text style={{ fontSize: sizes.reSize(12) }}>{this.dataChiTiet.KetQuaHocTap}</Text>
                        </View>
                        {/* <View style={{ borderRadius: 6, borderWidth: 0.5, borderColor: '#b8b8b8', padding: 15, height: '90%' }}> */}
                        <FlatList
                            // ListEmptyComponent={<ListEmpty textempty={'Không có nội dung hình ảnh đi kèm'} />}
                            data={dataImage}
                            renderItem={this.renderItem}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state} />
                        {/* </View> */}

                    </View>
                    <View style={{ backgroundColor: 'white', marginBottom: 12, paddingHorizontal: 20, paddingTop: 15, paddingBottom: 20, height: '73%' }}>
                        <Text style={{ color: '#29a9e0', fontWeight: 'bold' }}>Ghi chú</Text>
                        <Text style={{ fontSize: sizes.reSize(12) }}>{data.GhiChu}</Text>
                        {/* <View style={{ backgroundColor: '#b8b8b8', height: 1, marginVertical: 13 }} /> */}

                    </View>
                </View>
                <ButtonCom
                    style={{ backgroundColor: '#00b096', marginHorizontal: 65, marginBottom: 20 }}
                    onPress={this.goBack}
                    text={"Quay lại"}
                />
            </View >
        )
    }
}
