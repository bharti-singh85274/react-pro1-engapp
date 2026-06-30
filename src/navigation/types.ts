export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Home: undefined;
  Profile:undefined,
  Progress: undefined,


  Course: {
    courseId: number;
  };


    Lesson: {
    lesson: {
      id: number;
      title: string;
      content: string;
      video_url: string;
    };
  };
 
};