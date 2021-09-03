import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default class MainScreen extends React.Component {
    render(){

        this.props.navigation.setOptions({
            headerBackTitle: '',
            headerShow: false
        })

        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
                <Text>Seja Bem-vindo ao Covid+</Text>
                <Button title="Logout" onPress={() => this.props.navigation.navigate('Home')} />
            </View>
        )
    }
}