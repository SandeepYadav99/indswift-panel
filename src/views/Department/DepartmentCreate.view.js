import React, {useMemo} from 'react';
import useDepartmentHook from "./DepartmentCreateHook";
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/styles";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../components/FormFields/CustomSwitch";

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));


const DepartmentCreateView = ({}) => {
    const { form, errorData, isSubmitting, isLoading, handleSubmit, removeError, onBlurHandler, changeTextData, isEdit, handleDelete,handleReset, id} = useDepartmentHook({});
    const classes = useStyles();

        return (
           <div>
               <div className={styles.outerFlex}>
                  <div>
                      <ButtonBase onClick={() => (history.goBack())}>
                          <ArrowBackIosIcon fontSize={'small'}/> <span><b>{id ? 'Update' : 'New'} Department</b></span>
                      </ButtonBase>
                      <div className={styles.newLines}/>
                  </div>
               </div>


               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Department Details</div>
                           {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                           {/*    <InfoIcon fontSize={'small'}/>*/}
                           {/*</Tooltip>*/}
                       </h4>
                   </div>

                   <div className={'formFlex'} id={styles.mobileFlexDepartment}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.name}
                               errorText={errorData?.name}
                               label={'Department Name'}
                               value={form?.name}
                               onTextChange={text => {
                                   changeTextData(text, 'name');
                               }}
                               onBlur={() => {
                                   onBlurHandler('name');
                               }}
                           />
                       </div>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.code}
                               errorText={errorData?.code}
                               label={'Department Code'}
                               value={form?.code}
                               onTextChange={text => {
                                   changeTextData(text, 'code');
                               }}
                               onBlur={() => {
                                   onBlurHandler('code');
                               }}
                           />
                       </div>
                   </div>
               </div>

               <div className={'plainPaper'}>

                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Status</div>
                       </h4>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomSwitch
                               value={form?.is_active}
                               handleChange={() => {
                                   changeTextData(!form?.is_active, 'is_active')
                               }}
                               label={`Active`}
                           />
                       </div>
                   </div>

                   <div className={styles.btnCont}>
                       <ButtonBase disabled={isSubmitting} type={'button'} onClick={handleSubmit}
                                   className={styles.createBtn}>
                           Create
                       </ButtonBase>
                   </div>
               </div>
           </div>
        )
};



export default DepartmentCreateView;
