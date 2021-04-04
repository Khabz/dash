import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem, Text, Divider } from '@ui-kitten/components'

const ItemImage = (props) => {
    return (
        <Avatar
            {...props}
            size='large'
            source={require("../assets/avatar.png")}
        />
    )
}

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem
            title={evaProps => <Text {...evaProps} style={{ fontWeight: '700', paddingLeft: 8 }}>Display Name</Text>}
            description={evaProps => <Text numberOfLines={1} ellipsizeMode="tail" {...evaProps}>This is a subtitle</Text>}
            accessoryLeft={ItemImage}
            ItemSeparatorComponent={Divider}
        />
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
