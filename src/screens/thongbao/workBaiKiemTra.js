import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { colors, sizes, nstyles } from '../../styles';
import Utils from '../../app/Utils';
import { nGlobalKeys } from '../../app/keys/globalKey';
import HeaderCom from '../../components/HeaderCom';
import { Images } from '../../images';
import ButtonCom from "../../components/Button/ButtonCom"
import apis from '../../apis';
import { appConfig } from '../../app/Config';

class WorkBaiKiemTra extends Component {
    constructor(props) {
        super(props);
        this.dataCauHoi = Utils.ngetParam(this, "dataCauHoi");
        this.data = Utils.ngetParam(this, "data");
        this.BaoBaiHinh = Utils.ngetParam(this, 'BaoBaiHinh');
        this.checkDoneKT = Utils.ngetParam(this, 'checkDoneKT');
        this.tieuDeBaiKiemTraTracNghiem = Utils.ngetParam(this, 'tieuDeBaiKiemTraTracNghiem', 'Tiêu đề')
        this.done = false;
        this.state = {
            ListCauTraLoi: [],
            lamBaiKT: false,
            touchCauTL: [],
            isLoading: false,
            checkDoneKT: Utils.ngetParam(this, 'checkDoneKT')
        };
        this.dsCauTLHinh = [{
            id: 'A'
        }, {
            id: 'B'
        }, {
            id: 'C'
        }, {
            id: 'D'
        }]
    }

    componentDidMount() {
        Utils.nlog('data cau hoi', this.dataCauHoi)
        if (!this.BaoBaiHinh) {
            this._createListCauTraLoiTracNghiem();
        } else {
            this._createListCauTraLoiHinhAnh();
        }
    }
    _createListCauTraLoiHinhAnh = () => {
        const ListCauTraLoi = []
        for (let i = 0; i < this.dataCauHoi.TongSoLuongCauHoi; i++) {
            const value = {
                "IDThongBao": this.data.IDThongBao,
                "IDPhuHuynh": this.data.IDTaiKhoan,
                "IDBaiKiemTra": this.dataCauHoi.IDBaiKT,
                "IDHocSinh": this.data.IDHocSinh,
                "STTCauHoi": i + 1,
                "DapAnDuocChon": '',
                show: false
            };
            ListCauTraLoi.push(value);
        };
        this.setState({ ListCauTraLoi });
    }
    _createListCauTraLoiTracNghiem = () => {
        const ListCauTraLoi = []
        for (let i = 0; i < this.dataCauHoi.length; i++) {
            Utils.nlog('this.dataCauHoithis.dataCauHoithis.dataCauHoithis.dataCauHoi', this.dataCauHoi[i])
            dapan = ''
            for (let j = 0; j < 4; j++) {
                Utils.nlog(this.dataCauHoi[i].ChiTiet[j].TenDapA)
                if (this.dataCauHoi[i].ChiTiet[j].DapAn == true) {
                    dapan = this.dataCauHoi[i].ChiTiet[j].TenDapAn;
                    break;
                }
            }
            const value = {
                "IDPhuHuynh": Utils.getGlobal(nGlobalKeys.rowId),
                "IDCauHoi": this.dataCauHoi[i].IDRow,
                "IDDapAn": null,
                IDHocSinh: Utils.ngetParam(this, 'IDHocSinh'),
                show: false,
                dapAnDung: dapan
            };
            ListCauTraLoi.push(value);
        };
        this.setState({ ListCauTraLoi });
    }

    touch = (item) => {
        const dataTemp = []
        for (let i = 0; i < data.length; i++) {
            if (item.IDRow == data[i].IDCauHoi) {
                data[i].IDDapAn = item.IDChiTiet
            }
        }
        this.setState({ ListCauTraLoi: data })
    }
    _renderCauHoi = (item, index) => {
        return <Text key={index} style={{}}>{'\t'}{item.TenDapAn}. {item.NoiDung}</Text>
    }

    _chooseAnswer = (item, index) => {
        for (let i = 0; i < this.dataCauHoi.length; i++) {
            const element = this.dataCauHoi[i];
            if (element.IDRow == item.IDRow) {
                element.choose = index;
                break;
            };
        };
    };
    _renderItemCauHoi = ({ item, index }) => {
        return (
            <View style={{ marginVertical: 5, borderRadius: 3, backgroundColor: 'white', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: sizes.fs(14) }}>
                    {index + 1}. {item.NoiDung}
                </Text>
                {item.ChiTiet.map(this._renderCauHoi)}
            </View>
        )
    }

    _submit = async () => {
        if (this.BaoBaiHinh) {
            //TraLoi_BaiKiemTra_DangHinh
            const res = await apis.ThanhToan.TraLoi_BaiKiemTra_DangHinh(this.state.ListCauTraLoi);
            if (res.success) {
                Utils.showMsgBoxOK(this, 'Thông báo', 'Bài kiểm tra gửi thành công', 'Xác nhận');
                this.done = true;
                nthischitietthongbao.setState({ checkDoneKT: true });
                // Utils.goback(this);
                this.setState({ checkDoneKT: true });

            } else {
                Utils.showMsgBoxOK(this, 'Thông báo', res.error.message, 'Xác nhận');
            };
            this.setState({ isLoading: false });

        } else {
            const res = await apis.ThanhToan.TraLoiTracNghiem(this.state.ListCauTraLoi);
            if (res.success) {
                Utils.showMsgBoxOK(this, 'Thông báo', 'Bài kiểm tra gửi thành công', 'Xác nhận');
                this.done = true;
                this.setState({ checkDoneKT: true });
                nthischitietthongbao.setState({ checkDoneKT: true });
            } else {
                Utils.showMsgBoxOK(this, 'Thông báo', res.error.message, 'Xác nhận');
            };
            this.setState({ isLoading: false });
        }

    }

    _lambaiKT = () => {
        // if (this.done || this.BaoBaiHinh) return;
        if (this.done) return;
        if (!this.state.lamBaiKT) {
            this.setState({ lamBaiKT: true });
        } else {
            if (this.BaoBaiHinh) {
                const { ListCauTraLoi } = this.state;
                let check = true;
                for (let index = 0; index < ListCauTraLoi.length; index++) {
                    const item = ListCauTraLoi[index];
                    if (item.DapAnDuocChon == '') {
                        check = false;
                        break;
                    };
                };
                if (!check) {
                    Utils.showMsgBoxOK(this, 'Thông báo',
                        'Vui lòng chọn đủ đáp án để hoàn thành bài kiểm tra',
                        'Đồng ý'
                    );
                } else {
                    this.setState({ isLoading: true }, this._submit);
                };
            } else {
                const { ListCauTraLoi } = this.state;
                let check = true;
                for (let index = 0; index < ListCauTraLoi.length; index++) {
                    const item = ListCauTraLoi[index];
                    if (!item.IDDapAn) {
                        check = false;
                        break;
                    };
                };
                if (!check) {
                    Utils.showMsgBoxOK(this, 'Thông báo',
                        'Vui lòng chọn đủ đáp án để hoàn thành bài kiểm tra',
                        'Đồng ý'
                    );
                } else {
                    this.setState({ isLoading: true }, this._submit);
                };
            }

        };
    }

    _showCauTL = (item, index) => () => {
        if (this.BaoBaiHinh) { //Show câu trả lời của báo bài hình
            // return true;
            const data = this.state.ListCauTraLoi.filter((nitem, nindex) => {
                if (item.STTCauHoi == nitem.STTCauHoi) {
                    nitem.show = true;
                } else {
                    nitem.show = false;
                };
                return true;
            });
            this.setState({ ListCauTraLoi: data });
        } else {//Show câu trả lời của báo trắc nghiệm
            const data = this.state.ListCauTraLoi.filter((nitem, nindex) => {
                if (item.IDCauHoi == nitem.IDCauHoi) {
                    nitem.show = true;
                } else {
                    nitem.show = false;
                };
                return true;
            });
            this.setState({ ListCauTraLoi: data });
        }
    }

    _text = (key) => {
        switch (key) {
            case 0:
                return 'A'
            case 1:
                return 'B'
            case 2:
                return 'C'
            case 3:
                return 'D'
        };
    }

    _chonDapAn = (i, idx, idDataCauHoi) => () => {
        if (this.BaoBaiHinh) {
            const ListCauTraLoi = this.state.ListCauTraLoi.slice();
            for (let index = 0; index < ListCauTraLoi.length; index++) {
                const item = ListCauTraLoi[index];
                if (idDataCauHoi + 1 == item.STTCauHoi) {
                    item.show = false;
                    item.DapAnDuocChon = i.id
                };
            };
            this.setState({ ListCauTraLoi });
        } else {
            const ListCauTraLoi = this.state.ListCauTraLoi.slice();
            for (let index = 0; index < ListCauTraLoi.length; index++) {
                const item = ListCauTraLoi[index];
                if (i.IDRow == item.IDCauHoi) {
                    item.IDDapAn = this.dataCauHoi[idDataCauHoi].ChiTiet[idx].IDChiTiet;
                    item.DapAn = this.dataCauHoi[idDataCauHoi].ChiTiet[idx].TenDapAn;
                    item.show = false
                };
            };
            this.setState({ ListCauTraLoi });
        }

    }
    _renderCauTraLoi = ({ item, index }) => {
        return <View style={{ height: item.show ? 140 : null, width: nstyles.Width(50), paddingTop: 20 }}>
            {!this.BaoBaiHinh ?
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={1} onPress={this._showCauTL(item, index)} style={{ borderBottomWidth: 0.5, width: 80, borderColor: this.state.checkDoneKT ? item.DapAn == item.dapAnDung ? 'black' : 'red' : 'black' }}>
                        <Text style={{ color: this.state.checkDoneKT ? item.DapAn == item.dapAnDung ? 'black' : 'red' : 'black' }}>Câu {index + 1}: <Text style={{ fontWeight: '700', fontSize: sizes.fs(16), color: 'red' }}>{item.DapAn}</Text></Text>
                    </TouchableOpacity>
                    {item.show ? <View style={stWorkBKT.stDapAn}>
                        {this.dataCauHoi[index].ChiTiet.map((i, idx) => {
                            return <TouchableOpacity key={idx} onPress={this._chonDapAn(i, idx, index)} style={{ paddingVertical: 5, paddingHorizontal: 40 }}>
                                <Text style={{ fontSize: sizes.fs(18) }}>{this._text(idx)}</Text>
                            </TouchableOpacity>
                        })}

                    </View> : null}
                    {this.state.checkDoneKT ? item.DapAn == item.dapAnDung ? null : <Text style={{ marginLeft: 5, fontWeight: '800', color: '#8ac47c' }}>{item.dapAnDung}</Text>
                        : null}
                </View> :
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={this._showCauTL(item, index)} style={{ borderBottomWidth: 0.5, width: 100 }}>
                        <Text style={{}}>Câu {index + 1}: <Text style={{ fontWeight: '700', fontSize: sizes.fs(16) }}>{item.DapAnDuocChon}</Text></Text>
                    </TouchableOpacity>
                    {item.show ? <View style={stWorkBKT.stDapAn}>
                        {this.dsCauTLHinh.map((i, idx) => {
                            return <TouchableOpacity key={idx} onPress={this._chonDapAn(i, idx, index)} style={{ paddingVertical: 5, paddingHorizontal: 40 }}>
                                <Text style={{ fontSize: sizes.fs(18) }}>{this._text(idx)}</Text>
                            </TouchableOpacity>
                        })}
                    </View> : null}
                </View>
            }
        </View >
    }

    _renderImage = (item, index) => {
        return (
            <TouchableOpacity key={index} style={{ borderColor: 'black', borderWidth: 1, marginHorizontal: 1, marginVertical: 1, width: (nstyles.nwidth / 3) - 20, height: nstyles.nwidth * 0.25 }}
                onPress={() => Utils.goscreen(this, 'Modal_ShowImgBig', { data: item })
                }>
                <Image
                    resizeMode="cover" source={{ uri: appConfig.domainImg + item }}
                    tintColorLeft={colors.black_11}
                    style={{ width: (nstyles.nwidth / 3) - 20, height: nstyles.nwidth * 0.25 }} />
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={[nstyles.nstyles.ncontainerX, { backgroundColor: colors.backgroundHistory }]}>
                <HeaderCom
                    nthis={this}
                    iconLeft={Images.icbackspace}
                    titleText={'Bài kiểm tra'}
                />
                {this.BaoBaiHinh ? <Text style={{ color: '#29a9e0', fontSize: sizes.fs(18), fontWeight: 'bold', textAlign: 'center', marginBottom: 16, marginTop: 10 }}>{this.dataCauHoi.TieuDeBaiKT}</Text > : <Text style={{ color: '#29a9e0', fontSize: sizes.fs(18), fontWeight: 'bold', textAlign: 'center', marginBottom: 16, marginTop: 10 }}>{this.tieuDeBaiKiemTraTracNghiem}</Text>}
                {/* view báo bài kiểm tra hình và báo bài kiểm tra trắc nghiệm */}
                {
                    !this.BaoBaiHinh ? <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        showsVerticalScrollIndicator={false}
                        data={this.dataCauHoi}
                        renderItem={this._renderItemCauHoi}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.IDRow.toString()}
                    />
                        : <View style={[nstyles.nstyles.nrow, { flexWrap: 'wrap', flex: 1 }]}>
                            {this.dataCauHoi.data.map(this._renderImage)}
                        </View>
                }
                {/* view làm bài kiểm tra */}
                {
                    this.state.lamBaiKT ? <View style={stWorkBKT.stLamBai}>
                        <Text style={{ fontWeight: '600' }}> Câu trả lời</Text>
                        <FlatList
                            style={{ backgroundColor: 'white', flex: 1 }}
                            contentContainerStyle={{ paddingLeft: 10, paddingBottom: 20 }}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            data={this.state.ListCauTraLoi}
                            renderItem={this._renderCauTraLoi}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    </View> : null
                }
                <ButtonCom
                    colorChange={['#f8b199', '#f27972']}
                    disabled={this.checkDoneKT}
                    onPress={this._lambaiKT}
                    Linear={true}
                    text={this.state.checkDoneKT ? 'Đã làm bài kiểm tra' : this.state.lamBaiKT ? "Hoàn thành" : 'Làm bài kiểm tra'}
                    style={{ marginHorizontal: nstyles.khoangcach, marginVertical: 10 }}
                />
                {
                    this.state.isLoading ? <View style={[nstyles.nstyles.nmiddle, { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }]}>
                        <ActivityIndicator size='large' color={colors.white} />
                    </View> : null
                }
            </View >
        );
    }
}

const stWorkBKT = StyleSheet.create({
    stLamBai: {
        // height: nstyles.Height(30),
        backgroundColor: colors.backgroundHistory,
        marginVertical: 10,
        paddingHorizontal: 10,
        flex: 1
    },
    stDapAn: {
        position: 'absolute',
        top: 10,
        left: 40,
        backgroundColor: 'white',
        zIndex: 10,
        ...nstyles.nstyles.shadow
    }

})


const mapStateToProps = state => ({
    listchild: state.listchild
})
export default Utils.connectRedux(WorkBaiKiemTra, mapStateToProps)