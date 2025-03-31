import React, { useState, useEffect } from 'react';
import './App.css';
import { DataGrid } from './components/DataGrid';
import TooltippedFormula from './components/TooltippedFormula';
import InteractiveDataMatrix from './components/InteractiveDataMatrix';
import CustomDataTable from './components/CustomDataTable';
import BayesExplanationTransition from './components/BayesExplanationTransition';

function App() {
  // Initial data state
  const initialData = [
    { rowNumber: 1, review: "he was funny and sad", classification: "Positive" },
    { rowNumber: 2, review: "movie was sad", classification: "Positive" },
    { rowNumber: 3, review: "movie was not funny", classification: "Negative" }
  ];
  
  const [data, setData] = useState(initialData);
  const [editRow, setEditRow] = useState(1);
  const [editReview, setEditReview] = useState("");
  const [editClassification, setEditClassification] = useState("Positive");
  
  // Text processing functions
  const processText = (text) => {
    // Convert to lowercase and remove punctuation
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
    // Split into words
    return cleanText.split(/\s+/);
  };
  
  const createDataMatrix = (reviews) => {
    // Get all unique words from all reviews
    let allWords = new Set();
    reviews.forEach(review => {
      const words = processText(review);
      words.forEach(word => allWords.add(word));
    });
    
    // Sort words to maintain consistent column order
    allWords = Array.from(allWords).sort();
    
    // Create binary matrix
    const matrix = [];
    
    // Fill matrix
    reviews.forEach((review, i) => {
      const row = {};
      const processedWords = processText(review);
      
      allWords.forEach(word => {
        row[word] = processedWords.includes(word) ? 1 : 0;
      });
      
      matrix.push(row);
    });
    
    return matrix;
  };
  
  // Event handlers
  const handleApplyEdit = () => {
    const rowIdx = editRow - 1; // Convert to 0-based index
    
    if (rowIdx >= 0 && rowIdx < data.length) {
      const newData = [...data];
      newData[rowIdx] = {
        ...newData[rowIdx],
        review: editReview,
        classification: editClassification
      };
      setData(newData);
    } else {
      // Show error notification
      alert("Cannot edit: Row does not exist yet. Please enter a valid row number.");
    }
  };
  
  const handleAddRow = () => {
    const nextRowNumber = data.length > 0 ? Math.max(...data.map(item => item.rowNumber)) + 1 : 1;
    setData([
      ...data,
      {
        rowNumber: nextRowNumber,
        review: "New review...",
        classification: "Positive"
      }
    ]);
  };
  
  const handleRemoveLastRow = () => {
    if (data.length > 0) {
      setData(data.slice(0, -1));
    }
  };
  
  // Extract reviews for data matrix
  const reviews = data.map(item => item.review);
  const dataMatrix = createDataMatrix(reviews);
  
  // Clear the form when row number changes
  useEffect(() => {
    if (editRow > 0 && editRow <= data.length) {
      const currentRow = data[editRow - 1];
      setEditReview(currentRow.review);
      setEditClassification(currentRow.classification);
    } else {
      setEditReview("");
      setEditClassification("Positive");
    }
  }, [editRow, data]);
  
  return (
    <div className="App">
      <div style={{ marginTop: '20px' }}>
        <h2>Naive Bayes Classifier Demo</h2>
        <p>When classifying a new movie review as positive or negative, the Naïve Bayes model uses probabilities based on past data.</p>
        <p>We start with a dataset of labelled reviews, where each word is represented as 1 (if present in the review) or 0 (if absent from the review).</p>
      </div>
      
      {/* Vertical layout with Movie Reviews on top and Data Matrix below */}
      <div className="vertical-layout">
        {/* Movie Reviews (Training Set) */}
        <div className="card full-width-card">
          <h3 className="card-header">Movie Reviews (Training Set)</h3>
          
          <DataGrid 
            data={data.map(item => ({
              "Row Number": item.rowNumber,
              "Review": item.review,
              "Classification": item.classification
            }))}
            width="100%"
            height="300px"
          />
          
          <div className="card">
            <div className="editing-controls">
              <div className="form-group">
                <label htmlFor="edit-row">Row number:</label>
                <input 
                  type="number" 
                  id="edit-row" 
                  value={editRow}
                  min={1}
                  onChange={e => setEditRow(parseInt(e.target.value))}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group wide-input">
                  <label htmlFor="edit-review">Edit review:</label>
                  <input 
                    type="text" 
                    id="edit-review" 
                    value={editReview}
                    onChange={e => setEditReview(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-classification">Classification:</label>
                  <select
                    id="edit-classification"
                    value={editClassification}
                    onChange={e => setEditClassification(e.target.value)}
                  >
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>
              </div>
              
              <div className="button-group">
                <button className="small-button" onClick={handleApplyEdit}>Apply Edit</button>
                <button className="small-button" onClick={handleAddRow}>Add New Row</button>
                <button className="small-button" onClick={handleRemoveLastRow}>Remove Last Row</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Matrix */}
        <div className="card full-width-card">
          <h3 className="card-header">Data Matrix</h3>
          <CustomDataTable 
            data={dataMatrix.map((row, i) => ({
              "Class": data[i].classification,
              ...row
            }))}
            centerAlign={true}
          />
        </div>
      </div>
      
      {/* Bayes' Theorem Explanation */}
      <TooltippedFormula />
      
      {/* New transition component */}
      <BayesExplanationTransition />
      
      {/* Interactive Data Matrix with Probability Values */}
      <InteractiveDataMatrix data={data} />
    </div>
  );
}

export default App;