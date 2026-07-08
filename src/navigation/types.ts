export type RootStackParamList = {

    Splash:undefined;

    Onboarding:undefined;

    Login:undefined;

    MainTabs: undefined;

    Profile:undefined;

    Progress:undefined;

    EditProfile:undefined;
   
    ChangePassword:undefined;

    Course:{
        slug:string;
    };

    Lesson:{
        lessonId:number;
    };

    Quiz:{
        lessonId:number;
    };

    QuizResult:{
        result:any;
    };

};