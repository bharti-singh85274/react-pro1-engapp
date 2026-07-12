import client from "./client";


export const getQuiz = async (lessonId:number)=>{

    const response = await client.get(
        `/lessons/${lessonId}/quiz`
    );

    return response.data;

};



export const submitQuiz = async(
    lessonId:number,
    answers:any
)=>{

    const response = await client.post(
        "/quiz/submit",
        {
            lesson_id: lessonId,
            answers
        }
    );


    return response.data;

};



export const getQuizReview = async (lessonId:number)=>{

    const response = await client.get(
        `/quiz/${lessonId}/review`
    );

    return response.data;

};