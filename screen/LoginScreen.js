import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import theme from '../theme.json';

import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerOptions:'none'
        });

        const unsubscribe =  auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Chats")
            }
        });

        return unsubscribe; 

    }, [])
    
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(error);
        })
    }

    return (
        <Layout style={styles.container}>
            <StatusBar style='auto' />
            <Image source={require("../assets/logo.png")}
            style={{ width: 80, height: 80, marginBottom: 20, marginTop: 70 }}
            />
            <Text style={{ marginBottom: 20, fontSize: 20 }}>Sign in to your account</Text>
            <View style={styles.inputContainer}>
                <Input 
                    style={{ marginBottom: 10 }}
                    placeholder="Enter your email address"
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input
                    placeholder="Enter your password" 
                    secureTextEntry 
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
            </View>
            <Button style={styles.button} onPress={signIn} >Login</Button>
            <View style={{ marginTop: 10 }}>
                <Text 
                    style={{ fontSize: 13 }}
                >Don't have an account yet?
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.success }} onPress={() => navigation.navigate('Register')}> Sign up</Text>
                </Text>
            </View>
            <View style={{ height: 100 }} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: theme.success,
        borderColor: 'white'
    }
})

export default LoginScreen
