import React from 'react';
import './BayesExplanationTransition.css';

const BayesExplanationTransition = () => {
  return (
    <div className="bayes-transition-container">
      <h3>Application to Text Classification</h3>
      
      <p>
        When we apply Bayes' theorem to text classification (like determining if a movie review is positive or negative), 
        we need to calculate specific probabilities from our training data.
      </p>
      
      <h4>Breaking Down the Formula for Text</h4>
      
      <p>For a document with words represented as features x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>:</p>
      
      <ol className="explanation-list">
        <li>
          <strong>Prior Probability P(C)</strong>: The probability of a class before seeing any features
          <ul>
            <li>Example: What's the probability that a randomly selected review is positive?</li>
          </ul>
        </li>
        <li>
          <strong>Likelihood P(x|C)</strong>: The probability of seeing these words given the class
          <ul>
            <li>Example: What's the probability of seeing the word "funny" in positive reviews?</li>
          </ul>
        </li>
        <li>
          <strong>Evidence P(x)</strong>: The overall probability of seeing this combination of words
        </li>
      </ol>
      
      <h4>The Naive Assumption</h4>
      
      <p>
        Naive Bayes makes a simplifying assumption that all features (words) are conditionally independent 
        given the class. This allows us to calculate:
      </p>
      
      <div className="formula-container">
        <p>P(x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub> | C) = P(x<sub>1</sub> | C) × P(x<sub>2</sub> | C) × ... × P(x<sub>n</sub> | C)</p>
      </div>
      
      <p>This dramatically simplifies the calculation while still providing good results for text classification.</p>
      
      <h4>From Theory to Practice</h4>
      
      <p>
        In the feature matrix below, each row represents a document (movie review), and each column represents a 
        word feature. A value of 1 indicates the word is present in the review, while 0 indicates it's absent.
      </p>
      
      <p>Using this data, we can calculate:</p>
      <ul className="explanation-list">
        <li><strong>Prior probabilities</strong>: The proportion of reviews in each class</li>
        <li><strong>Conditional probabilities</strong>: The likelihood of each word appearing in a given class</li>
      </ul>
      
      <p>These probabilities become our model parameters that we use to classify new reviews.</p>
    </div>
  );
};

export default BayesExplanationTransition;