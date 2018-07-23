import React from "react";
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'

export default class ItemCuerdaLite extends React.Component{
    onPressCell(){
        this.props.onPress(this.props.cuerda);
    }

    render() {
        const { cuerda } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={this.onPressCell.bind(this)}>
                    <View>
                        <Text>{`${cuerda.marca} ${cuerda.nombre} ${cuerda.grosor}mm`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}