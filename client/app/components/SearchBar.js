/**
 * Created by kiefer on 2017/1/23.
 */
import React, { PropTypes } from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '#2133A7',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius:30
    },
    searchBarInput: {
        flex: 1,
        fontWeight: 'normal',
        color: '#212121',
        backgroundColor: 'transparent',
    },
});

export default class SearchBar extends React.Component {

    static propTypes = {
        height: PropTypes.number.isRequired,
        autoCorrect: PropTypes.bool,
        returnKeyType: PropTypes.string,
        onSearchChange: PropTypes.func,
        onSearch: PropTypes.func,
        placeholder: PropTypes.string,
        padding: PropTypes.number,
        inputStyle: PropTypes.object,
        iconCloseName: PropTypes.string,
        iconSearchName: PropTypes.string,
        iconBackName: PropTypes.string,
        placeholderColor: PropTypes.string,
        iconColor: PropTypes.string
    }

    static defaultProps = {
        onSearchChange: () => {},
        onSearch: () => {},
        inputStyle: {},
        iconCloseName: "md-close",
        iconSearchName: "md-search",
        iconBackName: "md-arrow-back",
        placeholder: "Search...",
        returnKeyType: "search",
        padding: 5,
        placeholderColor: "#bdbdbd",
        iconColor: "#737373"
    }

    constructor(props) {
        super(props);
        this.state = {
            isOnFocus: false,
        };
        this._onBlur = this._onBlur.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    _onClose() {
        this._textInput.setNativeProps({ text: '' });
        this.props.onSearchChange({ nativeEvent: { text : ''}});
        if (this.props.onClose) {
            this.props.onClose();
        }
    }



    _onBlur() {
        this.setState({ isOnFocus: false });
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        this._dismissKeyboard();
    }

    _dismissKeyboard () {
        dismissKeyboard()
    }

    render() {
        const {
            height,
            autoCorrect,
            returnKeyType,
            onSearchChange,
            onSearch,
            placeholder,
            padding,
            inputStyle,
            iconColor,
            iconBackName,
            iconSearchName,
            iconCloseName,
            placeholderColor
            } = this.props;

        let { iconSize } = this.props

        iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.5

        return (
            <View
                onStartShouldSetResponder={this._dismissKeyboard}
                style={{padding: padding}}
            >
                <View
                    style={
            [
              styles.searchBar,
              {

                height: height + 10,
                paddingLeft: height * 0.25,
              },
              inputStyle
            ]
          }
                >

                    <TextInput
                        autoCorrect={autoCorrect === true}
                        ref={(c) => (this._textInput = c)}
                        returnKeyType={returnKeyType}
                        onBlur={this._onBlur}
                        onChangeText={onSearchChange}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        underlineColorAndroid="transparent"
                        style={
              [styles.searchBarInput,
                {
                  paddingLeft: height,
                  fontSize: height * 0.4,
                },
              ]
            }
                    />
                    <TouchableOpacity onPress={this.props.onSearch()}>
                        <View style={{marginLeft:10,paddingRight:10}}>
                            <Icon
                                name={iconSearchName} size={height}
                                color={iconColor}
                            /></View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}