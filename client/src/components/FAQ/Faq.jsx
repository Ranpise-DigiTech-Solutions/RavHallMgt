import React, { useState } from 'react';
import './faq.scss'; // Import your CSS file here

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {[1, 2, 3, 4, 5].map((index) => (
          <div className="accordion-item" key={index}>
            <button
              id={`accordion-button-${index}`}
              aria-expanded={activeIndex === index ? 'true' : 'false'}
              onClick={() => toggleAccordion(index)}
            >
              <span className="accordion-title">
                {index === 1 && 'What Are The Types Of Events That Can Be Hosted At This Venue?'}
                {index === 2 && 'Why is the sky blue?'}
                {index === 3 && 'Will we ever discover aliens?'}
                {index === 4 && 'How much does the Earth weigh?'}
                {index === 5 && 'How do airplanes stay up?'}
              </span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className="accordion-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse
                potenti.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
