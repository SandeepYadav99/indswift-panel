import React, {useMemo} from 'react';
import useJobOpeningsDetail from "./JobOpeningCreateHook";
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
import {Field} from "redux-form";
import CustomToggle from "../../components/FormFields/CustomToggle";

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));

const JobOpeningCreateView = ({}) => {
    const { form, errorData, isSubmitting, isLoading, handleSubmit, removeError, onBlurHandler, changeTextData, isEdit, handleDelete,
     includeRef, currency, keywords,handleReset} = useJobOpeningsDetail({});
    const classes = useStyles();

        return (
           <div >

               <div className={styles.outerFlex}>
                  <div>
                      <ButtonBase onClick={() => (history.goBack())}>
                          <ArrowBackIosIcon fontSize={'small'}/> <span><b> Job Openings</b></span>
                      </ButtonBase>
                      <div className={styles.newLine}/>
                  </div>
               </div>


               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Create Active Job Opening</div>
                           {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                           {/*    <InfoIcon fontSize={'small'}/>*/}
                           {/*</Tooltip>*/}
                       </h4>
                   </div>


                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomSelectField
                               isError={errorData?.location}
                               errorText={errorData?.location}
                               label={'Location'}
                               value={form?.location}
                               handleChange={value => {
                                   changeTextData(value, 'location')
                               }}>
                               <MenuItem value={'NABHA'}>Nabha</MenuItem>
                           </CustomSelectField>
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.department}
                               errorText={errorData?.department}
                               label={'Department'}
                               value={form?.department}
                               handleChange={value => {
                                   changeTextData(value, 'department')
                               }}>
                               <MenuItem value={'TEST'}>Test</MenuItem>
                           </CustomSelectField>
                       </div>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.sub_department}
                               errorText={errorData?.sub_department}
                               label={'Sub-Department'}
                               value={form?.sub_department}
                               handleChange={value => {
                                   changeTextData(value, 'sub_department')
                               }}>
                               <MenuItem value={'TEST'}>Test</MenuItem>
                           </CustomSelectField>
                       </div>
                   </div>


                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.vacancy_type}
                               errorText={errorData?.vacancy_type}
                               label={'Type Of Vacancy'}
                               value={form?.vacancy_type}
                               handleChange={value => {
                                   changeTextData(value, 'vacancy_type')
                               }}>
                               <MenuItem value={'TEST'}>Test</MenuItem>
                           </CustomSelectField>
                       </div>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.assigned_to}
                               errorText={errorData?.assigned_to}
                               label={'Assigned To Recruiter'}
                               value={form?.assigned_to}
                               handleChange={value => {
                                   changeTextData(value, 'assigned_to')
                               }}>
                               <MenuItem value={'TEST'}>Test</MenuItem>
                           </CustomSelectField>
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.associate_job}
                               errorText={errorData?.associate_job}
                               label={'Associate Job Description'}
                               value={form?.associate_job}
                               handleChange={value => {
                                   changeTextData(value, 'associate_job')
                               }}>
                               <MenuItem value={'TEST'}>Test</MenuItem>
                           </CustomSelectField>
                       </div>
                       <div className="formGroup">
                           <CustomTextField
                               isError={errorData?.replacing_person}
                               errorText={errorData?.replacing_person}
                               label={'Replacing Person'}
                               value={form?.replacing_person}
                               onTextChange={text => {
                                   changeTextData(text, 'replacing_person');
                               }}
                               onBlur={() => {
                                   onBlurHandler('replacing_person');
                               }}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'} style={{alignItems:"center"}}>
                       <div className="formGroup">
                           <CustomTextField
                               isError={errorData?.designation}
                               errorText={errorData?.designation}
                               label={'Designation'}
                               value={form?.designation}
                               onTextChange={text => {
                                   changeTextData(text, 'designation');
                               }}
                               onBlur={() => {
                                   onBlurHandler('designation');
                               }}
                           />
                       </div>
                       <div className="formGroup">
                           <div className={styles.emp}>
                               <div>Employee ID: <span className={styles.val}>124343</span></div>
                               <div className={styles.caderFlex}>
                                   <div>Grade:<span className={styles.val}>2124324</span></div>
                                   <div style={{marginLeft:'60px'}}>Cader: <span className={styles.val}>N.A</span></div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomTextField
                               isError={errorData?.optional_notes}
                               errorText={errorData?.optional_notes}
                               label={'Optional Notes'}
                               value={form?.optional_notes}
                               onTextChange={text => {
                                   changeTextData(text, 'optional_notes');
                               }}
                               onBlur={() => {
                                   onBlurHandler('optional_notes');
                               }}
                               multiline
                               rows={5}
                           />
                       </div>
                   </div>

                   <div className={styles.btm}>
                      <div className={styles.toggleBtn}>
                         <div>
                             <CustomToggle value={form?.is_sourcing}
                                           handleChange={() => {
                                               changeTextData(!form?.is_sourcing, 'is_sourcing')
                                           }}
                                           leftLabel={'Not Sourcing'} rightLabel={'Sourcing'}/>
                         </div>

                          <div style={{marginLeft:'50px'}}>
                              <CustomToggle value={form?.is_hiring}
                                            handleChange={() => {
                                                changeTextData(!form?.is_hiring, 'is_hiring')
                                            }}
                                            leftLabel={'Not Hiring'} rightLabel={'Hiring'}/>
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


           </div>
        )
};



export default JobOpeningCreateView;
