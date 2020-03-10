import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AppState,
    Image
} from 'react-native';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';
import { Images } from '../images/index';
import { nstyles, nwidth, nheight, nColors, Height, Width } from '../styles/styles';
import { sizes } from '../styles/size';
import { RootLang } from '../app/data/locales';
import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_DIGIT_STYLE = { backgroundColor: '#FAB913' };
const DEFAULT_DIGIT_TXT_STYLE = { color: '#000' };
const DEFAULT_TIME_LABEL_STYLE = { color: '#000' };
const DEFAULT_SEPARATOR_STYLE = { color: '#000' };
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];
const DEFAULT_TIME_LABELS = {
    d: 'Days',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds',
};

export default class CountDown extends React.Component {
    static propTypes = {
        type: PropTypes.number,
        customStyle: PropTypes.object,
        digitStyle: PropTypes.object,
        digitTxtStyle: PropTypes.object,
        timeLabelStyle: PropTypes.object,
        separatorStyle: PropTypes.object,
        timeToShow: PropTypes.array,
        showSeparator: PropTypes.bool,
        size: PropTypes.number,
        until: PropTypes.number,
        onChange: PropTypes.func,
        onPress: PropTypes.func,
        onFinish: PropTypes.func,
    };

    state = {
        until: Math.max(this.props.until, 0),
        lastUntil: null,
        wentBackgroundAt: null,
    };

    constructor(props) {
        super(props);
        this.timer = setInterval(this.updateTimer, 1000);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.until !== nextProps.until) {
            this.setState({
                lastUntil: this.state.until,
                until: Math.max(nextProps.until, 0)
            });
        }
    }

    _handleAppStateChange = currentAppState => {
        const { until, wentBackgroundAt } = this.state;
        if (currentAppState === 'active' && wentBackgroundAt && this.props.running) {
            const diff = (Date.now() - wentBackgroundAt) / 1000.0;
            this.setState({
                lastUntil: until,
                until: Math.max(0, until - diff)
            });
        }
        if (currentAppState === 'background') {
            this.setState({ wentBackgroundAt: Date.now() });
        }
    }

    getTimeLeft = () => {
        const { until } = this.state;
        return {
            seconds: until % 60,
            minutes: parseInt(until / 60, 10) % 60,
            hours: parseInt(until / (60 * 60), 10) % 24,
            days: parseInt(until / (60 * 60 * 24), 10),
        };
    };

    updateTimer = () => {
        const { lastUntil, until } = this.state;

        if (lastUntil === until || !this.props.running) {
            return;
        }
        if (until === 1 || (until === 0 && lastUntil !== 1)) {
            if (this.props.onFinish) {
                this.props.onFinish();
            }
            if (this.props.onChange) {
                this.props.onChange();
            }
        }

        if (until === 0) {
            this.setState({ lastUntil: 0, until: 0 });
        } else {
            if (this.props.onChange) {
                this.props.onChange(until);
            }
            this.setState({ lastUntil: until, until: until - 1 });
        }
    };

    renderDigit = (d) => {
        const { digitStyle, digitTxtStyle, size } = this.props;
        return (
            <View style={[
                styles.digitCont,
                digitStyle,
            ]}>
                <Text style={[
                    styles.digitTxt,
                    { fontSize: size },
                    digitTxtStyle,
                ]}>
                    {d}
                </Text>
            </View>
        );
    };

    renderLabel = label => {
        const { timeLabelStyle, size } = this.props;
        if (label) {
            return (
                <Text style={[
                    styles.timeTxt,
                    { fontSize: size / 1.8 },
                    timeLabelStyle,
                ]}>
                    {label}
                </Text>
            );
        }
    };

    renderDoubleDigits = (label, digits) => {
        return (
            <View style={styles.doubleDigitCont}>
                <View style={styles.timeInnerCont}>
                    {this.renderDigit(digits)}
                </View>
                {this.renderLabel(label)}
            </View>
        );
    };

    renderSeparator = () => {
        const { separatorStyle, size } = this.props;
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.separatorTxt, { fontSize: size * 1.2 }, separatorStyle]}>
                    {':'}
                </Text>
            </View>
        );
    };

    renderCountDown = () => {
        const { timeToShow, timeLabels, showSeparator, style, type } = this.props;
        const { until } = this.state;
        const { days, hours, minutes, seconds } = this.getTimeLeft();
        const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
        const Component = this.props.onPress ? TouchableOpacity : View;

        return (
            <Component
                style={[styles.timeCont, style]}
                onPress={this.props.onPress}
            >
                {timeToShow.includes('D') ? this.renderDoubleDigits(timeLabels.d, newTime[0]) : null}
                {showSeparator && timeToShow.includes('D') && timeToShow.includes('H') ? this.renderSeparator() : null}
                {timeToShow.includes('H') ? this.renderDoubleDigits(timeLabels.h, newTime[1]) : null}
                {showSeparator && timeToShow.includes('H') && timeToShow.includes('M') ? this.renderSeparator() : null}
                {timeToShow.includes('M') ? this.renderDoubleDigits(timeLabels.m, newTime[2]) : null}
                {showSeparator && timeToShow.includes('M') && timeToShow.includes('S') ? this.renderSeparator() : null}
                {timeToShow.includes('S') ? this.renderDoubleDigits(timeLabels.s, newTime[3]) : null}
            </Component>
        );
    };

    render() {
        const { until } = this.state;
        const { type, customStyle } = this.props;
        const { nrow, nIcon29, txtWhite } = nstyles;
        return (
            type == 1 && (until / 86400 <= 4) && until != 0 ?
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F3780C', '#FF4500']} style={{ paddingVertical: 10, paddingHorizontal: 20, ...customStyle }}>
                    <View style={nrow}>
                        <Image source={Images.icTimeTick} style={[nIcon29, { marginTop: 5 }]} resizeMode='contain' />
                        <View style={{ paddingLeft: 10, paddingRight: 30 }}>
                            <Text style={txtWhite}>{RootLang.lang.hurryUp}</Text>
                            <Text style={[txtWhite, { fontSize: sizes.sText12, paddingTop: 5 }]}>{RootLang.lang.reserve}</Text>
                        </View>
                    </View>
                    <Text style={[txtWhite, { fontSize: sizes.sText12, paddingVertical: 5, alignSelf: 'center' }]}>{RootLang.lang.timeUntil}</Text>
                    {this.renderCountDown()}
                </LinearGradient>
                : type == 2 && (until / 86400 >= 4) && until != 0 || type == 2 && (until / 86400 <= 4) && until != 0 ?
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#F3780C', '#FF4500']} style={[nrow, { paddingVertical: 10, paddingHorizontal: Width(2), ...customStyle }]}>
                        <Image source={Images.icTimeTick} style={nIcon29} resizeMode='contain' />
                        <View style={{ paddingLeft: 10, paddingRight: 30 }}>
                            <Text style={[txtWhite, { fontSize: sizes.sText11 }]}>{RootLang.lang.yourdailydealbook}</Text>
                            <View style={[nrow, { alignItems: 'center', marginTop: Height(1) }]}>
                                <Text style={[txtWhite, { fontSize: sizes.sText12 }]}>{RootLang.lang.expirdesin} </Text>
                                {this.renderCountDown()}
                            </View>
                        </View>
                    </LinearGradient>
                    : type == 3 ? this.renderCountDown() : null
        );
    }
}

CountDown.defaultProps = {
    type: 0,
    digitStyle: DEFAULT_DIGIT_STYLE,
    digitTxtStyle: DEFAULT_DIGIT_TXT_STYLE,
    timeLabelStyle: DEFAULT_TIME_LABEL_STYLE,
    timeLabels: DEFAULT_TIME_LABELS,
    separatorStyle: DEFAULT_SEPARATOR_STYLE,
    timeToShow: DEFAULT_TIME_TO_SHOW,
    showSeparator: false,
    until: 1000000,
    size: 15,
    running: true,
    customStyle: {},
};

const styles = StyleSheet.create({
    timeCont: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    timeTxt: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    timeInnerCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitCont: {
        borderRadius: 3,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doubleDigitCont: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    digitTxt: {
        color: 'white',
        fontVariant: ['tabular-nums']
    },
    separatorTxt: {
        backgroundColor: 'transparent',
    },
});