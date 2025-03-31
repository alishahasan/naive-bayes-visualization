import React, { useEffect, useRef } from 'react';
import './MathFormula.css';

const MathFormula = ({ formula, explanation, inline = false }) => {
  const formulaRef = useRef(null);
  
  useEffect(() => {
    // Function to properly typeset the formula
    const typesetFormula = async () => {
      if (window.MathJax && formulaRef.current) {
        // Make sure MathJax is fully loaded
        if (window.MathJax.typesetPromise) {
          try {
            // Clear existing math first to avoid conflicts
            if (window.MathJax.typesetClear) {
              window.MathJax.typesetClear([formulaRef.current]);
            }
            // Process the math
            await window.MathJax.typesetPromise([formulaRef.current]);
          } catch (error) {
            console.error('MathJax typesetting error:', error);
          }
        }
      }
    };
    
    // Run the typesetting
    typesetFormula();
    
    // Attempt to typeset again if MathJax loads after component
    const timer = setTimeout(typesetFormula, 500);
    return () => clearTimeout(timer);
  }, [formula]);
  
  // Create the raw HTML structure with proper delimiters
  // This properly embeds the formula without escaping issues
  const createMarkup = () => {
    const delimiter = inline ? ['\\(', '\\)'] : ['\\[', '\\]'];
    return { __html: `${delimiter[0]}${formula}${delimiter[1]}` };
  };
  
  return (
    <div className="formula-tooltip-container">
      <div 
        ref={formulaRef} 
        className={`formula ${inline ? 'inline' : 'block'}`}
        dangerouslySetInnerHTML={createMarkup()}
      />
      {explanation && (
        <div className="formula-tooltip">
          {explanation}
        </div>
      )}
    </div>
  );
};

export default MathFormula;