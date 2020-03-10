import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { nwidth, nheight, Height, Width } from '../../styles/styles';
import Utils from '../../app/Utils';
import HeaderCom from '../../components/HeaderCom';
import { RootLang } from '../../app/data/locales';
import { colors, sizes, nstyles } from '../../styles';
import styles from './styles';
import ChooseItem from './components/ChooseeItem';
import Input from '../../components/Input';
import ButtonCom from '../../components/Button/ButtonCom';
import ReCaptchaView from '../../components/ReCaptchaView';
import { Images } from '../../images/';
import API from '../../apis';
export default class Contact extends Component {
	constructor(props) {
		super(props);
		this.phoneNumber = '';
		this.optional = '';
		this.gcCode = '';
		this.state = {
			touch: false,
			touch2: false,
			urlImg: '',
			phoneCode: ''
		};
	}
	_ChooseItem = (id) => () => {
		if (id == 1) this.setState({ touch: !this.state.touch });
		else this.setState({ touch2: !this.state.touch2 });
	};

	_readMore = () => {};
	_CallMe = () => {};
	_successGC = (code) => (this.gcCode = code);

	_chooseCountry = () => {
		Utils.goscreen(this, 'Modal_SelectCountry', {
			setdataSearch: (data) => this.setState({ phoneCode: data.phoneCode, urlImg: data.flag }),
			isVisiblePhoneCode: true
		});
		// this.props.navigation.navigate('Modal_SelectCountry')
	};
	renderDidYouKnow = () => (
		<View>
			<Text style={[ styles.title, { marginTop: 20 } ]}>2. {RootLang.lang.didyouknow}</Text>
			<Text style={[ styles.text, { marginTop: 10 } ]}>
				{RootLang.lang.wevefoundsomehelpfulrelateinformation}
			</Text>
			<Text style={[ styles.title, { marginTop: 5, fontWeight: 'normal' } ]}>
				{RootLang.lang.hotelcheckinandcheckout}
			</Text>
			<Text onPress={() => this._readMore()} style={[ styles.text2, { marginTop: 5 } ]}>
				{RootLang.lang.readmore}
			</Text>
		</View>
	);
	renderHowCanWeHelpYou = () => (
		<View>
			<Text style={[ styles.title, { marginTop: 20 } ]}>1. {RootLang.lang.howcanwehelpyou}</Text>
			<Text style={[ styles.text, { marginTop: 10 } ]}>{RootLang.lang.defaultcurrencyisthecurrency}</Text>
			<Text style={[ styles.text1, { marginTop: 10 } ]}>{RootLang.lang.chooseatopic}</Text>
			<ChooseItem touch={this.state.touch} onPress={this._ChooseItem(1)} txtItem={'Hotel'} />
			<Text style={[ styles.text1, { marginTop: 10 } ]}>{RootLang.lang.chooseatopic}</Text>
			<ChooseItem touch={this.state.touch2} onPress={this._ChooseItem(2)} txtItem={'Change & Cancel'} />
		</View>
	);
	renderStillNeedHelp = () => (
		<View>
			<Text style={[ styles.title, { marginTop: 20 } ]}>3. {RootLang.lang.stillneedhelp}</Text>
			<Text style={[ styles.text, { marginTop: 10 } ]}>{RootLang.lang.waittimeislessthan5minutes}</Text>
			<Text style={[ styles.text1, { marginTop: 20, fontWeight: '500' } ]}>{RootLang.lang.phoneNumber}</Text>
			<View style={[ nstyles.nstyles.nrow, { alignItems: 'center' } ]}>
				<ChooseItem
					type={2}
					textChange={this.state.phoneCode == '' ? RootLang.lang.choosecountry : this.state.phoneCode}
					urlImg={this.state.urlImg}
					onPress={this._chooseCountry}
				/>
				<View style={{ flex: 1, marginLeft: 10 }}>
					<Input placeholder={RootLang.lang.phoneNumber} onChange={(text) => (this.phoneNumber = text)} />
				</View>
			</View>
			<Text style={[ styles.text1, { marginTop: 20, fontWeight: '500' } ]}>{RootLang.lang.itinerarynumber}</Text>
			<Input placeholder={RootLang.lang.optional} onChange={(text) => (this.optional = text)} />
		</View>
	);

	render() {
		return (
			// ncontainerX support iPhoneX, ncontainer + nfooter mới sp iphoneX
			<View style={nstyles.nstyles.ncontainer}>
				{/* Header  */}
				<HeaderCom iconLeft={Images.icBackWhite} nthis={this} />
				{/* BODY */}
				<View style={nstyles.nstyles.nbody}>
					<ScrollView>
						<View style={{ backgroundColor: colors.paleGreyThree, padding: 20 }}>
							<Text style={[ styles.title, { color: colors.colorSoftBlue } ]}>
								{RootLang.lang.contactus}
							</Text>
						</View>
						<View style={{ paddingHorizontal: 20 }}>
							{this.renderHowCanWeHelpYou()}
							{this.renderDidYouKnow()}
							{this.renderStillNeedHelp()}
							<ReCaptchaView
								defaultHeight={100}
								siteKey="6LeVKXwUAAAAANMPpX8WnIbX82of5yoNw-H8kedu"
								url="http://in-frontend.bookve.com.vn"
								onSuccess={this._successGC}
								// onError={() => {
								//     alert('Error');
								// }}
								// onExpired={() => {
								//     alert('Expired');
								// }}
							/>
							<ButtonCom
								text={RootLang.lang.callme}
								style={{ backgroundColor: colors.softBlue, marginTop: 20 }}
								onPress={() => {}}
							/>
							<Text onPress={this._readMore} style={[ styles.text2, { marginTop: 20 } ]}>
								{RootLang.lang.youcancallusat}
							</Text>
							<Text style={[ styles.text2, { marginTop: 10, color: 'black' } ]}>
								Local (toll-free): 1-999-1211
							</Text>
							<Text style={[ styles.text2, { marginTop: 10, color: 'black', marginBottom: 20 } ]}>
								From abroad (charges apply): +1 1278 282899 99
							</Text>
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}
