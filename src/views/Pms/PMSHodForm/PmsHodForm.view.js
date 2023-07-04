import React, {useMemo, useState} from "react";
import styles from "./Style.module.css";
import logo from "../../../assets/img/login logo@2x.png";
import {IconButton, Tooltip,makeStyles } from "@material-ui/core";
import {InfoOutlined} from "@material-ui/icons";
import ButtonLowerView from "./component/ButtonLower/ButtonLower.view";
import usePmsHodForm from "./PmsHodForm.hook";
import FormDropdown from "./component/FormDropdown/FormDropdown";
import SnackbarComponent from "../../../components/Snackbar.component";
import { removeUnderScore } from "../../../helper/helper";
import ConfirmDialog from "./component/ConfirmDialog/ConfirmDialog.view";
import LogUtils from "../../../libs/LogUtils";
import FormInput from "../PmsForm/component/FormInput/FormInput";

const useStyles = makeStyles((theme) => ({
    customTooltip: {
      backgroundColor: 'white',
      color: 'black',
      fontSize:'.75rem',
      fontWeight:'normal',
      fontFamily:'Montserrat',
      borderRadius:'10px'
    },
  }));


const TableCell = ({row, key, fixed, readOnly, render, handleInputChange, name, value, isError, group, title, totalAvg, rating, ...props}) => {
    const inputField = useMemo(() => {
        if (render) {
            return null;
        }
        if (title === 'RECOMMEND_FOR_PROMOTION') {
            return (
                <FormDropdown
                    name={name}
                    value={value ? value : ''}
                    isError={isError}
                    isEnabled={row.is_eligible}
                    onChange={(e) => {
                        handleInputChange(e.target.name, e.target.value, 'DROPDOWN')
                    }}
                />
            );
        } else {
            return (
                <FormInput
                    value={value ? value : ''}
                    onChange={(e) => {
                        handleInputChange(e.target.name, e.target.value, 'NUMBER', rating)
                    }}
                    readOnly={readOnly}
                    name={name}
                    isError={isError}
                    type={'number'}
                    // disabled={!row.is_eligible}
                />
            );
        }
    }, [render, group, value, handleInputChange, name, isError, rating, totalAvg, title]);
    return (
        <td
            key={key}
            style={{
                position: fixed ? "sticky" : "static",
                left: fixed ? 0 : undefined,
                border: "2px solid #EBEDF4",
                padding: "0",
                zIndex: fixed ? 10: 9,
                background: readOnly ? '#EDF2F5 ':'#ffffff'
            }}
        >
            {render ? render(row) : (<div className={styles.inputWrap}>
                {inputField}
            </div>)}
        </td>
    );
};

const TableHead = ({columns}) => {
    const classes = useStyles();
    const parameterColumns = useMemo(() => {
        const thead = [];
        columns.forEach((col)=> {
            if ('parameters' in col) {
                col.parameters.forEach((param) => {
                    thead.push(
                        <th
                            style={{
                                position: "sticky",
                                // left: fixed ? 0 : undefined,
                                top: 35,
                                zIndex: 10 ,
                            }}
                            key={param.title}
                            className={styles.thead}
                        >
                            <div className={styles.tipWrap}>
                                {param?.title?.replace(/_/g, " ")}
                                {param?.description && (
                                    <Tooltip title={param?.description} classes={{ tooltip: classes.customTooltip }} enterDelay={2}
                                    leaveDelay={2000}>
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
                            zIndex: fixed ? 100 : 9,
                        }}
                        className={styles.thead}
                    >
                        <div className={styles.tipWrap}>
                            {title?.replace(/_/g, " ")}
                            {text && (
                                <Tooltip title={text} enterDelay={2} leaveDelay={2000}>
                                    <IconButton size="small">
                                        <InfoOutlined color="secondary" />
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

const PmsHodForm = ({location}) => {
    const {
        columns,
        rows,
        handleInputChange,
        processedColumns,
        form,
        errors,
        handleSubmit,
        isSubmitting,
        handleDraft,
        toggleStatusDialog,
        approveDialog,
        submitToServer,
        totalAvg,
    } = usePmsHodForm({location});


    return (
        <div>
            <div className={styles.pmsformWrap}>
                <div className={styles.formUpper}>
                    <img src={logo} alt="IndSwift"/>
                    <p>{`HOD Review FORM`}</p>
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
                                {processedColumns.map(({title, rating, key, fixed, readOnly, render, ...props}, index) => (
                                    <TableCell
                                        value={form[`${row.id}_${key}`]}
                                        handleInputChange={handleInputChange}
                                        row={row}
                                        key={key}
                                        name={`${row.id}_${key}`}
                                        fixed={fixed}
                                        readOnly={readOnly}
                                        render={render}
                                        isError={errors[`${row.id}_${key}`]}
                                        title={title}
                                        totalAvg={totalAvg}
                                        rating={row?.rating}
                                        {...props}
                                    />
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <ConfirmDialog
                type={'Review Form'}
                handleSubmit={submitToServer}
                isOpen={approveDialog}
                handleToggle={toggleStatusDialog} />

                <div className={styles.lowerBtnwr}>
                    <ButtonLowerView
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        handleDraft={handleDraft}
                    />
                </div>
            </div>
            <SnackbarComponent />
        </div>
    );
};

export default PmsHodForm;
