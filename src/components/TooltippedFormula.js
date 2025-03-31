import React, { useEffect, useRef } from 'react';
import './TooltippedFormula.css';

const TooltippedFormula = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // Add LaTeX-like font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://cdn.jsdelivr.net/npm/computer-modern@0.1.2/cmu-serif.css';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Initial typesetting when component mounts
    if (window.MathJax && containerRef.current) {
      window.MathJax.typesetPromise([containerRef.current]).catch(err => {
        console.error('MathJax error:', err);
      });
    }
    
    // After MathJax typesetting, add our tooltip elements
    const attachTooltips = () => {
      if (containerRef.current) {
        // Find all the formula spans by their custom data attributes
        const posteriorElement = document.getElementById('posterior-term');
        const likelihoodElement = document.getElementById('likelihood-term');
        const priorElement = document.getElementById('prior-term');
        const evidenceElement = document.getElementById('evidence-term');
        
        // If elements found, add event listeners for tooltip behavior
        if (posteriorElement && likelihoodElement && priorElement && evidenceElement) {
          console.log('Formula elements found, tooltips should be working');
        }
      }
    };
    
    // Allow time for MathJax to render before attaching tooltips
    const timer = setTimeout(() => {
      if (window.MathJax) {
        attachTooltips();
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      // Remove font link on component unmount
      try {
        document.head.removeChild(fontLink);
      } catch (e) {
        // Handle potential error if link was already removed
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="math-container">
      <h3>Naive Bayes Classifier Explained</h3>
      
      <h4>The Bayes Theorem</h4>
      <p>
        The Naive Bayes classifier is based on Bayes' theorem, which describes the 
        probability of an event based on prior knowledge of conditions related to the event.
        Hover over different parts of the formula to learn what they mean:
      </p>
      
      <div className="formula-container">
        {/* Left side of equation */}
        <div className="formula-part" id="posterior-term">
          <span className="formula-display">P(C|x)</span>
          <div className="tooltip-box">
            <span>Posterior Probability</span>
            <p>The probability of class C given the observed features x</p>
          </div>
        </div>
        
        <div className="formula-equals">=</div>
        
        {/* Fraction */}
        <div className="formula-fraction">
          {/* Numerator */}
          <div className="formula-numerator">
            <div className="formula-part" id="likelihood-term">
              <span className="formula-display">P(x|C)</span>
              <div className="tooltip-box">
                <span>Likelihood</span>
                <p>The probability of seeing features x given that the example belongs to class C</p>
              </div>
            </div>
            
            <span className="formula-dot">·</span>
            
            <div className="formula-part" id="prior-term">
              <span className="formula-display">P(C)</span>
              <div className="tooltip-box">
                <span>Prior Probability</span>
                <p>The probability of class C occurring in the training data</p>
              </div>
            </div>
          </div>
          
          {/* Fraction bar */}
          <div className="formula-bar"></div>
          
          {/* Denominator */}
          <div className="formula-denominator">
            <div className="formula-part" id="evidence-term">
              <span className="formula-display">P(x)</span>
              <div className="tooltip-box">
                <span>Evidence</span>
                <p>The probability of features x occurring in the training data across all classes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="formula-instruction">
        <i>Try hovering over P(C|x), P(x|C), P(C), or P(x) to see what each term means!</i>
      </p>
    </div>
  );
};

export default TooltippedFormula;