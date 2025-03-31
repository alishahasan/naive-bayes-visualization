import React, { useState, useEffect } from 'react';
import './InteractiveDataMatrix.css';
import CustomDataTable from './CustomDataTable';

const InteractiveDataMatrix = ({ data }) => {
  // State to track which row/formula is being hovered
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Extract unique words from all reviews to create column headers
  const getUniqueWords = () => {
    const allWords = new Set();
    data.forEach(item => {
      const words = item.review.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
      words.forEach(word => allWords.add(word));
    });
    return Array.from(allWords).sort();
  };
  
  const uniqueWords = getUniqueWords();
  
  // Create the binary feature matrix
  const createFeatureMatrix = () => {
    return data.map(item => {
      const words = item.review.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
      const row = {};
      
      // Add classification as the first property
      row.classification = item.classification;
      
      // Then add all word features
      uniqueWords.forEach(word => {
        row[word] = words.includes(word) ? 1 : 0;
      });
      
      return {
        ...row,
        _original: item // Keep original data for reference
      };
    });
  };
  
  const featureMatrix = createFeatureMatrix();
  
  // Calculate probability values (thetas) for each class
  const calculateThetas = () => {
    // Get unique classifications
    const classes = [...new Set(data.map(item => item.classification))];
    
    // Calculate prior probabilities for each class
    const priors = {};
    classes.forEach(cls => {
      priors[cls] = data.filter(item => item.classification === cls).length / data.length;
    });
    
    // Calculate conditional probabilities for each word given each class
    const conditionals = {};
    
    classes.forEach(cls => {
      conditionals[cls] = {};
      
      // Documents in this class
      const docsInClass = data.filter(item => item.classification === cls);
      const numDocsInClass = docsInClass.length;
      
      uniqueWords.forEach(word => {
        // Count docs in this class where word appears
        const docsWithWord = docsInClass.filter(item => {
          const words = item.review.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
          return words.includes(word);
        });
        
        // Laplace smoothing to avoid zero probabilities
        conditionals[cls][word] = (docsWithWord.length + 1) / (numDocsInClass + 2);
      });
    });
    
    return { priors, conditionals };
  };
  
  const { priors, conditionals } = calculateThetas();
  
  // Handle hovering over theta formulas or matrix rows
  const handleMouseEnter = (type, index, word, cls, value = 1) => {
    setHoveredItem({ type, index, word, cls, value });
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Check if a matrix row should be highlighted
  const shouldHighlightRow = (rowIdx, cls) => {
    if (!hoveredItem) return false;
    
    // For prior probability, highlight only rows of the specific class
    if (hoveredItem.type === 'prior' && hoveredItem.cls === cls) {
      return true;
    }
    
    // For conditional probability, don't highlight entire rows
    // We'll highlight only specific cells instead
    return false;
  };
  
  // Check if a specific cell should be highlighted
  const shouldHighlightCell = (rowIdx, cls, word) => {
    if (!hoveredItem) return false;
    
    // When hovering over a conditional probability for a word in a class,
    // highlight ALL cells in that column that belong to that class
    if (hoveredItem.type === 'conditional' && 
        cls === hoveredItem.cls && 
        word === hoveredItem.word) {
      return true;
    }
    
    return false;
  };
  
  // Check if a theta formula should be highlighted
  const shouldHighlightFormula = (type, word, cls, value = 1) => {
    if (!hoveredItem) return false;
    
    if (hoveredItem.type === type && 
        hoveredItem.word === word && 
        hoveredItem.cls === cls &&
        hoveredItem.value === value) {
      return true;
    }
    
    if (hoveredItem.type === 'row' && hoveredItem.cls === cls) {
      if (type === 'prior') return true;
      if (type === 'conditional' && word === hoveredItem.word && value === hoveredItem.value) return true;
    }
    
    return false;
  };
  
  // Format matrix data for the custom data table component
  const formatMatrixForDataTable = () => {
    return featureMatrix.map((row, index) => {
      // Preserve exactly what we need for highlighting
      const { _original, ...rest } = row;
      return rest;
    });
  };
  
  // Generate formulas for both P(x=1|C) and P(x=0|C)
  const generateConditionalFormulas = (cls, wordProbs) => {
    const formulas = [];
    
    Object.entries(wordProbs).forEach(([word, prob], idx) => {
      // Formula for word=1 (the one we already have)
      formulas.push({
        word: word,
        value: 1,
        prob: prob,
        idx: idx
      });
      
      // Formula for word=0 (the complementary probability)
      formulas.push({
        word: word,
        value: 0,
        prob: 1 - prob, // Probability of word NOT appearing
        idx: idx
      });
    });
    
    return formulas;
  };
  
  // Format number as percentage
  const formatPercent = (num) => {
    return (num * 100).toFixed(1) + '%';
  };
  
  return (
    <div className="interactive-container">
      <h3>Naive Bayes Probabilities and Data Matrix</h3>
      
      {/* Feature Matrix - Full width at the top */}
      <div className="data-matrix-section">
        <h4>Feature Matrix</h4>
        <div className="matrix-container">
          <CustomDataTable 
            data={formatMatrixForDataTable()} 
            centerAlign={true}
            hoveredItem={hoveredItem}
            onCellHover={handleMouseEnter}
          />
        </div>
      </div>
      
      {/* Probability Formulas - Below the matrix */}
      <div className="probabilities-section">
        {/* Prior Probabilities */}
        <div className="probability-container">
          <h4>Prior Probabilities</h4>
          <div className="probability-list">
            {Object.entries(priors).map(([cls, prob], idx) => (
              <div 
                key={idx}
                className={`probability-item ${shouldHighlightFormula('prior', null, cls) ? 'highlighted-formula' : ''}`}
                onMouseEnter={() => handleMouseEnter('prior', idx, null, cls)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="formula">
                  <span className="formula-text">P(C = {cls})</span>
                  <span className="formula-equals">=</span>
                  <span className="formula-result">{formatPercent(prob)}</span>
                  <span className="formula-theta">
                    =: π<sub>{cls === 'Positive' ? '1' : '2'}</sub>
                  </span>
                </div>
                <div className="formula-tooltip">
                  Prior probability: The proportion of documents with class {cls} in the training data
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conditional Probabilities - Now in two columns */}
        <h4>Conditional Probabilities</h4>
        <div className="conditional-probabilities-container">
          {Object.entries(conditionals).map(([cls, wordProbs]) => (
            <div key={cls} className="conditional-class-column">
              <h5>For Class: {cls}</h5>
              <div className="probability-list compact-probability-list">
                {generateConditionalFormulas(cls, wordProbs).map((formula, idx) => (
                  <div 
                    key={idx}
                    className={`probability-item ${shouldHighlightFormula('conditional', formula.word, cls, formula.value) ? 'highlighted-formula' : ''}`}
                    onMouseEnter={() => handleMouseEnter('conditional', formula.idx, formula.word, cls, formula.value)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="formula">
                      <span className="formula-text">P(x<sub>{uniqueWords.indexOf(formula.word) + 1}</sub> = {formula.value} | C = {cls})</span>
                      <span className="formula-equals">=</span>
                      <span className="formula-result">{formatPercent(formula.prob)}</span>
                      <span className="formula-theta">
                        =: θ<sub>{uniqueWords.indexOf(formula.word) + 1},{cls === 'Positive' ? '1' : '2'},{formula.value}</sub>
                      </span>
                    </div>
                    <div className="formula-tooltip">
                      Conditional probability: The likelihood of "{formula.word}" {formula.value === 1 ? 'appearing' : 'not appearing'} in class {cls}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="instruction">
        <i>Hover over any probability formula to highlight related data in the matrix, or hover over matrix rows to see related probabilities.</i>
      </p>
    </div>
  );
};

export default InteractiveDataMatrix;