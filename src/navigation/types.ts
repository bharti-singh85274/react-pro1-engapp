export type RootStackParamList = {

  Splash: undefined;

  Onboarding: undefined;

  Login: undefined;

  Signup: undefined;

  MainTabs: undefined;

  Profile: undefined;

  EditProfile: {
    user: any;
  };

  ChangePassword: undefined;

  Course: {
    slug: string;
  };

  Lesson: {
    courseId: number;
    lessonId: number;
  };

  Progress: undefined;

  Quiz: {
    lessonId: number;
  };

  QuizResult: {
    score: number;
    total: number;
    result: any;
    lessonId: number;
  };

  ForgotPassword: undefined;


  Notifications: undefined;

  PrivacyPolicy: undefined;

  About: undefined;

  QuizReview: {
  result: any;
};






};