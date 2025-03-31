import React from 'react';
import MathFormula from './MathFormula';
import './NaiveBayesExplanation.css';

const NaiveBayesExplanation = () => {
  return (
    <div className="nb-explanation-container">
      <h3>Naive Bayes Classifier Explained</h3>
      
      <div className="explanation-section">
        <h4>The Bayes Theorem</h4>
        <p>
          The Naive Bayes classifier is based on Bayes' theorem, which describes the probability of an event based on prior knowledge of conditions related to the event:
        </p>
        <MathFormula 
          formula="P(C | x) = \\frac{P(x | C) \\cdot P(C)}{P(x)}"
          explanation="This is the Bayes' theorem. P(C|x) is the posterior probability of class C given predictor x. P(x|C) is the likelihood - probability of predictor x given class C. P(C) is the prior probability of class C. P(x) is the prior probability of predictor x."
        />
      </div>
      
      <div className="explanation-section">
        <h4>For Text Classification</h4>
        <p>
          For text classification, we represent a document as a set of features (words) <MathFormula formula="x = (x_1, x_2, ..., x_n)" inline={true} explanation="Vector representation of a document, where each x_i represents the presence or absence of a word." />. We then calculate:
        </p>
        <MathFormula 
          formula="P(C | x_1, x_2, ..., x_n) = \\frac{P(x_1, x_2, ..., x_n | C) \\cdot P(C)}{P(x_1, x_2, ..., x_n)}"
          explanation="The probability of a class given the specific set of words in a document."
        />
        
        <p>
          The "naive" assumption in Naive Bayes is that features are conditionally independent given the class:
        </p>
        <MathFormula 
          formula="P(x_i | C, x_1, x_2, ..., x_{i-1}, x_{i+1}, ..., x_n) = P(x_i | C)"
          explanation="The naive assumption states that the presence of a particular word is unrelated to the presence of any other word, given the class label. This simplification makes the calculation feasible."
        />
        
        <p>
          With this assumption, we can simplify the calculation:
        </p>
        <MathFormula 
          formula="P(C | x) = \\frac{P(C) \\prod_{i=1}^{n} P(x_i | C)}{P(x)}"
          explanation="This simplified formula lets us calculate the probability by multiplying the individual conditional probabilities of each word given the class."
        />
      </div>
      
      <div className="explanation-section">
        <h4>Classification Decision</h4>
        <p>
          Since <MathFormula formula="P(x)" inline={true} explanation="The evidence - probability of seeing this document regardless of class." /> is constant for all classes, the classification rule becomes:
        </p>
        <MathFormula 
          formula="\\hat{C} = \\underset{c}{{\\arg\\max}} \\, P(C=c) \\prod_{i=1}^{n} P(x_i | C=c)"
          explanation="This formula finds the class with the highest probability. We assign the document to the class that maximizes this probability."
        />
        
        <p>
          In practice, we often use log probabilities to avoid numerical underflow:
        </p>
        <MathFormula 
          formula="\\hat{C} = \\underset{c}{{\\arg\\max}} \\, \\log P(C=c) + \\sum_{i=1}^{n} \\log P(x_i | C=c)"
          explanation="Taking the logarithm converts the product into a sum, which is more numerically stable for computation."
        />
      </div>
      
      <div className="explanation-section">
        <h4>Probability Estimation</h4>
        <p>For a binary document-word matrix, we can estimate probabilities as:</p>
        
        <MathFormula 
          formula="P(C=c) = \\frac{\\text{Number of documents in class } c}{\\text{Total number of documents}}"
          explanation="The prior probability of class c is calculated as the proportion of documents belonging to that class in the training data."
        />
        
        <MathFormula 
          formula="P(x_i=1 | C=c) = \\frac{\\text{Number of documents in class } c \\text{ containing word } i}{\\text{Number of documents in class } c}"
          explanation="The conditional probability of word i appearing in class c is calculated as the proportion of documents in class c that contain the word."
        />
        
        <p>To avoid zero probabilities, we typically use Laplace (add-one) smoothing:</p>
        <MathFormula 
          formula="P(x_i=1 | C=c) = \\frac{\\text{Count}(x_i=1, C=c) + 1}{\\text{Count}(C=c) + 2}"
          explanation="Laplace smoothing adds a small count to both numerator and denominator to ensure no probability is exactly zero, which would make the entire product zero."
        />
      </div>
    </div>
  );
};

export default NaiveBayesExplanation;