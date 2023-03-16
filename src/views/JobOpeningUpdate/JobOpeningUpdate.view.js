import React, {useMemo} from 'react';
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/styles";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomToggle from "../../components/FormFields/CustomToggle";
import CustomAutoComplete from "../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import Constants from "../../config/constants";
import useJobOpeningsEditDetail from './JobOpeningUpdateHook';

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));

const JobOpeningUpdateView = ({}) => {
    const { form, errorData, isSubmitting, isLoading, handleSubmit, removeError, onBlurHandler, changeTextData, isEdit, handleDelete,
     includeRef, currency, keywords,handleReset, listData, filteredSubDepartments, filteredDepartments, filteredEmployees, } = useJobOpeningsEditDetail({});
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
                           <div className={'heading'}>Job Opening Details</div>
                           {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                           {/*    <InfoIcon fontSize={'small'}/>*/}
                           {/*</Tooltip>*/}
                       </h4>
                   </div>


                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomSelectField
                                disabled={true}
                               isError={errorData?.location_id}
                               errorText={errorData?.location_id}
                               label={"Location"}
                               value={form?.location_id}
                               handleChange={(value) => {
                                   changeTextData(value, "location_id");
                               }}
                           >
                               {listData?.LOCATION_DEPARTMENTS?.map(dT => {
                                   return (<MenuItem value={dT?.id} key={dT?.id}>{dT?.name}</MenuItem>)
                               })}
                           </CustomSelectField>
                       </div>
                   </div>

                   <div className={"formFlex"}>
                       <div className="formGroup">
                           <CustomSelectField
                                disabled={true}
                               isError={errorData?.department_id}
                               errorText={errorData?.department_id}
                               label={"Department"}
                               value={form?.department_id}
                               handleChange={(value) => {
                                   changeTextData(value, "department_id");
                               }}
                           >
                               {filteredDepartments?.map(dT => {
                                   return (<MenuItem value={dT?.id} key={dT?.id}>{dT?.name}</MenuItem>)
                               })}
                           </CustomSelectField>
                       </div>
                       <div className="formGroup">
                           <CustomSelectField
                                disabled={true}
                               isError={errorData?.sub_department_id}
                               errorText={errorData?.sub_department_id}
                               label={"Sub-Department"}
                               value={form?.sub_department_id}
                               handleChange={(value) => {
                                   changeTextData(value, "sub_department_id");
                               }}
                           >
                               {filteredSubDepartments?.map(dT => {
                                   return (<MenuItem value={dT?.id} key={dT?.id}>{dT?.name}</MenuItem>)
                               })}
                           </CustomSelectField>
                       </div>
                   </div>


                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomSelectField
                                disabled={true}
                               isError={errorData?.vacancy_type}
                               errorText={errorData?.vacancy_type}
                               label={'Type Of Vacancy'}
                               value={form?.vacancy_type}
                               handleChange={value => {
                                   changeTextData(value, 'vacancy_type')
                               }}>
                               {Object.keys(Constants.TYPE_OF_VACANCY).map(o => {
                                   return (<MenuItem value={o} key={o}>{Constants.TYPE_OF_VACANCY[o]}</MenuItem>);
                               })}

                           </CustomSelectField>
                       </div>
                       <div className="formGroup">
                           <CustomAutoComplete
                               autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                               dataset={listData.HR}
                               datasetKey={'label'}
                               onTextChange={(text, value) => { changeTextData(text, 'assigned_to') }}
                               variant={'outlined'}
                               label={'Assigned To Recruiter'}
                               name={'assigned_to'}
                               isError={errorData?.assigned_to}
                               value={form?.assigned_to}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className="formGroup">
                           <CustomAutoComplete
                                disabledList={true}
                                disabled={true}
                               autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                               dataset={listData.JOB_ROLES}
                               datasetKey={'label'}
                               onTextChange={(text, value) => { changeTextData(text, 'job_role') }}
                               variant={'outlined'}
                               label={'Associate Job Description'}
                               name={'job_role'}
                               isError={errorData?.job_role}
                               value={form?.job_role}
                           />
                       </div>
                       <div className="formGroup">
                           <CustomAutoComplete
                               autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                               dataset={filteredEmployees}
                               datasetKey={'label'}
                               onTextChange={(text, value) => { changeTextData(text, 'replacing_person') }}
                               variant={'outlined'}
                               label={'Replacing Person'}
                               name={'replacing_person'}
                               isError={errorData?.replacing_person}
                               value={form?.replacing_person}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'} style={{alignItems:"center"}}>
                       <div className="formGroup">
                           <CustomAutoComplete
                                disabledList={true}
                                disabled={true}
                               autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.name}}
                               dataset={listData.DESIGNATIONS}
                               datasetKey={'name'}
                               onTextChange={(text, value) => { changeTextData(text, 'designation') }}
                               variant={'outlined'}
                               label={'Designation'}
                               name={'designation'}
                               isError={errorData?.designation}
                               value={form?.designation}
                           />
                       </div>
                       <div className="formGroup">
                           {form?.replacing_person && (<div className={styles.emp}>
                               <div>Employee ID: <span className={styles.val}>{form?.replacing_person?.code}</span></div>
                               <div className={styles.caderFlex}>
                                   <div>Grade:<span className={styles.val}>{form?.replacing_person?.grade_name}</span></div>
                                   <div style={{marginLeft:'60px'}}>Cader: <span className={styles.val}>
                                    {form?.replacing_person?.cadre ? form?.replacing_person?.cadre : 'N/A'}</span></div>
                               </div>
                           </div>)}
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



export default JobOpeningUpdateView;
