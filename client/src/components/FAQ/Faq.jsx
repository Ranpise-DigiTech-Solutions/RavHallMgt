import React, { useState } from 'react';
import './faq.scss';

// Default questions and answers
const defaultQuestions = [
  { question: 'What Are The Types Of Events?', answer: 'You can host a variety of events including weddings, corporate meetings, and private parties.' },
  { question: 'Why is the sky blue?', answer: 'The sky appears blue to the human eye because the short waves of blue light are scattered more than other colors by the gases and particles in the Earth\'s atmosphere.' },
  { question: 'Will we ever discover aliens?', answer: 'The existence of extraterrestrial life is still a matter of speculation and ongoing research.' },
  { question: 'How much does the Earth weigh?', answer: 'The Earth has a mass of approximately 5.97 x 10^24 kilograms.' },
  { question: 'How do airplanes stay up?', answer: 'Airplanes stay aloft due to the aerodynamic force generated by the wings, known as lift, which counteracts the force of gravity.' },
];

const FAQ = ({ questions = defaultQuestions }) => {
  console.log('Received questions:', questions);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq__container">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {questions.map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              id={`accordion-button-${index}`}
              aria-expanded={activeIndex === index ? 'true' : 'false'}
              onClick={() => toggleAccordion(index)}
            >
              <span className="accordion-title">{item.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            {activeIndex === index && (
              <div className="accordion-content">
                 <p>{item.answer.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Set default questions as default props
FAQ.defaultProps = {
  questions: defaultQuestions,
};

export default FAQ;
