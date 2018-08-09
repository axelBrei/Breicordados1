import React, {Component} from 'react';
import {
    View,
    Animated,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import TextInput from './TextInput';
import ItemAddressLite from '../ListItems/ItemAddressLite';
import CommonSeparator from '../Separators/CommonSeparator';
import { Colors } from '../../src/Constants';


export default class TextInputWithAutoComplete extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            expanded: false,
        }
    }

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

    onPressItem = (title,data) => {
        this.setState({value: title}, () => {
            this.toggleDropdown();
        });
        this.props.onPressItem(data);
    }

    getMaxHeight = () => {
        const { maxHeight , data} = this.props;
        const { expanded } = this.state;
        const listheight = 50 * (data.length +1);
        if(data.length > 0 && expanded){
            return listheight >= maxHeight ? maxHeight : listheight;
        }else{
            return 1;
        }
    }

    toggleDropdown = () => {
        this.setState({
            expanded: !this.state.expanded,
        })
    }

    renderListItem = ({item}) => {
        const title = item.display_name ? item.display_name:'';
        // const desc = item.postalCode ? item.locality +','+item.postalCode:'';
        // if(item.streetNumber){
            return (
                <ItemAddressLite 
                    data={item}
                    title={title}
                    onPress={this.onPressItem}
                />
            );
        
    }

    render () {
        const { state, props } = this;
        const listHeight = state.expanded ? this.getMaxHeight(): 1;
        return(
            <View style={styles.container}>
                <View >
                    <TextInput 
                        value={this.state.value}
                        placeholder={props.placeholder}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <View>
                        <FlatList
                            style={[styles.listContainer,
                                {
                                    height: listHeight,
                                    paddingVertical: state.expanded ? 10:0
                                }]}
                            data={props.data}
                            renderItem={this.renderListItem}
                            ItemSeparatorComponent={<CommonSeparator />}
                        />

                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        // zIndex:1,
    },
    listContainer:{
        position:'absolute',
        top:0,
        right:5,
        left:5,
        backgroundColor: Colors.backgroundGrey,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    list:{
        paddingHorizontal: 10,
        width:'100%',
        
    }
})



