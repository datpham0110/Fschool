
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, Platform, Alert, TouchableOpacity } from 'react-native';
import { nstyles, nColors, heightHed, paddingTopMul } from '../styles/styles';
import Utils from '../app/Utils';
import { Images } from '../images';
import { sizes, colors } from '../styles';

import { nkey } from '../app/keys/keyStore';
import { ROOTGlobal, dataGlobal } from '../app/data/dataGlobal';
import LinearGradient from 'react-native-linear-gradient';
import { nGlobalKeys } from '../app/keys/globalKey';

export default class HeaderCom extends Component {
	constructor(props) {
		super(props);
		var { iconLeft = Images.icBackWhite, iconRight } = props;
		let TempiconLeft = iconLeft;
		this.iconRight = iconRight;
		this.typeLeft = TempiconLeft == Images.icCloseWhite; // is menu or back
		// if (this.iconRight == undefined && this.typeLeft)
		//     this.iconRight = Images.icUser;
		this.iconLeft = TempiconLeft;
		this.nthis = props.nthis == undefined ? nthis : props.nthis;
	}
	_onPressLeftDefault = () => {
		try {
			Utils.goback(this.nthis, null);
		} catch (error) { }
	};

	_onPressRightDefault = () => {
	};

	render() {
		// const { onPressLeft = this._onPressLeftDefault, onPressRight = this._onPressRightDefault,
		//     titleText = '', style = {}, tintColorLeft = nColors.main2, orange = false, notification, customStyleIconRight = {} } = this.props;
		let {
			onPressLeft = this._onPressLeftDefault,
			titleText = '',
			style = {},
			isTransparent = false,
			tintColorLeft = colors.white,
			notification,
			height = heightHed - paddingTopMul,
			titleTextCustoms = undefined,
			customStyleIconRight = colors.white,
			onPressRight = this._onPressRightDefault,
			hiddenIconRight = false,
			titleStyle = {}
		} = this.props;
		height += paddingTopMul;
		//---
		const {
			color = colors.white,
			// colors = (titleText != '' ? nColors.main2 : nColors.main),
			borderBottomWidth = 1
		} = style;
		return (
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				colors={isTransparent ? [colors.nocolor, colors.nocolor] : ['#f8b199', '#f27972']}
				style={[
					nstyles.nhead,
					{ ...style, height: height },
					isTransparent ? { backgroundColor: colors.nocolor } : {}
				]}
			>
				<View style={nstyles.nHcontent}>
					<View style={[nstyles.nHleft, { marginBottom: height - heightHed }]}>
						{this.iconLeft != null ? (
							<TouchableOpacity style={{ paddingLeft: 5 }} onPress={onPressLeft}>
								<Image
									source={this.iconLeft}
									resizeMode="contain"
									style={[
										this.typeLeft ? nstyles.nIcon28 : nstyles.nIcon24,
										{ tintColor: tintColorLeft }
									]}
								/>
							</TouchableOpacity>
						) : null}
					</View>
					{titleTextCustoms ? (
						titleTextCustoms
					) : (
							<View style={[nstyles.nHmid]}>
								{titleText ? (
									<Text numberOfLines={1} style={[nstyles.ntitle, { color }, titleStyle]}>
										{titleText}
									</Text>
								) : null}
							</View>
						)}
					<View style={[nstyles.nHright, { marginBottom: height - heightHed }]}>
						{this.iconRight == Images.icRefresh ? (
							<TouchableOpacity onPress={onPressRight}>
								<Image
									source={this.iconRight}
									resizeMode="contain"
									style={[nstyles.nIcon30, { tintColor: customStyleIconRight }]}
								/>
							</TouchableOpacity>
						) : !hiddenIconRight ? ( //ẩn icon right
							<TouchableOpacity onPress={onPressRight} style={{ marginRight: 8 }}>
								<Image
									source={this.iconRight}
									resizeMode="contain"
									style={[nstyles.nIcon30, { tintColor: 'white' }]}
								/>
								{notification != undefined ? (
									<LinearGradient
										colors={['#2FBACF', '#84D3A5']}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 0 }}
										style={[
											nstyles.nmiddle,
											{
												backgroundColor: colors.blue,
												position: 'absolute',
												height: 18,
												width: 18,
												marginLeft: 15,
												borderRadius: 9,
												marginTop: -5
											}]}>
										<Text style={{ color: 'white', fontSize: sizes.sizes.sText10, fontWeight: '800' }}>
											{notification}
										</Text>
									</LinearGradient>
								) : null}
							</TouchableOpacity>
						) : null}
					</View>
				</View>
			</LinearGradient>
		);
	}
}