import React from 'react';


function QuestionCard({question,selectedOption,onSelectOption}){
return(
    <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-left'>
        <p className='text-lg font-semibold mb-4'>
            {question.text}
        </p>

        <div className='space-y-2'>
            {question.options.map((option,index)=>(
                <label key={index} className='block'>
                    <input type="radio"
                    name={`question-${question.id}`} 
                    checked={selectedOption===index}
                    onChange={()=>onSelectOption(index)}
                    className='mr-2'
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
);
}

export default QuestionCard;