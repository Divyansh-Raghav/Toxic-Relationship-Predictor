import React,{useState} from 'react'
import QuestionCard from './components/QuestionCard'
// import './App.css'

const questions=[
  {
    id:1,
    text:'1. Does the person you like constantly belittle or insults you ?',
    options:['Never','Sometimes','Often','Always'],
  },
  {
   id: 2,
    text: "2. Do you feel anxious or afraid around them?",
    options: ["No", "A little", "Yes", "All the time"],
  },
   {
    id: 3,
    text: "3. Are you blamed for things that aren't your fault?",
    options: ["Rarely", "Occasionally", "Often", "Yes, always"],
  },
   {
    id: 4,
  text: "4. Does your partner control where you go or who you talk to?",
  options: ["Not at all", "Rarely", "Sometimes", "Very often"],
  },
  {
    id: 5,
  text: "5. Do you feel like you have to hide things from your partner out of fear?",
  options: ["Not at all", "Rarely", "Sometimes", "Very often"],
  },
  {
  id: 6,
  text: "6. Do you feel emotionally drained after interacting with your partner?",
  options: ["Not at all", "A little", "Quite a bit", "Completely exhausted"],
}
]

function App() {
  const [currQuestion,setCurrQuestion]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [showResult,setShowResult]=useState(false);

  const handleAnswer=(optionIndex)=>{
    const updatedAnswer=[...answers];
    updatedAnswer[currQuestion]=optionIndex;
    setAnswers(updatedAnswer);
  }
  const nextQuestion=()=>{
    if(currQuestion < questions.length-1)
      setCurrQuestion(currQuestion + 1);
  };

  const prevQuestion=()=>{
    if(currQuestion >0) setCurrQuestion(currQuestion-1);
  }

  const handleSubmit=()=>{
    setShowResult(true);
  }

  const resetQuiz=()=>{
    setAnswers([]);
    setCurrQuestion(0);
    setShowResult(false);
  }

  const totalScore=answers.reduce((acc,val)=> acc+val,0);

  const getToxicityLevel = () => {
  if (totalScore <= 2) {
    return {
      level: "Healthy 💚",
      message: "Your relationship looks fine!",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    };
  } else if (totalScore <= 5) {
    return {
      level: "Concerning ⚠️",
      message: "There are signs of issues.",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    };
  } else {
    return {
      level: "Toxic 💔",
      message: "Please seek help. This looks toxic.",
      bgColor: "bg-red-300",
      textColor: "text-red-700",
    };
  }
};


  return (
    <div className='min-h-screen bg-red-100 flex flex-col items-center justify-center p-6'>
      <h1 className='text-4xl font-bold text-red-700 mb-4'>
        💔 Toxic Relationship Predictor
      </h1>

    {!showResult ? (<>
    
        <QuestionCard 
      question={questions[currQuestion]}
      selectedOption={answers[currQuestion]}
      onSelectOption={handleAnswer}
    />

    <div className='flex justify-between mt-6 w-full max-w-xl'>
      
      <button onClick={prevQuestion} disabled={currQuestion===0} className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50'>
        Previous
      </button>
      

        {currQuestion===questions.length-1 ? 
        (
           <button onClick={handleSubmit}  className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50'>
        Submit
      </button>
        ):(
        <button onClick={nextQuestion} disabled={currQuestion===questions.length-1} className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50'>
        Next
      </button>
          )}
         </div>
         
    </>): (
      <div className={`p-6 rounded-lg shadow-md w-full max-w-xl text-center ${getToxicityLevel().bgColor}`}>

        <h2 className='text-2xl font-bold mb-4'>
          Your Result:
        </h2>
        <p className={`text-xl font-semibold ${getToxicityLevel().textColor}`}>
          {getToxicityLevel().level}
        </p>
        <p className='text-gray-700 mt-2'>
          {getToxicityLevel().message}
        </p>
        <button onClick={resetQuiz} className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800'> Try Again</button>
      </div>
    )}
    
    
    </div>
  )
}

export default App
