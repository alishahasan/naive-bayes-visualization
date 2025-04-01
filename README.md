# Naive Bayes Classifier Visualization

A React-based interactive visualization tool for demonstrating Naive Bayes classification algorithms.

## Project Overview

This project implements an interactive UI for visualizing the components of a Naive Bayes classifier, including feature matrices, prior probabilities, and conditional probabilities. The primary goal is to create an educational tool that helps developers understand how Naive Bayes works through visual interaction.

## Technical Stack

- **React**: Front-end framework for component-based UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **useState Hook**: For managing component state and interactions

## Component Structure

The main component (`NaiveBayesComponent`) consists of:

1. **State Management**
   - `hoveredFeatureIndex`: Tracks which feature column is being hovered
   
2. **Data Structures**
   - `featureNames`: Array of feature labels
   - `dataMatrix`: 2D matrix representing feature presence in classified texts
   - `priors`: Object containing prior probabilities for each class

3. **Helper Functions**
   - `calculateConditionalProb()`: Dynamically calculates conditional probabilities
   - `handleProbabilityHover()`: Manages hover state for interactive highlighting
   - `handleMouseLeave()`: Resets hover state

## Key Features for Developers

- **Dynamic Probability Calculation**: All probabilities are calculated at runtime based on the data matrix
- **Interactive Element Highlighting**: Uses state to coordinate highlighting between different UI elements
- **Responsive Layout**: Adapts to different screen sizes using Tailwind's responsive classes
- **Tooltip Implementation**: Custom tooltip system for displaying additional context

## Implementation Details

### Highlighting Logic

The cell highlighting is implemented using conditional class application:


```
  className={`border p-2 text-center ${
    hoveredFeatureIndex === colIndex && 
    row.classification === 'Positive' && 
    value === 1 ? 'bg-yellow-200' : ''
  }`}
```

This highlights cells when:
1. The current column matches the hovered probability
2. The row is a positive classification
3. The feature value is 1 (present)

### Probability Calculation

Conditional probabilities are calculated on the go:

```
const calculateConditionalProb = (featureIndex, value, classification) => {
  const classRows = dataMatrix.filter(row => row.classification === classification);
  const matchingRows = classRows.filter(row => row.features[featureIndex] === value);
  
  return classRows.length > 0 ? (matchingRows.length / classRows.length) * 100 : 0;
};
```

## Development Setup
### Prerequisites
- Node.js (v14+)
- npm

### Installation
```
# Clone the repository
git clone https://github.com/yourusername/naive-bayes-visualization.git
cd naive-bayes-visualization

# Install dependencies
npm install

# Start development server
npm start
```

### Project Structure
```
src/
├── components/
│   └── NaiveBayesComponent.jsx  # Main visualization component
├── App.js                       # Root component
└── index.js                     # Entry point
```

## Customization Guide
### Modifying the Dataset
To use a different dataset, update the `dataMatrix` and `featureNames` arrays:
```
// Feature names (columns in the matrix)
const featureNames = ['and', 'funny', 'he', 'movie', 'not', 'sad', 'was'];

// Matrix rows representing documents with feature presence (1) or absence (0)
const dataMatrix = [
  { classification: 'Positive', features: [1, 1, 1, 0, 0, 1, 1] },
  { classification: 'Positive', features: [0, 0, 0, 1, 0, 1, 1] },
  { classification: 'Negative', features: [0, 1, 0, 1, 1, 0, 1] }
];
```

### Styling Modifications
The component uses Tailwind CSS classes for styling. To modify the appearance:
1. Edit the `className` props in the component
2. For custom styles beyond Tailwind, create a separate CSS file