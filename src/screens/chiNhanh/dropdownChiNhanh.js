import React, { Component } from "react";
import { colors, sizes } from "../../styles";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList, TextInput, Image,
  ScrollView
} from "react-native";
import Input from "../../components/componentsYSchool/Input";
import { Images } from "../../images";
import ButtonCom from "../../components/Button/ButtonCom";
import { getListChiNhanhV2 } from "../../apis/chiNhanh";
// import { styles } from './styles';
import Utils from "../../app/Utils";
import { nstyles, Height } from "../../styles/styles";
import HeaderCom from "../../components/HeaderCom";
import { fs } from "../../styles/size";
import ListEmpty from "../../components/ListEmpty";
const { width, height } = Dimensions.get("window");
export default class DropDownChiNhanh extends Component {
  constructor(props) {
    super(props);
    searchs = '';
    this.getMaTruong = Utils.ngetParam(this, "getMaTruong", () => { });
    this.state = {
      data: "",
      tenTruong: ''
    };
  }
  componentDidMount() {
    Utils.nlog('--------------------- getListChiNhanhV2')
    this.getData();
  }
  getData = async () => {
    let res = await getListChiNhanhV2();
    if (res.status == 1) {
      this.setState({ data: res.data });
    } else {

    }
  };
  onCancel = () => {
    Utils.goback(this, null);
  };

  _touchItem = item => () => {
    this.getMaTruong(item.MaChiNhanh, item.TenChiNhanh);
    Utils.goback(this, null);
  };
  _renderItemChild = ({ item, index }) => {
    var ColorBrg = colors.white;
    if (index % 2 != 0) {
      ColorBrg = '#e3e1e1';
    }
    return (
      <TouchableOpacity
        onPress={this._touchItem(item)}
        style={{
          borderWidth: 0.5,
          fontSize: fs(24),
          margin: 5,
          padding: 5,
          borderRadius: 4,
          paddingHorizontal: 10,
          backgroundColor: ColorBrg
        }}>
        <Text style={{ marginVertical: 4, fontWeight: '400' }}>
          {item.TenChiNhanh}
        </Text>
        <Text style={{ marginVertical: 4 }}>
          Địa chỉ: {item.DiaChi}
        </Text>
      </TouchableOpacity>
    );
  };

  // searchName = async () => {
  //   let res = await getListChiNhanhV2(search);
  //   Utils.nlog('--------------------- getListChiNhanhV2', res)
  //   if (res.status == 1) {
  //     this.setState({ data: res.data });
  //   } else {
  //     this.setState({ data: [] });
  //   }
  // }

  srearchName = async (search) => {
    searchs = search;
    Utils.nlog('--------------------- search', search)
    let res = await getListChiNhanhV2(search);
    Utils.nlog('--------------------- getListChiNhanhV2', res)
    if (res.status == 1) {
      this.setState({ data: res.data });
    } else {
      this.setState({ data: [] });
    }
  }

  render() {
    return (
      <View
        style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
        <HeaderCom
          nthis={this}
          iconLeft={Images.icbackspace}
          titleText={"Danh sách trường"}
        />
        <View style={nstyles.nbody}>
          <View style={{ backgroundColor: '#d1d1d1', padding: 10 }}>
            <View style={[nstyles.nrow, {
              borderColor: colors.black_60,
              paddingHorizontal: Height(1),
              borderRadius: 2, backgroundColor: 'white',
              paddingVertical: Height(0.3), borderWidth: Height(0.1),
              alignItems: 'center',
            }]}>
              <TouchableOpacity onPress={this.searchName}>
                <Image source={Images.icSearchGrey} resizeMode='contain' style={[nstyles.nIcon16, { tintColor: colors.black_60 }]} />
              </TouchableOpacity>
              <TextInput
                ref={refs => this.inputSearch = refs}
                onChangeText={keyWord => {
                  // searchs = keyWord;
                  this.srearchName(keyWord)
                }
                }
                placeholderTextColor={`${'#d1d1d1'}`}
                style={[nstyles.ntextinput, { flex: 1 }]}
                placeholder='Tìm kiếm'>{searchs}</TextInput>
              {/* {
              this.state.loading ?
                <ActivityIndicator size='small' />
                : <TouchableOpacity onPress={this._clearSearch}>
                  <Image source={Images.icCloseGrey} resizeMode='contain' style={[nstyles.nIcon16, { opacity: 0.5 }]} />
                </TouchableOpacity>
            } */}

              {/* TextInput - cách sử dụng tối ưu ko set lại state mỗi khi TextChange
                         - giá trị vẫn được lưu bằng biến thường 
                         - trường hợp sử dụng lấy giá trị khi nhập xong thì có thể onBLur, onEndEditing,...
                         */}
            </View>
          </View>
          <FlatList
            ListEmptyComponent={<ListEmpty textempty={'Không có dữ liệu'} />}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItemChild}
            data={this.state.data}
            extraData={this.state.id}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View >
    );
  }
}
