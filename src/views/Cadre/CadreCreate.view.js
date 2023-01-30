import React, {useMemo} from 'react';
import useCadreHook from "./CadreCreateHook";
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
import styles from "./Style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles} from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import constants from "../../config/constants";
import AutoCompleteChip from "../../components/FormFields/AutoCompleteText/AutoCompleteChip";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import CustomAutoComplete from "../../components/FormFields/AutoCompleteText/CustomAutoComplete";

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));


const CadreCreateView = ({location}) => {
    const { form, errorData, isSubmitting, isLoading, handleSubmit, removeError, gradeCode, onBlurHandler, changeTextData, id} = useCadreHook({location});
    const classes = useStyles();

        return (
           <div>

               <div className={styles.outerFlex}>
                  <div>
                      <ButtonBase onClick={() => (history.goBack())}>
                          <ArrowBackIosIcon fontSize={'small'}/> <span><b>{gradeCode} Grade>{!id ? 'Create' : 'Update'} Cadre</b></span>
                      </ButtonBase>
                      <div className={styles.newLines}/>
                  </div>
               </div>


               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Cadre Info</div>
                           {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                           {/*    <InfoIcon fontSize={'small'}/>*/}
                           {/*</Tooltip>*/}
                       </h4>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.name}
                               errorText={errorData?.name}
                               label={'Cadre Name'}
                               value={form?.name}
                               onTextChange={text => {
                                   changeTextData(text, 'name');
                               }}
                               onBlur={() => {
                                   onBlurHandler('name');
                               }}
                           />
                       </div>
                       {/*<div className={'formGroup'}>*/}
                       {/*    <CustomTextField*/}
                       {/*        isError={errorData?.level}*/}
                       {/*        errorText={errorData?.level}*/}
                       {/*        label={'Cadre Level'}*/}
                       {/*        value={form?.level}*/}
                       {/*        onTextChange={text => {*/}
                       {/*            changeTextData(text, 'level');*/}
                       {/*        }}*/}
                       {/*        onBlur={() => {*/}
                       {/*            onBlurHandler('level');*/}
                       {/*        }}*/}
                       {/*    />*/}
                       {/*</div>*/}
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
                           {id ? 'Update': 'Create'}
                       </ButtonBase>
                   </div>
               </div>
           </div>
        )
};



export default CadreCreateView;
