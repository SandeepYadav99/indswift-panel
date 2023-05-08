import React, {useState} from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import {IconButton, Tooltip} from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import ButtonLowerView from "./component/ButtonLower/ButtonLower.view";
import FormInput from "./component/FormInput/FormInput";
import usePmsForm from "./PmsForm.hook";

const TableCell = ({row, key, fixed, readOnly, render, ...props}) => {
    return (
        <td
            key={key}
            style={{
                position: fixed ? "sticky" : "static",
                left: fixed ? 0 : undefined,
                border: "2px solid #EBEDF4",
                padding: "0",
            }}
        >
            {render ? render(row) : (<div className={styles.inputWrap}>
                <FormInput
                    value={row[key]}
                    onChange={(e) => {
                        // handleInputChange(row.id, key, e.target.value)
                    }}
                    readOnly={readOnly}
                    name={''}
                    // isError={true}
                />
            </div>)}
        </td>
    );
};

const PmsForm = ({route}) => {
    const {columns, rows, handleInputChange} = usePmsForm({});
    return (
        <div>
            <div className={styles.pmsformWrap}>
                <div className={styles.formUpper}>
                    <img src={logo} alt="IndSwift"/>
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
                            height: "100px",
                        }}
                    >
                        <thead>
                        <tr>
                            {columns?.map(({key, title, fixed, text, is_static}) => (
                                <>
                                    <th
                                        key={key}
                                        style={{
                                            position: "sticky",
                                            left: fixed ? 0 : undefined,
                                            top: 0,
                                            zIndex: fixed ? 10 : 9,
                                        }}
                                        className={styles.thead}
                                    >
                                        <div className={styles.tipWrap}>
                                            {title}
                                            {text && (
                                                <Tooltip title={text}>
                                                    <IconButton size="small">
                                                        <InfoOutlined color="secondary"/>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </th>
                                </>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                {columns.map(({key, fixed, readOnly, render, ...props}) => (
                                    <TableCell row={row} key={key} fixed={fixed} readOnly={readOnly} render={render} {...props} />
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.lowerBtnwr}>
                    <ButtonLowerView/>
                </div>
            </div>
        </div>
    );
};

export default PmsForm;
