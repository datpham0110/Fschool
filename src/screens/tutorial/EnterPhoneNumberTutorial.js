import React, { Component } from 'react';

import {
    Image,
    Dimensions,
    Animated
} from "react-native"
const { width, height } = Dimensions.get("window")
import { Images } from '../../images';
import { colors, sizes } from "../../styles";

export default class EnterPhoneNumberTutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000
            }
        ).start();
    }
    render() {
        const opacity = this.state.fadeAnim;
        return (
            <Animated.View style={{
                width: width, height: height, position: 'absolute', opacity, alignItems: 'center', justifyContent: 'center'
            }}>
                <Image resizeMode='contain' source={Images.fillPhone} style={{ width: width * 0.8, height: width * 0.5 }} />
            </Animated.View>
        );
    }

}