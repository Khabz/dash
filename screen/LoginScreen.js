import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { auth } from '../firebase';

const logo = "https://www.flaticon.com/svg/vstatic/svg/1041/1041916.svg?token=exp=1617490756~hmac=f4aefd2fd44279cacc3df34ee637356f";

const LoginScreen = ({ navigation }) => {
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home")
            }
        });

        return unsubscribe; 

    }, [])
    
    const signIn = () => {

    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />
            <Image source={{
                uri: "http://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    leftIcon={{ type: 'feather', name: 'mail', color: 'grey', size: 18 }}
                    placeholder="Enter your email address"
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    leftIcon={{ type: 'feather', name: 'lock', color: 'grey', size: 18 }}
                    placeholder="Enter your password" 
                    secureTextEntry 
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 300,
        marginTop: 10
    }
})

export default LoginScreen
