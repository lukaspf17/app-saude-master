import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {firebase} from './firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }

    state = {
        username: "",
        password: "",
        errMsg: ""
    }

    onLogin = async () => {

        let result = await firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error){
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Usuário não encontrado. Tente novamente!' })
          })
          .catch((error) => {
              console.log(error)
              return false
          })

        if(result){
            this.props.navigation.navigate('Menu')
        }else{
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Usuário não encontrado. Tente novamente!' })
        }

        console.log('This is login result', result)

       /* if (this.state.username == 'cristina' && this.state.password == '123') {
            this.props.navigation.navigate('Menu')
        } else {
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Usuário não encontrado. Tente novamente!' })
        } */
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25, marginTop: 20 }}>Seja Bem-Vindo!</Text>
                <Text style={{ fontSize: 16, color: 'gray', marginTop: 20 }}>Entre para continuar no app.</Text>

                <Animatable.View
                    ref={this.validateInput}
                >

                    <TextInput
                        style={{ marginTop: 40, borderBottomColor: '#ddd', borderBottonWidth: 1, paddingBottom: 20 }}
                        placeholder="Nome"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ username: text })
                        }
                        }
                    />

                    <TextInput
                        style={{ marginTop: 40, borderBottomColor: '#ddd', borderBottonWidth: 1, paddingBottom: 20 }}
                        placeholder="Senha"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />

                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{this.state.errMsg}</Text>

                </Animatable.View>

                

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                    <TouchableOpacity onPress={() => this.onLogin()} style={{ width: 200, backgroundColor: '#0d47a1', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginTop: 30 }}>

                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16 }}>Entrar</Text>

                    </TouchableOpacity>

                    <Text style={{ marginTop: 20 }}>Esqueceu a senha?</Text>

                    <Text style={{ fontSize: 16, marginTop: 10 }}>Entre pelas Redes sociais:</Text>

                    <View style={{ flexDirection: 'row', marginTop: 60 }}>

                        <View style={{ height: 40, width: 40, borderRadius: 40 / 2, backgroundColor: '#3f51b5', alignItems: 'center', justifyContent: 'center' }}>

                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}> f </Text>
                        </View>


                        <View style={{ height: 40, width: 40, borderRadius: 40 / 2, backgroundColor: '#f44336', marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>

                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}> g </Text>
                        </View>

                        <View style={{ height: 40, width: 40, borderRadius: 40 / 2, backgroundColor: '#1565c0', alignItems: 'center', justifyContent: 'center' }}>

                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}> in </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <Text style={{ color: 'gray' }}>Não tem cadastro?</Text>
                        <Text style={{ fontWeight: 'bold' }}> Cadastre-se</Text>

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20
    }
})