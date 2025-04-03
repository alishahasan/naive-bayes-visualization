# Naive Bayes Classifier Visualization

A React-based educational tool that visualizes how Naive Bayes classification works through an interactive interface.

## Introduction

This project serves as an educational visualization of the Naive Bayes algorithm applied to text classification, specifically focused on sentiment analysis of movie reviews. The tool demonstrates how the algorithm uses word frequencies to classify text as positive or negative.

The visualization focuses on a simplified sentiment analysis task: classifying movie reviews as positive or negative based on the presence or absence of specific words (features). For example, the presence of words like "funny" might indicate a positive review, while words like "boring" might indicate a negative one.

### Assumptions
The visualization makes several key assumptions to simplify the learning experience:

**Balanced Dataset Example**: The visualization uses a small, manually balanced sample dataset to demonstrate concepts clearly, rather than a large, potentially imbalanced real-world corpus.
**Pre-selected Features**: The words/features shown are pre-selected for their predictive power rather than using automated feature selection techniques.
**No Smoothing Visualization**: The basic visualization doesn't explicitly show Laplace smoothing or other techniques used in production Naive Bayes models to handle zero probabilities.
**Binary Classification**: The model only distinguishes between positive and negative sentiment, rather than handling multiple classes.
Educational Focus: Emphasis is placed on clarity of the underlying concepts rather than computational efficiency or classification accuracy.

## Technical Stack

- **React**: Frontend framework
- **Tailwind CSS**: Styling
- **MathJax**: Mathematical formula rendering
- **CSS Transitions**: Smooth state transitions

## Installation

### Prerequisites
- Node.js (v14+)
- npm

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/naive-bayes-visualization.git
cd naive-bayes-visualization

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── BayesExplanationTransition.js    # Transition effects for explanations
│   ├── BayesExplanationTransition.css   # Styles for transitions
│   ├── CustomDataTable.js               # Reusable data table component
│   ├── CustomDataTable.css              # Table styling
│   ├── DataGrid.js                      # Data grid for feature visualization
│   ├── DirectMathJax.js                 # MathJax integration for formulas
│   ├── InteractiveDataMatrix.js         # Interactive matrix with hover effects
│   ├── InteractiveDataMatrix.css        # Matrix styling
│   ├── MathFormula.js                   # Mathematical formula component
│   ├── MathFormula.css                  # Formula styling
│   ├── NaiveBayesExplanation.js         # Main explanation component
│   ├── NaiveBayesExplanation.css        # Explanation styling
│   ├── TooltippedFormula.js             # Formula with tooltip functionality
│   └── TooltippedFormula.css            # Tooltip styling
├── App.js                               # Main application component
├── App.css                              # Application styling
├── index.js                             # Entry point
└── index.css                            # Global styles
```

## Core Components

### NaiveBayesExplanation
The main component that orchestrates the visualization. It contains:
- Feature matrix display
- Prior probabilities calculation and display
- Conditional probabilities visualization

### InteractiveDataMatrix
Handles the feature matrix with interactive highlighting:
- Displays the presence (1) or absence (0) of features
- Highlights relevant cells based on user interaction
- Syncs with probability formulas

### MathFormula & TooltippedFormula
Renders mathematical formulas with:
- MathJax integration for proper mathematical notation
- Interactive tooltips that explain probability concepts
- Hover states that connect to data visualization

### BayesExplanationTransition
Manages smooth transitions between different states of the visualization.

## Usage and Customization

### Using Your Own Dataset
Modify the `dataMatrix` and `featureNames` variables in the `NaiveBayesExplanation.js` component:

```javascript
// Feature names (columns in the matrix)
const featureNames = ['and', 'funny', 'he', 'movie', 'not', 'sad', 'was'];

// Matrix rows with classification and feature presence
const dataMatrix = [
  { classification: 'Positive', features: [1, 1, 1, 0, 0, 1, 1] },
  { classification: 'Positive', features: [0, 0, 0, 1, 0, 1, 1] },
  { classification: 'Negative', features: [0, 1, 0, 1, 1, 0, 1] }
];
```

### Styling
Components use a combination of Tailwind CSS and custom CSS files:
1. For layout changes, modify the Tailwind classes in component files
2. For component-specific styling, update the corresponding CSS files


## Future Development

- Data import functionality from CSV/JSON
- Real-time classification of new text inputs
- Step-by-step visualization of the classification process
- Support for multi-class classification

## Challenges and Developer Notes

### Known Challenges

1. **State Management Complexity**:
   - Hovering interactions between components rely on state being passed correctly
   - The current implementation uses prop drilling
   - Be cautious when refactoring the hover state logic as it affects multiple components

3. **Responsive Design Edge Cases**:
   - The matrix visualization may have display issues on very small screens (<320px width)
   - Formula display can break at certain viewport widths due to MathJax rendering behavior
   - Test thoroughly when making layout changes

### Developer Tips

1. **Adding New Features**:
   - When adding new interactive elements, maintain the existing pattern of state management
   - Always consider both hover states and tooltip behaviors when modifying components
   - The TooltippedFormula component is designed to be reused across the application

2. **Performance Optimization**:
   - Large datasets could impact rendering performance; could consider pagination for matrices with many rows
   - Use React.memo() for components that don't need frequent re-rendering
   - The calculateConditionalProb function is called frequently; consider optimizing/memoizing its results

3. **CSS Modifications**:
   - Most component styling uses a combination of Tailwind utility classes and component-specific CSS
   - Changes to global styles in index.css may have unintended results across the different components, since they're intertwined
   - Note that BayesExplanationTransition.css contains critical animation properties that affect UX

