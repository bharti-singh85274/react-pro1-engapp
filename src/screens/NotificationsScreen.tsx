import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "../constants/colors";

import GradientHeader from "../components/common/GradientHeader";
import InfoCard from "../components/common/InfoCard";

export default function NotificationsScreen(){

return(

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>

<GradientHeader
title="Notifications"
subtitle="Stay updated with your learning journey."
icon="notifications"
/>

<InfoCard
icon="checkmark-circle"
title="You're all caught up!"
description="No new notifications available."
color="#2ECC71"
/>

<InfoCard
icon="alarm"
title="Learning Reminders"
description="Daily reminders will appear here."
/>

<InfoCard
icon="trophy"
title="Achievements"
description="Quiz achievements and XP rewards."
color="#F39C12"
/>

<InfoCard
icon="book"
title="Course Updates"
description="New lessons and courses will appear here."
color="#3563E9"
/>

</ScrollView>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:Colors.background,
padding:20
}

});