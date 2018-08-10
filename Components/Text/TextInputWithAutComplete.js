import React, {Component} from 'react';
import {
    View,
    Animated,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Platform,
} from 'react-native';
import TextInput from './TextInput';
import ItemAddressLite from '../ListItems/ItemAddressLite';
import CommonSeparator from '../Separators/CommonSeparator';
import { Colors } from '../../src/Constants';


export default class TextInputWithAutoComplete extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            expanded: false,
            selected: false,
        }
    }

    animation = new Animated.Value(0.01);
    componentWillUpdate(nextProps,nextState){
        const { expanded } = this.state;
        if(nextProps.data !== this.props.data && !expanded){
            this.toggleDropdown()   
        }
        if(nextState.value === '' && expanded){
            this.toggleDropdown();
        }
    }

    onChangeText = (text) => {
        this.setState({
            value: text,
        }, () => this.props.onChangeText(this.state.value))
    }

    onPressItem = (data) => {
        this.setState({value: data.display_name, selected:true}, () => {
            this.toggleDropdown();
        });
        this.props.onPressItem(data);
    }

    toggleDropdown = () => {
        const { maxHeight , expanded} = this.state;
        const { animation } = this;
        const initialvalue = expanded ? maxHeight:1,
            finalValue = expanded ? 1: maxHeight;
        this.setState({
            expanded: !this.state.expanded,
        })
        animation.setValue(initialvalue);
        Animated.timing(
            animation,
            {toValue:finalValue,
            duration: 150}
        ).start();
    }

    renderListItem = ({item}) => {
        const { house_number,road, suburb, postcode, state} = item.address;
        const title = house_number + ' ' + road;
        const desc = suburb + ', ' + postcode + ', ' +state;
            return (
                <ItemAddressLite 
                    data={item}
                    title={title}
                    desc={desc}
                    onPress={this.onPressItem}
                />
            );
    }

    getMaxHeight = (contentWidth, contentHeight) => {
        const { maxHeight } = this.props;
        if(contentHeight){
            const height = contentHeight>maxHeight?maxHeight:contentHeight;
            this.setState({
                maxHeight: height+20,
            })
        }
    }

    onFocus = () => {
        const { props } = this;
        if(props.data.length > 0){
            this.toggleDropdown();
        }
    }
    onEndEditing = () => {
        if(this.state.expanded && this.state.selected){
            this.toggleDropdown();
        }
    }

    render () {
        const { state, props } = this;
        return(
            <View style={styles.container}>
                    <TextInput 
                        value={this.state.value}
                        placeholder={props.placeholder}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        onEndEditing={this.onEndEditing}
                    />
                    <View>
                        <Animated.View
                            style={[{
                                height: this.animation,
                            },styles.listContainer]}
                            
                        >
                                <FlatList                        
                                    style={[styles.list,{paddingVertical: state.expanded ? 10:0}]}
                                    data={props.data}
                                    onContentSizeChange={this.getMaxHeight}
                                    renderItem={this.renderListItem}
                                    ItemSeparatorComponent={<CommonSeparator />}
                                />
                        </Animated.View>
                    </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:5,
    },
    listContainer:{
        position:'absolute',
        top:0,
        right:5,
        left:5,
        backgroundColor: Colors.backgroundGrey,
    },
    list:{
        paddingHorizontal: 10,
        width:'100%',
        backgroundColor: Colors.backgroundGrey,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        
    }
})



