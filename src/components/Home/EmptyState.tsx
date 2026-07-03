import React from "react";

import {

View,
Text

} from "react-native";

export default function EmptyState(){

return(

<View

style={{

padding:40,
alignItems:"center"

}}

>

<Text>

No Courses Found

</Text>

</View>

);

}