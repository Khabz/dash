import { Layout } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../theme.json';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chatrooms').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("");
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chatrooms")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
        return unsubscribe;
    }, [route]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name,
            headerStyle: {
                backgroundColor: theme.success,
                height: 70
            },
            headerTitleStyle: { color: "white", fontWeight: 'bold' },
            headerTintColor: "white",
        })
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            {messages.map(({ id, data }) => (
                                data.email = auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Text style={{ fontWeight: "700", marginBottom: 5 }}>{data.displayName}</Text>
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ): (
                                    <View key={id} style={styles.sender}>
                                        <Text style={{ fontWeight: "700", marginBottom: 5 }}>{data.displayName}</Text>

                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder="Type message"
                                value={input} onChangeText={(input) => setInput(input)}
                                onSubmitEditing={sendMessage}
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={20} color={theme.success} />
                            </TouchableOpacity>
                        </View>

                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 10
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    }
})
