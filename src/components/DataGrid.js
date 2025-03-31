import React from 'react';

export const DataGrid = ({ data, width, height, centerAlign = false }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Get all column headers
  const headers = Object.keys(data[0]);

  return (
    <div style={{ width, height, overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  padding: '8px',
                  borderBottom: '2px solid #ddd',
                  textAlign: centerAlign ? 'center' : 'left',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f8f9fa'
                }}
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
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                    textAlign: centerAlign ? 'center' : 'left'
                  }}
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