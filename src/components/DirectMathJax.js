import React, { useEffect, useRef } from 'react';

// A simplified component that just renders LaTeX directly
const DirectMathJax = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Make sure MathJax is loaded and render the formula
    if (window.MathJax && window.MathJax.typesetPromise && containerRef.current) {
      window.MathJax.typesetPromise([containerRef.current]).catch(err => {
        console.error('MathJax error:', err);
      });
    }
    
    // Retry typesetting after a delay in case MathJax loads late
    const timer = setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise && containerRef.current) {
        window.MathJax.typesetPromise([containerRef.current]).catch(err => {
          console.error('MathJax retry error:', err);
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div ref={containerRef} className="math-container">
      <h3>Naive Bayes Classifier Explained</h3>
      
      <h4>The Bayes Theorem</h4>
      <p>
        The Naive Bayes classifier is based on Bayes' theorem, which describes the 
        probability of an event based on prior knowledge of conditions related to the event:
      </p>
      
      <div className="formula-block">
        {/* Important: Using dangerouslySetInnerHTML to avoid escape sequence issues */}
        <div dangerouslySetInnerHTML={{ __html: '$$P(C | x) = \\frac{P(x | C) \\cdot P(C)}{P(x)}$$' }} />
      </div>
      
      <p>This formula is the foundation of the Naive Bayes classifier.</p>
      
      <h4>For Text Classification</h4>
      <p>When applying this to text, we use the naive assumption that features are independent:</p>
      
      <div className="formula-block">
        <div dangerouslySetInnerHTML={{ __html: '$$P(C | x_1, x_2, ..., x_n) = \\frac{P(C) \\prod_{i=1}^{n} P(x_i | C)}{P(x)}$$' }} />
      </div>
    </div>
  );
};

export default DirectMathJax;