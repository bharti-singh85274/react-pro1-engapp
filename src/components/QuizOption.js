import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function QuizOption({

    title,

    selected,

    onPress

}){

    return(

        <TouchableOpacity

            onPress={onPress}

            style={{

                backgroundColor:selected
                    ? "#2563EB"
                    :"#fff",

                padding:15,

                marginVertical:8,

                borderRadius:10,

                borderWidth:1,

                borderColor:"#ddd"

            }}

        >

            <Text

                style={{

                    color:selected
                        ?"white"
                        :"black",

                    fontWeight:"600"

                }}

            >

                {title}

            </Text>

        </TouchableOpacity>

    )

}