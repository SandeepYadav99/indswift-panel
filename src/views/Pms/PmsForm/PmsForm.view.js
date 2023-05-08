import React, { useState } from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import { IconButton, Tooltip } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
const data = [
  {
    id: 1,
    name: "John",
    age: 32,
    email: "john@example.com",
    country: "USA",
    city: "New York",
  },
  {
    id: 2,
    name: "Jane",
    age: 28,
    email: "jane@example.com",
    country: "Canada",
    city: "Toronto",
  },
  {
    id: 3,
    name: "Bob",
    age: 45,
    email: "bob@example.com",
    country: "Australia",
    city: "Sydney",
  },
  {
    id: 4,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 5,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 6,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 7,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },{
    id: 8,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },{
    id: 9,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 10,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 11,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },{
    id: 12,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },
  {
    id: 13,
    name: "Mary",
    age: 39,
    email: "mary@example.com",
    country: "UK",
    city: "London",
  },



];

const CustomDataGrid = () => {
  const [columns, setColumns] = useState([
    { key: "id", title: "ID", fixed: true },
    { key: "name", title: "Name", readOnly: true },
    { key: "age", title: "Age", text: "xyz" },
    { key: "email", title: "Email" },
    { key: "country", title: "Country" },
    { key: "city", title: "City" },
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
    <div>
      <div className={styles.pmsformWrap}>
        <div className={styles.formUpper}>
          <img src={logo} alt="IndSwift" />
          <p>Type 1 Form</p>
          <span>
            This form is based upon right angle methodology, in which an
            assigned mentor provide concrete feedback about the subordinate with
            an objective to apprise the performance and also to quickly align
            the performance of individual with his/her organizational career
            plan.
          </span>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.container}>
          <table
            style={{
              borderCollapse: "collapse",
              cellSpacing: "0",
              borderSpacing: "0",
              cellpadding: "0",
              height: '100px'
            }}
          >
            <thead>
              <tr>
                {columns?.map(({ key, title, fixed, text }) => (
                  <th
                    key={key}
                    style={{
                      position: "sticky",
                      left: fixed ? 0 : undefined,
                      top: 0,
                      zIndex: fixed ? 10 : 9
                    }}
                    className={styles.thead}
                  >
                    <div className={styles.tipWrap}>
                      {title}
                      {text && (
                        <Tooltip title={text}>
                          <IconButton size="small">
                            <InfoOutlined color="secondary" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map(({ key, fixed, readOnly }) => (
                    <td
                      key={key}
                      style={{
                        position: fixed ? "sticky" : "static",
                        left: fixed ? 0 : undefined,
                        border: "2px solid #EBEDF4",
                        padding: "0",
                      }}
                    >
                      <div className={styles.inputWrap}>
                        <input
                          className={
                            readOnly ? styles.readOnlyClass : styles.inputComp
                          }
                          type="text"
                          value={row[key]}
                          onChange={(e) =>
                            handleInputChange(row.id, key, e.target.value)
                          }
                          readOnly={readOnly}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomDataGrid;
