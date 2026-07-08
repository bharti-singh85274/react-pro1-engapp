import React,{useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet
} from "react-native";


import {
updateProfile
} from "../api/profile";



export default function EditProfileScreen({route,navigation}){


const user = route.params?.user;



const [name,setName]=useState(
user?.name || ""
);


const [email,setEmail]=useState(
user?.email || ""
);




const saveProfile=async()=>{


try{


const response = await updateProfile({

name:name,

email:email

});



console.log(
"UPDATE RESPONSE",
response
);



// alert(
// "Profile updated successfully"
// );

navigation.goBack();

}
catch(error){


console.log(
"UPDATE ERROR",
error.response?.data || error.message
);


}



};



return(

<View style={styles.container}>


<Text style={styles.heading}>
Edit Profile
</Text>



<TextInput

value={name}

onChangeText={setName}

placeholder="Name"

style={styles.input}

/>



<TextInput

value={email}

onChangeText={setEmail}

placeholder="Email"

style={styles.input}

/>



<TouchableOpacity

style={styles.button}

onPress={saveProfile}

>

<Text style={styles.text}>
Update Profile
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