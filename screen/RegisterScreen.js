import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import theme from '../theme.json';

import { auth } from '../firebase';


const defaultAvatar = "https://www.flaticon.com/svg/vstatic/svg/1177/1177568.svg?token=exp=1617498324~hmac=6519f1263552a4393fd27622191601a9";

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
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || defaultAvatar,

                })
            })
            .catch((error) => alert(error.message))
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
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Enter Your Email Address"
                        type="email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Enter password"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
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
    button: {
        width: 300,
        marginTop: 10,
        backgroundColor: theme.success,
        color: 'white',
        borderColor: 'white'
    }
})

export default RegisterScreen
