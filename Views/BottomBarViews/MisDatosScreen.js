import React from 'react';
import FloatingActionButton from '../../Components/Main/FloatingActionButton';
import { ic_add } from '../../Images/Images';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import ExpandableInput from '../../Components/NewOrder/ExpandableInput';

export default class MisDatosScreen extends React.Component{
  // static navigationOptions = ({ navigation }) => {
  //   const params = navigation.state.params || {};
  //   return {
  //     headerRight:
  //       Platform.OS === 'ios' ? (
  //         <TouchableOpacity onPress={ () => { navigation.navigate('AgregarPedido') }}>
  //           <View>
  //             <Image source={ic_add} style={{height: 20,width: 20, resizeMode: 'contain', marginRight: 20, tintColor: 'orange'}}/>
  //           </View>
  //         </TouchableOpacity>
  //       ): (<View></View>)
  //   };
  // };

  onPressAdd(){
    this.props.navigation.navigate('AgregarPedido')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>


        <SafeAreaView style={styles.floatingActionView}>
        <FloatingActionButton source={ic_add}
          onPress={this.onPressAdd.bind(this)}/>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{

    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  floatingActionView:{
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
