import React, { Component } from "react"
import Utils from "../../app/Utils"
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput, Dimensions
} from "react-native"
import { nstyles, nheight, nwidth } from "../../styles/styles"
import { nGlobalKeys } from "../../app/keys/globalKey"
import { reSize } from "../../styles/size"
import HeaderCom from "../../components/HeaderCom"
import { Images } from "../../images"
import { loadmes, sendmes, ListTinNhanGroup, TaoTinNhanGroup } from "../../apis/chat"
import ListEmpty from "../../components/ListEmpty"
import Moment from "moment"
class Chat extends Component {
  constructor(props) {
    super(props)
    nthisApp = this;
    this._reloadDataBack = Utils.ngetParam(this, "_reloadDataBack", () => { });
    this.flagChatGroup = Utils.ngetParam(this, "flagChatGroup");
    this.IdLop = Utils.ngetParam(this, "IdLop");
    this.TenLop = Utils.ngetParam(this, "TenLop");
    this.flagNotify = Utils.ngetParam(this, "flagNotify", false);
    this.IdTaiKhoan = Utils.ngetParam(this, 'IdTaiKhoan');
    this.IDGiaoVien = Utils.ngetParam(this, 'IDGiaoVien');
    this.DataGroupChat = Utils.ngetParam(this, 'DataGroupChat', '');
    this.state = {
      dataSource: [],
      IDGiaoVien: this.props.navigation.state.params.IDGiaoVien,
      FullName: this.props.navigation.state.params.FullName,
      msgtext: "",
      issending: false,
      sizeInput: 0,
      maxRowID: 0,
      minRowID: 0,
      titleNameShow: ''
    }
    this.count = 10;
    this.listMes = {}
    this.flag = false
    this.rowId = Utils.getGlobal(nGlobalKeys.rowId, '');
    this.IdCN = Utils.getGlobal(nGlobalKeys.IdCN, "")
    this.IDKHDPS = Utils.getGlobal(nGlobalKeys.IDKHDPS);
    this.dataChatSimpleNotify = Utils.ngetParam(this, 'dataChatSimpleNotify');
    this.dataChatSimple = Utils.ngetParam(this, 'dataChatSimple');
    this.dataChatGroupNotify = Utils.ngetParam(this, 'dataChatGroupNotify');
    this.dataAll = Utils.ngetParam(this, 'dataAll')
  }

  componentDidMount() {
    Utils.nlog('--------------------------this.DataGroupChatthis.DataGroupChatthis.DataGroupChat', this.dataChatSimpleNotify)
    Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, 'chatDetail')
    if (this.flagNotify == true) {
      //Notify
      if (this.flagChatGroup == false) {
        // Không phải chat group
        for (let i = 0; i < this.props.listchild.length; i++) {
          if (this.props.listchild[i].IDKhachHang == this.dataChatSimpleNotify.IDKhachHang) {
            Utils.setGlobal(nGlobalKeys.childSelected, this.props.listchild[i]);
            break;
          }
        }
        Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, '')
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdKhachHang, this.dataChatSimpleNotify.IDKhachHang)
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdTaiKhoan, this.dataChatSimpleNotify.IDTaiKhoan)
      }
      else {
        //Chat group
        Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, this.dataChatGroupNotify.IdGroup)
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleID, '')
      }
    } else {
      //Không phải nôìy
      if (this.flagChatGroup == false) {
        Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, '')
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdKhachHang, this.dataChatSimple.IDKhachHang)
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdTaiKhoan, this.dataChatSimple.IdTaiKhoan)
      } else {
        if (this.DataGroupChat.IdLop == 0) {
          //Group tự tạo
          Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, this.DataGroupChat.IdChatGroup)
        } else {
          //Group class
          Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, this.DataGroupChat.IdLop)
        }
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdKhachHang, '')
        Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdTaiKhoan, '')
      }
    }
    this.setNameShow();
    this.loadMesInterval(-1)
    var intervalId = setInterval(this.timer, 1000)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    try {
      clearInterval(this.state.intervalId)
    } catch (error) { }
    Utils.setGlobal(nGlobalKeys.isFocusGroupChatID, '')
    Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdKhachHang, '')
    Utils.setGlobal(nGlobalKeys.isFocusChatSimpleIdTaiKhoan, '')
    Utils.setGlobal(nGlobalKeys.screenChatDetailSelected, '')
  }
  setNameShow = () => {
    if (this.flagNotify == true) {
      if (this.flagChatGroup == true) {
        if (this.dataChatGroupNotify.IdGroup != 0) {
          this.setState({
            titleNameShow: this.dataChatGroupNotify.TenGroup
          })
        } else {
          this.setState({ titleNameShow: this.TenLop })
        }
      } else {
        this.setState({ titleNameShow: this.dataAll.TenNguoiGui })
      }
    } else {
      if (this.flagChatGroup == true) {
        if (this.DataGroupChat.IdChatGroup != 0) {
          this.setState({
            titleNameShow: this.DataGroupChat.TenChatGroup
          })
        } else {
          this.setState({ titleNameShow: this.TenLop })
        }
      } else {
        this.setState({ titleNameShow: this.state.FullName })
      }
    }
  }
  scrollToEnd = () => {
    if (this.state.dataSource.length != 0)
      this.listView.scrollToIndex({ index: 0, animated: true })
  }
  _goBack = () => {
    this._reloadDataBack(true)
    Utils.goback(this)
  }

  timer = () => {
    this.loadMesInterval(-1)
  }
  _formatDate = list => {
    for (let i = 0; i < list.length - 1; i++) {
      var datenow = new Date(list[i].CreatedDate)
      var dateback = new Date(list[i + 1].CreatedDate)
      if (datenow.getDate() == dateback.getDate()) {
        list[i].flag = false
      } else {
        list[i].flag = true
      }
    }
    return list
  }

  loadMesInterval = async flag => {
    // Chat nhóm
    if (Utils.getGlobal(nGlobalKeys.flagDataChat, false) == true) {
      this.count = 10;
      Utils.setGlobal(nGlobalKeys.flagDataChat, false)
    }
    if (this.count == 10) {
      if (this.flagChatGroup == false) {
        let res;
        if (this.flagNotify == true) {
          res = await loadmes(this.dataChatSimpleNotify.IDKhachHang, this.IDGiaoVien, flag, this.dataChatSimpleNotify.IDChiNhanh) //Notifu cation
        } else {
          let childSelected = Utils.getGlobal(nGlobalKeys.childSelected)
          res = await loadmes(childSelected.IDKhachHang, this.IDGiaoVien, flag, this.dataChatSimple.IDChiNhanh)
        }
        if (res.success) {
          //Có dữ liệu trả về
          if (flag == -1) {
            if (this.flag == false) {
              if (res.data.GhiChuData != null) {
                // Lần đầu load list
                this.listMes = res.data.GhiChuData
                let max = res.data.GhiChuData.length - 1
                this.setState({ maxRowID: res.data.GhiChuData[0].RowID, minRowID: res.data.GhiChuData[max].RowID, dataSource: this._formatDate(this.listMes) })
                this.flag = true
              }
            } else {
              // Những lần sau load list
              if (res.data.GhiChuData[0].RowID > this.state.maxRowID) {
                for (let i = res.data.GhiChuData.length - 1; i >= 0; i--) {
                  if (res.data.GhiChuData[i].RowID > this.state.maxRowID) {
                    this.listMes.unshift(res.data.GhiChuData[i])
                  }
                }
                this.setState({ maxRowID: res.data.GhiChuData[0].RowID, dataSource: this._formatDate(this.listMes) })
              }
            }
          } else {
            if (res.data.GhiChuData != null) {
              this.listMes = this.listMes.concat(res.data.GhiChuData)
              let minn = res.data.GhiChuData.length - 1
              let min = res.data.GhiChuData[minn].RowID
              this.setState({ dataSource: this._formatDate(this.listMes), minRowID: min })
            }
          }
        }
      } else {
        //Chat group
        let RowID = Utils.getGlobal(nGlobalKeys.rowId)
        let res;
        if (this.flagNotify == true) {
          if (this.dataChatGroupNotify.LoaiChat == 2) {
            // Group chat lop
            res = await ListTinNhanGroup(this.dataChatGroupNotify.Value.IDChiNhanh, this.IDKHDPS, this.dataChatGroupNotify.IdGroup, RowID, flag, 1)
            Utils.nlog('loadmes', res)
          } else {
            // Group chat tự tạo
            res = await ListTinNhanGroup(this.dataChatGroupNotify.Value.IDChiNhanh, this.IDKHDPS, this.dataChatGroupNotify.IdGroup, RowID, flag, 2)
            Utils.nlog('loadmes', res)
          }
        } else {
          if (this.DataGroupChat.IdChatGroup != 0) {
            res = await ListTinNhanGroup(this.DataGroupChat.IDChiNhanh, this.IDKHDPS, this.DataGroupChat.IdChatGroup, RowID, flag, 2)
          } else {
            res = await ListTinNhanGroup(this.DataGroupChat.IDChiNhanh, this.IDKHDPS, this.IdLop, RowID, flag, 1)
          }
        }
        if (res.success) {
          //Có dữ liệu trả về
          if (flag == -1) {
            if (this.flag == false) {
              if (res.data.GroupChat != null) {
                // Lần đầu load list
                this.listMes = res.data.GroupChat
                let max = res.data.GroupChat.length - 1
                this.setState({ dataSource: this._formatDate(this.listMes), minRowID: res.data.GroupChat[max].RowID, maxRowID: res.data.GroupChat[0].RowID })
                this.flag = true
              }
            } else {
              // Những lần sau load list
              if (res.data.GroupChat[0].RowID > this.state.maxRowID) {
                for (let i = res.data.GroupChat.length - 1; i >= 0; i--) {
                  if (res.data.GroupChat[i].RowID > this.state.maxRowID) {
                    this.listMes.unshift(res.data.GroupChat[i])
                  }
                }
                this.setState({ maxRowID: res.data.GroupChat[0].RowID })
                this.setState({ dataSource: this._formatDate(this.listMes) })
              }
            }
          } else {
            if (res.data.GroupChat != null) {
              this.listMes = this.listMes.concat(res.data.GroupChat)
              let minn = res.data.GroupChat.length - 1
              let min = res.data.GroupChat[minn].RowID
              this.setState({ dataSource: this._formatDate(this.listMes), minRowID: min })
            }
          }
        }
      }
      this.count = 0;
    } else {
      this.count++;
    }

  }

  loadMesMore = async flag => {
    // Chat nhóm
    if (this.flagChatGroup == false) {
      let res;
      if (this.flagNotify == true) {
        res = await loadmes(this.dataChatSimpleNotify.IDKhachHang, this.IDGiaoVien, flag, this.dataChatSimpleNotify.IDChiNhanh)
      } else {
        // this.IdTaiKhoan, 
        res = await loadmes(this.dataChatSimple.IDKhachHang, this.IDGiaoVien, flag, this.dataChatSimple.IDChiNhanh)
      }
      if (res.success) {
        //Có dữ liệu trả về
        if (flag == -1) {
          if (this.flag == false) {
            if (res.data.GhiChuData != null) {
              // Lần đầu load list
              this.listMes = res.data.GhiChuData
              let max = res.data.GhiChuData.length - 1
              this.setState({ maxRowID: res.data.GhiChuData[0].RowID, minRowID: res.data.GhiChuData[max].RowID, dataSource: this._formatDate(this.listMes) })
              this.flag = true
            }
          } else {
            // Những lần sau load list
            if (res.data.GhiChuData[0].RowID > this.state.maxRowID) {
              for (let i = res.data.GhiChuData.length - 1; i >= 0; i--) {
                if (res.data.GhiChuData[i].RowID > this.state.maxRowID) {
                  this.listMes.unshift(res.data.GhiChuData[i])
                }
              }
              this.setState({ maxRowID: res.data.GhiChuData[0].RowID, dataSource: this._formatDate(this.listMes) })
            }
          }
        } else {
          if (res.data.GhiChuData != null) {
            this.listMes = this.listMes.concat(res.data.GhiChuData)
            let minn = res.data.GhiChuData.length - 1
            let min = res.data.GhiChuData[minn].RowID
            this.setState({ dataSource: this._formatDate(this.listMes), minRowID: min })
          }
        }
      }
    } else {
      //Chat group
      let RowID = Utils.getGlobal(nGlobalKeys.rowId)
      let res;
      if (this.flagNotify == true) {
        if (this.dataChatGroupNotify.LoaiChat == 2) {
          res = await ListTinNhanGroup(this.dataChatGroupNotify.Value.IDChiNhanh, this.IDKHDPS, this.dataChatGroupNotify.IdGroup, RowID, flag, 1)
        } else {
          // Group chat tự tạo
          res = await ListTinNhanGroup(this.dataChatGroupNotify.Value.IDChiNhanh, this.IDKHDPS, this.dataChatGroupNotify.IdGroup, RowID, flag, 2)
        }
      } else {
        if (this.DataGroupChat.IdChatGroup != 0) {
          res = await ListTinNhanGroup(this.DataGroupChat.IDChiNhanh, this.IDKHDPS, this.DataGroupChat.IdChatGroup, RowID, flag, 2)
        } else {
          res = await ListTinNhanGroup(this.DataGroupChat.IDChiNhanh, this.IDKHDPS, this.IdLop, RowID, flag, 1)
        }
      }
      if (res.success) {
        //Có dữ liệu trả về
        if (flag == -1) {
          if (this.flag == false) {
            if (res.data.GroupChat != null) {
              // Lần đầu load list
              this.listMes = res.data.GroupChat
              let max = res.data.GroupChat.length - 1
              this.setState({ dataSource: this._formatDate(this.listMes), minRowID: res.data.GroupChat[max].RowID, maxRowID: res.data.GroupChat[0].RowID })
              this.flag = true
            }
          } else {
            // Những lần sau load list
            if (res.data.GroupChat[0].RowID > this.state.maxRowID) {
              for (let i = res.data.GroupChat.length - 1; i >= 0; i--) {
                if (res.data.GroupChat[i].RowID > this.state.maxRowID) {
                  this.listMes.unshift(res.data.GroupChat[i])
                }
              }
              this.setState({ maxRowID: res.data.GroupChat[0].RowID })
              this.setState({ dataSource: this._formatDate(this.listMes) })
            }
          }
        } else {
          if (res.data.GroupChat != null) {
            this.listMes = this.listMes.concat(res.data.GroupChat)
            let minn = res.data.GroupChat.length - 1
            let min = res.data.GroupChat[minn].RowID
            this.setState({ dataSource: this._formatDate(this.listMes), minRowID: min })
          }
        }
      }
    }

  }

  sendmes = async () => {
    if (this.state.msgtext.trim().length == 0) {
    } else {
      let mess = this.state.msgtext.trim()
      this.setState({ msgtext: "" })
      if (this.flagNotify == true) {
        if (this.flagChatGroup == true) {
          if (this.dataChatGroupNotify.LoaiChat == 2) {
            //Chat group default
            let res = await TaoTinNhanGroup(mess, this.dataChatGroupNotify.IdGroup, 1, this.dataChatGroupNotify.Value.IDChiNhanh)
            if (res.success == true) {
              this.count = 10;
            }
            return;
          } else {
            //Chat group create 
            let res = await TaoTinNhanGroup(mess, this.dataChatGroupNotify.IdGroup, 2, this.dataChatGroupNotify.Value.IDChiNhanh)
            if (res.success == true) {
              this.count = 10;
            }
            return;
          }
        } else {
          let res = await sendmes(this.state.IDGiaoVien, mess, this.dataChatSimpleNotify.IDChiNhanh)
          if (res.success == true) {
            this.count = 10;
          }
        }
      } else {
        if (this.flagChatGroup == true) {
          if (this.DataGroupChat.IdChatGroup != 0) {
            let res = await TaoTinNhanGroup(mess, this.DataGroupChat.IdChatGroup, 2, this.DataGroupChat.IDChiNhanh)
            if (res.success == true) {
              this.count = 10;
            }
          } else {
            let res = await TaoTinNhanGroup(mess, this.IdLop, 1, this.DataGroupChat.IDChiNhanh)
            if (res.success == true) {
              this.count = 10;
            }
          }
        } else {
          let res = await sendmes(this.state.IDGiaoVien, mess, this.dataChatSimple.IDChiNhanh)
          if (res.success == true) {
            this.count = 10;
          }
        }
      }

    }
  }
  render() {
    Moment.locale("en")
    return (
      <KeyboardAvoidingView style={styles.ncontain} behavior={Platform.OS === "ios" ? "padding" : null}>
        <View style={[nstyles.ncontainerX, { flex: 1, flexDirection: "column" }]}>
          <HeaderCom iconLeft={Images.icbackspace} nthis={this} titleText={this.state.titleNameShow} onPressLeft={this._goBack} />
          <View style={[styles.nbody, { backgroundColor: 'white' }]} onLayout={this.setScroll}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={[styles.ncontenchat]}
              ref={listView => {
                this.listView = listView
              }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              data={this.state.dataSource}
              onEndReached={() => {
                if (this.state.minRowID !== false) {
                  this.loadMesMore(this.state.minRowID)
                }
              }}
              onEndReachedThreshold={0.25}
              ListEmptyComponent={<ListEmpty textempty="Bạn chưa có tin nhắn nào với người này." />}
              inverted
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {item.flag == true ? (<Text style={[styles.ntext, styles.ntextDay]}>{Utils.formatDate(item.CreatedDate, 'DD/MM/YYYY', true)}  </Text>) : null}
                    {
                      this.flagChatGroup == true ? item.IdNguoiTao == this.rowId ? (
                        <View style={styles.nmsgRep}>
                          <View style={styles.nboxRep}>
                            <Text style={[styles.ntext, styles.ntextmsgRep]}>{item.NoiDung} </Text>
                            {item.CreatedDate !== "" ? (<Text style={[styles.ntext, styles.ntextmsgRep, styles.ntexttime]}>{Utils.formatDate(item.CreatedDate, 'HH:mm', true)} </Text>) : null}
                          </View>
                        </View>) :
                        (
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={Images.imgProfile}
                              resizeMode="contain"
                              style={styles.imgaeAvatarGroup}
                            />
                            <View style={{ flexDirection: 'column' }}>
                              <View style={{ flex: 1 }}>
                                <Text style={{ marginHorizontal: 5, marginVertical: 5 }}>{item.TenNguoiTao}</Text>
                              </View>
                              <View style={styles.nmsgSend}>
                                <View style={styles.nboxSend}>
                                  <Text style={[styles.ntext, styles.ntextmsgSend]}>{item.NoiDung}</Text>
                                  {item.CreatedDate !== "" ? (<Text style={[styles.ntext, styles.ntextmsgSend, styles.ntexttime]}> {Utils.formatDate(item.CreatedDate, 'HH:mm', true)}  </Text>) : null}
                                </View>
                                <View style={styles.nspace} />
                              </View>
                            </View>

                          </View>
                        )
                        :
                        item.Isclient === true ? (
                          <View style={styles.nmsgRep}>
                            <View style={styles.nboxRep}>
                              <Text style={[styles.ntext, styles.ntextmsgRep]}>{item.NoiDung} </Text>
                              {item.CreatedDate !== "" ? (<Text style={[styles.ntext, styles.ntextmsgRep, styles.ntexttime]}>{Utils.formatDate(item.CreatedDate, 'HH:mm', true)} </Text>) : null}
                            </View>
                          </View>) :
                          (<View style={styles.nmsgSend}>
                            <View style={styles.nboxSend}>
                              <Text style={[styles.ntext, styles.ntextmsgSend]}>{item.NoiDung}</Text>
                              {item.CreatedDate !== "" ?
                                (<Text style={[styles.ntext, styles.ntextmsgSend, styles.ntexttime]} > {Utils.formatDate(item.CreatedDate, 'HH:mm', true)}</Text>) : null}
                            </View>
                            <View style={styles.nspace} />
                          </View>
                          )
                    }
                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false} />
          </View>
          <View style={[nstyles.ncol]}>
            <View
              style={{ height: this.state.sizeInput - 30, borderColor: "#C0C0C0", borderWidth: 0.5 }} >
              <View style={styles.nboxinput}>
                <TextInput
                  style={[styles.ntextinput, { flex: 1, textAlignVertical: "top" }]}
                  onChangeText={text => {
                    this.state.msgtext = text
                    if (text.length < 5) { this.setState({}) }
                  }}
                  placeholder="Tin nhắn..."
                  autoCorrect={false}
                  multiline={true}
                  onContentSizeChange={event => {
                    if (50 + event.nativeEvent.contentSize.height < nheight * 0.3)
                      if (this.state.sizeInput !=
                        50 + event.nativeEvent.contentSize.height
                      ) {
                        this.setState({
                          sizeInput: 50 + event.nativeEvent.contentSize.height
                        })
                      }
                  }} underlineColorAndroid="rgba(0,0,0,0)">
                  {this.state.msgtext}
                </TextInput>
                <TouchableOpacity onPress={() => this.sendmes()} disabled={this.state.issending} >
                  <Image style={[styles.nicon2, { marginRight: 15 }]} source={require("../../images/imgApp/icSendBig.png")} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }

}

const styles = StyleSheet.create({
  ncontain: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF"
  },
  nbody: {
    flex: 1,
    marginLeft: 6,
    marginRight: 6
  },
  ntext: {
    color: "#193B59",
    fontSize: 16
  },
  nicon2: {
    resizeMode: "contain",
    height: 30,
    width: 30,
    marginLeft: 10
  },
  ncontenchat: {
    flex: 1
  },
  nmsgRep: {
    width: nwidth - 70,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    padding: 3
  },
  nmsgSend: {
    width: nwidth - 50,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    padding: 3
  },
  nboxRep: {
    padding: 8,
    minWidth: 60,
    backgroundColor: "#4080FF",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  nboxSend: {
    padding: 8,
    backgroundColor: "#F1F0F0",
    minWidth: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  ntextmsgRep: {
    color: "#FCFDFF",
    fontWeight: "600"
  },
  ntextmsgSend: {},
  ntexttime: {
    fontSize: 11,
    fontWeight: "400",
    marginTop: 5,
    marginLeft: 5
  },
  nspace: {
    padding: 5
  },
  nboxinput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  ntextinput: {
    color: "black",
    fontSize: 17,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  ntextDay: {
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "#C0C0C0",
    margin: 8
  },
  imgaeAvatarGroup: {
    width: reSize(30),
    height: reSize(32),
    // borderColor: colors.paleGrey,
    borderRadius: reSize(32)
  },

})
const mapStateToProps = state => ({
  listchild: state.listchild
})
export default Utils.connectRedux(Chat, mapStateToProps)
