import React,{useState} from "react";


import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet
} from "react-native";


import {
changePassword
} from "../api/profile";



export default function ChangePasswordScreen({navigation}){



const [currentPassword,setCurrentPassword]=useState("");

const [newPassword,setNewPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");





const submit=async()=>{


try{


const response = await changePassword({

current_password:currentPassword,

new_password:newPassword,

new_password_confirmation:confirmPassword

});



console.log(
response
);



alert(
"Password changed successfully. Please login again."
);



// navigation.goBack();
navigation.reset({

index:0,

routes:[
{
name:"Login"
}
]

});


}
catch(error){


console.log(

error.response?.data ||
error.message

);


alert(
"Password change failed"
);


}



};





return(

<View style={styles.container}>


<Text style={styles.heading}>
Change Password
</Text>




<TextInput

placeholder="Current Password"

secureTextEntry

style={styles.input}

onChangeText={setCurrentPassword}

/>




<TextInput

placeholder="New Password"

secureTextEntry

style={styles.input}

onChangeText={setNewPassword}

/>




<TextInput

placeholder="Confirm New Password"

secureTextEntry

style={styles.input}

onChangeText={setConfirmPassword}

/>




<TouchableOpacity

style={styles.button}

onPress={submit}

>

<Text style={styles.text}>
Change Password
</Text>

</TouchableOpacity>



</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},


heading:{
fontSize:28,
fontWeight:"700",
marginBottom:25
},


input:{
borderWidth:1,
borderColor:"#ddd",
padding:15,
borderRadius:10,
marginBottom:15
},


button:{
backgroundColor:"#2563EB",
padding:15,
borderRadius:10
},


text:{
color:"#fff",
textAlign:"center",
fontWeight:"700"
}

});