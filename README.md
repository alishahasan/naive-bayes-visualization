# Naive Bayes Classifier Visualization

A React-based educational tool that visualizes how Naive Bayes classification works through an interactive interface.

## Overview

This project provides an intuitive visualization of Naive Bayes classifiers, commonly used for text classification. It displays feature matrices, probabilities, and demonstrates the relationships between data points and classification outcomes through interactive elements.

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

## Running Tests

```bash
# Run unit tests
npm test

# Run specific test file
npm test -- App.test.js
```

## Future Development

- Data import functionality from CSV/JSON
- Real-time classification of new text inputs
- Step-by-step visualization of the classification process
- Support for multi-class classification

## License

MIT