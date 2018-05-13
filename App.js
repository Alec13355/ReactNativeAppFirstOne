import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CustomButton from './components/custombutton.js';
import { NavigatorIOS, Text, View,ScrollView,WebView,SectionList} from 'react-native';
import Style from './components/Style';
import InputButton from './components/InputButton';
export default class NavigatorIOSApp extends React.Component {

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'My Initial Scene',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
    this._onForward1 = this._onForward1.bind(this);
    this._onForward2 = this._onForward2.bind(this);
  }

  _onForward() {
   let nextIndex = ++nextIndex;
      this.props.navigator.push({
        component: ReactCalculator,
        title: 'Calculator',
        passProps: {index: nextIndex},
      });
  }
  _onForward1() {
   let nextIndex = ++nextIndex;
      this.props.navigator.push({
        component: Developer,
        title: 'Meet The Developer',
        passProps: {index: nextIndex},
      });
  }
  _onForward2() {
   let nextIndex = ++nextIndex;
      this.props.navigator.push({
        component: SectionListBasics,
        title: 'Contact List',
        passProps: {index: nextIndex},
      });
  }

  render() {
    return (
      <ScrollView>
      <View>
        <CustomButton
          onPress= {this._onForward}
          text="Take me to the calculator"
        />
        <Text style={Style.spacing}></Text>
        <CustomButton
          onPress= {this._onForward1}
          text="Take me to the developer"
        />
      <Text style={Style.spacing}></Text>
      <CustomButton
        onPress= {this._onForward2}
        text="Take me to the contact list"
      />

    </View>
      </ScrollView>
    );
  }
}

class SectionListBasics extends Component {
  render() {
    return (
      <View style={Style.container}>
        <SectionList
          sections={[
            {title: 'A', data: ['Alec']},
            {title: 'B', data: ['Bill','Bob','Bobbie']},
            {title: 'E', data: ['Employer']},
            {title: 'H', data: ['Harper','Harry','Hayden','Henry','Hunter',]},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
            {title: 'Z', data: ['Zane']},
          ]}
          renderItem={({item}) => <Text style={Style.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={Style.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

class Developer extends React.Component {

  render(){
    return(

        <View style={{flex:1}}>
        <View style={{paddingTop:70}}></View>
        <WebView
           automaticallyAdjustContentInsets={false}
           source={{uri: 'https://github.com/Alec13355'}}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           decelerationRate="normal"
           startInLoadingState={true}
           />
       </View>
    );
  }

}

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+'],
    ['c', 'ce']
];
class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        };

        this.state = this.initialState;
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        );
    }

    _renderInputButtons() {

        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return <InputButton
                            value={buttonVal}
                            highlight={this.state.selectedSymbol === buttonVal}
                            onPress={this._onInputButtonPressed.bind(this, buttonVal)}
                            key={'butt-' + columnIdx} />;
            });

            return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input);
            default:
                return this._handleStringInput(input);
        }
    }

    _handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;

        this.setState({
            inputValue: inputValue
        });
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;

            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;

            case 'ce':
                this.setState(this.initialState);
                    break;

            case 'c':
                this.setState({inputValue: 0});
                break;

        }
    }

}
