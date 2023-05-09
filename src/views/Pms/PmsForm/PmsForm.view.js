import React, {useMemo, useState} from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import {IconButton, Tooltip} from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import ButtonLowerView from "./component/ButtonLower/ButtonLower.view";
import FormInput from "./component/FormInput/FormInput";
import usePmsForm from "./PmsForm.hook";
import LogUtils from "../../../libs/LogUtils";
import handleSubmit from "redux-form/lib/handleSubmit";
import FormDropdown from "./component/FormDropdown/FormDropdown";

const TableCell = ({row, key, fixed, readOnly, render, handleInputChange, name, value, isError, group, ...props}) => {
    const inputField = useMemo(() => {
        if (render) {
            return null;
        }
        LogUtils.log('group', group);
        if (group === 'CPC') {
            return (
                <FormDropdown
                    value={value}
                    isError={isError}
                    onChange={(e) => {
                        handleInputChange(e.target.name, e.target.value, 'NUMBER')
                    }}
                />
            )
        } else {
            return (
                <FormInput
                    value={value ? value : ''}
                    onChange={(e) => {
                        handleInputChange(e.target.name, e.target.value, 'SELECT')
                    }}
                    readOnly={readOnly}
                    name={name}
                    isError={isError}
                    type={'number'}
                />
            );
        }
    }, [render, group, value, handleInputChange, name, isError]);
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
                {inputField}
            </div>)}
        </td>
    );
};

const TableHead = ({columns}) => {
    const parameterColumns = useMemo(() => {
        const thead = [];
        columns.forEach((col)=> {
            if ('parameters' in col) {
                col.parameters.forEach((param) => {
                    thead.push(
                        <th
                            key={param.title}
                            className={styles.thead}
                        >
                            <div className={styles.tipWrap}>
                                {param?.title}
                                {param?.description && (
                                    <Tooltip title={param?.description}>
                                        <IconButton size="small">
                                            <InfoOutlined color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        </th>
                    );
                })
            }
        });
        return thead;
    }, [columns]);

    return (
        <thead>
        <tr>
            {columns?.map(({key, parameters, title, fixed, text, is_static}) => (
                <>
                    <th
                        rowSpan={is_static ? 2 : 1}
                        colSpan={ parameters ? parameters.length : 1}
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
        <tr>
            {parameterColumns}
        </tr>
        </thead>
    )
}

const PmsForm = ({route}) => {
    const {
        columns,
        rows,
        handleInputChange,
        processedColumns,
        form,
        errors,
        handleSubmit
    } = usePmsForm({});
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
                        <TableHead columns={columns} />
                        <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={row.id}>
                                {processedColumns.map(({key, fixed, readOnly, render, ...props}, index) => (
                                    <TableCell
                                        value={form[`${rowIndex}_${key}`]}
                                        handleInputChange={handleInputChange}
                                        row={row}
                                        key={key}
                                        name={`${rowIndex}_${key}`}
                                        fixed={fixed}
                                        readOnly={readOnly}
                                        render={render}
                                        isError={errors[`${rowIndex}_${key}`]}
                                        {...props}
                                    />
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.lowerBtnwr}>
                    <ButtonLowerView handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default PmsForm;
