import { Avatar, Layout } from '@ui-kitten/components'
import React, { useLayoutEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';
import theme from '../theme.json';
import { auth, db } from '../firebase' ;

const ChatsScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Dash",
            headerStyle: {
                backgroundColor: theme.success,
                height: 70
            },
            headerTitleStyle: { color: "white", fontWeight: 'bold' },
            headerTintColor: "black",
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 20 }}>
                    <Avatar source={require('../assets/avatar.png')} 
                        style={{ width: 35, height: 35, borderColor: "white", borderWidth: 1 }}
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
    }, [navigation])
    return (
        <Layout>
            <SafeAreaView>
                <ScrollView>
                    <CustomListItem />
                </ScrollView>
            </SafeAreaView>
        </Layout>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})

