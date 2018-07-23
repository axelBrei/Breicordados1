import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { ItemRaquetLite } from '../ListItems/ItemRaquetaLite';
import ExpandableMenu from './ExpandableMenu';

export default class ExpandableList extends React.Component{
    state = {
        listHeigth: 0,
        selectedData: null,
        data: [],
    }

    componentDidUpdate(prevProps, prevState){
      const { data } = this.props;
        if(prevProps.data.length < data.length){
            this.setState({
                data: data,
                listHeigth:data.length > 0 ? height=25* (data.length + 1):0,
            })
        }
    }

  render() {
    return (
        <ExpandableMenu
             maxHeight={this.props.maxHeight}
             height={this.state.listHeigth}
             style={ this.props.placeholderStyle}
             title={this.props.placeholder}>
            <FlatList
                data={this.state.data}
                getItemLayout={(data, index) => (
                    {length: 50, offset: 50 * index, index}
            )}
                keyExtractor={item => item.id}
                renderItem={this.props.renderItem.bind(this)

            }/>

      </ExpandableMenu>
    );
  }
};


