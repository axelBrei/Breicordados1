import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { ItemRaquetLite } from '../ListItems/ItemRaquetaLite';


export default class ExpandableMenu extends React.Component{
  constructor(props){
        super(props);

        this.state = {
            list       : props.list,
            title: this.props.title,
            expanded    : false,
            animation   : new Animated.Value(),
        };
        this.toggle = this.toggle.bind(this);

        this.state.animation.setValue(45);

    }

    componentDidUpdate(prevProps, prevState){
      if (prevProps.title !== this.props.title ) {
        this.toggle()
      }
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
      const { maxHeight , height} = this.props;
        let heigth;
        this.props.height > maxHeight ? heigth = maxHeight: heigth = height;
        this.setState({
            maxHeight   : heigth
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : 50
        });
    }

    onPressItem(text){
      this.setState({title: text});
      this.toggle()
    }

  render() {
    return (
      <Animated.View
                style={[styles.container,{height: this.state.animation}]}>

                <TouchableWithoutFeedback
                  onLayout={this._setMinHeight.bind(this)}
                  onPress={this.toggle.bind(this)}>
                  <View style={styles.touchable}>
                    <Text style={[this.props.style,{paddingTop:8}]}> {this.props.title} </Text>
                  </View>
                </TouchableWithoutFeedback>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                {this.props.children}

                </View>

            </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    container   : {
        overflow:'hidden',
        width: '100%',
        flexDirection: 'column',
        borderRadius: 15,
        display: 'flex',
    },

    touchable:{
      justifyContent: 'center',
        alignItems:'center',
    },
    body: {
        marginStart:40,
        marginEnd:40,
    }
});
