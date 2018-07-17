import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class ExpandableMenu extends React.Component{
  constructor(props){
        super(props);

        this.state = {
            list       : props.list,
            expanded    : false,
            animation   : new Animated.Value()
        };

        this.state.animation.setValue(40);

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
        this.setState({
            maxHeight   : 250
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : 40
        });
    }

  render() {
    return (
      <Animated.View
                style={[styles.container,{height: this.state.animation}]}>

                <TouchableWithoutFeedback
                  onLayout={this._setMinHeight.bind(this)}
                  style={styles.touchable}
                  onPress={this.toggle.bind(this)}>
                  <View style={styles.touchable}>
                    <Text style={styles.title}> {this.props.title} </Text>
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
      padding: 10,
        overflow:'hidden',
        width: '85%',
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'flex-start',
        margin: 10,
    },
    titleContainer : {
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        fontWeight:'bold',
        textAlign: 'center',
        fontSize: 14,
        height: 30,
    },
    touchable:{
      justifyContent: 'flex-start',
      width: '100%',

    },
    body: {
        padding     : 10,

    }
});
