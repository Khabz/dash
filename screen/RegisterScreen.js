import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { auth } from '../firebase';


const defaultAvatar = "https://www.flaticon.com/svg/vstatic/svg/1177/1177568.svg?token=exp=1617498324~hmac=6519f1263552a4393fd27622191601a9";

const RegisterScreen = ({ navigation }) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ imageUrl, setImageUrl ] = useState("");

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
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>Create a Dash account</Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Display Name" 
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)} 
                />
                <Input 
                    placeholder="Enter Your Email Address" 
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    placeholder="Enter password" 
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)} 
                />
                <Input 
                    placeholder="Profile Picture" 
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button 
                containerStyle={styles.button}
                raised 
                title="Register" 
                onPress={register} 
            />
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

export default RegisterScreen
