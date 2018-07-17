import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import BottomBarButton from './BottomBarButton';
import { ic_settings, ic_racket, ic_order , ic_string, ic_history } from '../../Images/Images';

export default class BottomNavigation extends React.Component{

  datosClick(buttonText){
    this.props.navigation.navigate(buttonText);
  }
  renderBotones(routes, index){
    const icons = [ic_order ,ic_string ,ic_racket, ic_history, ic_settings];
    const buttons = [];
    for (var i = 0; i < routes.length; i++) {
      const color = index === i ? 'orange':'grey';
        buttons.push(
          <BottomBarButton
          source={icons[i]}
          text={routes[i].key}
          color={color}
          onClick={this.datosClick.bind(this)}/>
        );
    }
    return buttons;
  }

  render() {
    const { routes, index } = this.props.navigation.state;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderBotones(routes,index)}
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#A8A0A0',
    backgroundColor: '#F7F7F7',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
