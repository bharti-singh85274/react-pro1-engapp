export type RootStackParamList = {

    Splash:undefined;

    Onboarding:undefined;

    Login:undefined;

    Home:undefined;

    Profile:undefined;

    Progress:undefined;

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