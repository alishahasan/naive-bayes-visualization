import React from 'react';
import './CustomDataTable.css';

// Enhanced DataTable that supports highlighting based on hoveredItem
export const CustomDataTable = ({ 
  data, 
  centerAlign = true, 
  hoveredItem = null,
  onCellHover = () => {} 
}) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Get all column headers
  const headers = Object.keys(data[0]);

  // Check if a cell should be highlighted
  const shouldHighlightCell = (rowData, colName) => {
    if (!hoveredItem) return false;
    
    const classification = rowData.classification;
    
    // Highlight entire row for prior probabilities
    if (hoveredItem.type === 'prior' && hoveredItem.cls === classification) {
      return true;
    }
    
    // When hovering over a conditional probability for a word in a class,
    // highlight ALL cells in that column that belong to that class
    if (hoveredItem.type === 'conditional' && 
        classification === hoveredItem.cls && 
        colName === hoveredItem.word) {
      return true;
    }
    
    return false;
  };

  return (
    <div className="custom-data-table">
      <table>
        <thead>
          <tr>
            {/* Feature index labels (x₁, x₂, etc.) */}
            <th className="row-header-cell"></th>
            {headers.slice(1).map((header, index) => (
              <th key={`feature-${index}`} className="feature-index">
                x<sub>{index + 1}</sub>
              </th>
            ))}
          </tr>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={index === 0 ? 'row-header-cell' : ''}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className={`
                    ${colIndex === 0 ? 'row-header-cell' : ''} 
                    ${shouldHighlightCell(row, header) ? 'highlighted-cell' : ''}
                  `}
                  style={centerAlign && colIndex > 0 ? { textAlign: 'center' } : {}}
                  onMouseEnter={() => onCellHover('cell', rowIndex, header, row.classification)}
                  onMouseLeave={() => onCellHover(null)}
                >
                  {row[header] !== undefined ? row[header] : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomDataTable;