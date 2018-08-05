import React from 'react';
import {
    View,
} from 'react-native';
import { Colors } from '../../src/Constants';

export default CommonSeparator = () => (
    <View 
        style={{
                height: 1,
                width: "90%",
                backgroundColor: Colors.backgroundGrey,
                alignSelf:'flex-end'
        }}
    />
)