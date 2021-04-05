import { Avatar, Layout } from '@ui-kitten/components'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';
import theme from '../theme.json';
import { auth, db } from '../firebase' ;

const ChatsScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.navigate("Login")
        }).catch((error) => {
            console.log(error)
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: auth.currentUser.displayName,
            headerStyle: {
                backgroundColor: theme.success,
                height: 70
            },
            headerTitleStyle: { color: "white", fontWeight: 'bold' },
            headerTintColor: "black",
            headerLeft: () => (
                <TouchableOpacity
                        onPress={signOut} 
                        activeOpacity={0.5}
                        style={{ marginLeft: 20 }}
                    >
                        <Feather 
                            name='power' 
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >  
                    <TouchableOpacity activeOpacity={0.5}>
                        <Feather 
                            name='search' 
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddChat")} 
                        activeOpacity={0.5}
                    >
                        <Feather 
                            name='message-square' 
                            size={24}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation]);

    const enterChat = (id, name) => {
        navigation.navigate("Chat", {
            id,
            name
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chatrooms').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return unsubscribe
    }, [])
    return (
        <Layout>
            <SafeAreaView>
                <ScrollView style={{ height: '100%' }}>
                        {chats.map(({ id, data: {name} }) => (
                            <CustomListItem key={id} id={id} name={name} enterChat={enterChat}/>
                        ))}
                </ScrollView>
            </SafeAreaView>
        </Layout>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})

