import React from "react";

import CourseCard from "../CourseCard";

export default function FeaturedCourseCard({

item,
navigation

}){

return(

<CourseCard

item={item}

progress={0}

onPress={()=>{

navigation.navigate("Course",{

slug:item.slug

});

}}

/>

);

}