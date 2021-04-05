import { Input, Layout, Button, Text } from '@ui-kitten/components'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet,TouchableOpacity,View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme from '../theme.json';
import { auth, db } from '../firebase'


const AddChatScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Back To Chats",
            headerBackTitle: "Chats"
        })
    }, []);
    
    const createChat = async() => {
        await db.collection('chatrooms')
        .add({
            name: name
        }).then(() => {
            navigation.goBack();
        }).catch((error) => {
            alert(error);
        })
    }

    const renderIcon = () => {
        return (
            <Feather name='message-circle' size={24} color='grey' />
        )
    }
    return (
        <Layout style={styles.container}>
            <Text style={{ marginBottom: 20, fontSize: 22, fontWeight: '700' }}>Create a new chatroom</Text>
            <Input 
                placeholder="Enter chatroom name"
                accessoryLeft={renderIcon}
                value={name}
                onSubmitEditing={createChat}
                onChangeText={(input) => setName(input)}
            />
            <TouchableOpacity onPress={createChat}>
                <Button style={styles.button}>Create new chat</Button>
            </TouchableOpacity>
        </Layout>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        height: '100%'
    },
    button: {
        backgroundColor: theme.success,
        borderColor: 'white'
    }
})
