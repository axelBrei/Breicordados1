import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

export default class EditdataModal extends React.Component{
    state = {
        modalVisible: this.props.visible,
        text:'',
    }


    sendValueToParent(){
        this.props.getModaltext(
            this.props.placeholder.toLowerCase(),
            this.state.text
        );
    }

    render() {
        const { placeholder } = this.props;
        return(
                <Modal
                    style={styles.bottomModal}
                    transparent={true}
                    onBackdropPress={this.props.onCloseButton}
                    isVisible={this.props.visible}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.text}>Ingrese un nuevo {placeholder.toLowerCase()}</Text>
                        <TextInput 
                        style={styles.textInput}
                        onChangeText={(text)=> this.setState({text})}
                        placeholder={placeholder.toLowerCase()}/>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.sendValueToParent.bind(this)}>
                                <View > 
                                    <Text>Aceptar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={this.props.onCloseButton}>
                                <View> 
                                    <Text>Cerrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        )
    }
}

const styles = {
    bottomModal:{
        margin: 0, 
        flex:1, 
        bottom: 0, 
        position: 'absolute',
        height:'30%',
        width: '100%',
        justifyContent:'flex-end',
    },
    modalContent:{
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        flex:1,
    },
    text:{
        fontSize:25,
        marginTop:0,
        textAlign:'center',
    },
    textInput:{
        margin:10,
        fontSize:16,
        borderBottomWidth:1,
        width:'80%',
        textAlign:'center',
        borderColor: '#A8A0A0',
    },
    buttonsContainer:{
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:0,
    },
    button:{
        borderRadius:10,
        width:'50%',
        height:40,    
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        marginTop:15,
    }
}