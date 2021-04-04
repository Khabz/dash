import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import theme from '../theme.json';

import { auth, db } from '../firebase';


const defaultAvatar = "../assets/avatar.png";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])

    const register = () => {
        try {
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                if(user) {
                    user.updateProfile({
                        displayName: name,
                        photoURL: defaultAvatar
                    }).then(function() {
                        console.log(user)
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout style={styles.container}>
            <StatusBar style='auto' />
            <KeyboardAvoidingView behavior="height">
                <Text style={{ marginBottom: 40, marginTop: 80, fontSize: 20, fontWeight: 'bold' }}>Create a Dash account</Text>

                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        placeholder="Display Name"
                        type="text"
                        value={name}
                        onChangeText={(name) => setName(name)}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Enter Your Email Address"
                        type="email"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Enter password"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <Input
                        style={styles.hiddenInput}
                        placeholder="Profile Picture URL"
                        type="text"
                        value={imageUrl}
                        onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                    />
                </View>
                <Button
                    style={styles.button}
                    title="Register"
                    onPress={register}
                >Create an account</Button>
                <View style={{ marginTop: 10, alignSelf: 'center' }}>
                    <Text
                        style={{ fontSize: 13 }}
                    >Already have an account
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: theme.success }} onPress={() => navigation.navigate('Login')}> Sign in</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
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
    input: {
        marginBottom: 10
    },
    hiddenInput: {
        width: 0,
        height: 0
    },    
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: theme.success,
        color: 'white',
        borderColor: 'white'
    }
})

export default RegisterScreen
