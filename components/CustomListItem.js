import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';




const CustomListItem = ({ id, name, enterChat }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => enterChat(id, name)}>
            <ListItem key={id} bottomDivider>
            <Avatar rounded  
                source={require('../assets/logo.png')}
            
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "700" }}>
                    {name}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    Chatroom description
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        </TouchableOpacity>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
})
