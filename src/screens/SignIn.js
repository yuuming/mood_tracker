import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
@inject('rootStore')
@observer
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmedPassword: '',
            isSignUpMode: false,
        };
    }

    switchMode = () => {
        this.setState({ isSignUpMode: !this.state.isSignUpMode });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Email</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    enablesReturnKeyAutomatically
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Text style={styles.textStyle}>Password</Text>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry
                />
                {this.state.isSignUpMode ?
                    <View>
                        <Text style={styles.textStyle}>Confirm Password</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(confirmedPassword) => this.setState({ confirmedPassword })}
                            value={this.state.confirmedPassword}
                            secureTextEntry
                            enablesReturnKeyAutomatically
                            textContentType='password'
                        />
                    </View> :
                    null
                }
                <TouchableOpacity>
                    <View style={styles.signInButtonStyle}>
                        <Text>{this.state.isSignUpMode ? 'Sign Up' : 'Sign In'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.touchableTextStyle}>Forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.switchMode}>
                    <Text style={styles.touchableTextStyle}>
                        {this.state.isSignUpMode ? 'Ready to sign in?' : 'Wanna create an account?'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    textStyle: {
        marginLeft: 30,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 16
    },
    textInputStyle: {
        marginLeft: 30,
        marginTop: 5,
        height: 30,
        width: (width / 6) * 5,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    signInButtonStyle: {
        marginLeft: 30,
        marginTop: 15,
        height: 40,
        width: (width / 6) * 5,
        backgroundColor: '#F4C2A6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    touchableTextStyle: {
        marginLeft: 30,
        marginTop: 10,
        textAlign: 'left',
        fontWeight: '300',
        fontSize: 14
    }
});
