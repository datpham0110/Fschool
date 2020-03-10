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
import YouTube from 'react-native-youtube';
// import { styles } from './styles';
import Utils from "../../app/Utils";
import { nstyles, Height } from "../../styles/styles";
import HeaderCom from "../../components/HeaderCom";
import { fs } from "../../styles/size";
const { width, height } = Dimensions.get("window");
export default class PlayVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }

    render() {
        return (
            <View
                style={[nstyles.ncontainerX, { backgroundColor: colors.white }]}>
                {/* <YouTube
                    videoId="KVZ-P-ZI6W4" // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300 }}
                /> */}
            </View>
        );
    }
}
