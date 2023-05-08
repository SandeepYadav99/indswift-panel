import React, { useState } from 'react';
import styles from './Style.module.css'

const data = [
  { id: 1, name: 'John', age: 32, email: 'john@example.com', country: 'USA', city: 'New York' },
  { id: 2, name: 'Jane', age: 28, email: 'jane@example.com', country: 'Canada', city: 'Toronto' },
  { id: 3, name: 'Bob', age: 45, email: 'bob@example.com', country: 'Australia', city: 'Sydney' },
  { id: 4, name: 'Mary', age: 39, email: 'mary@example.com', country: 'UK', city: 'London' },
];

const CustomDataGrid = () => {
  const [columns, setColumns] = useState([
    { key: 'id', title: 'ID', fixed: true },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'email', title: 'Email' },
    { key: 'country', title: 'Country' },
    { key: 'city', title: 'City' },
  ]);

  const [rows, setRows] = useState(data);

  const handleInputChange = (id, key, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [key]: value,
          };
        }

        return row;
      })
    );
  };

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {columns.map(({ key, title, fixed }) => (
              <th key={key} style={{ position: fixed ? 'sticky' : 'static', left: fixed ? 0 : undefined }} className={styles.thead}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map(({ key, fixed }) => (
                <td key={key} style={{ position: fixed ? 'sticky' : 'static', left: fixed ? 0 : undefined }}>
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleInputChange(row.id, key, e.target.value)}
                    readOnly={!fixed}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomDataGrid;
