import React, {useMemo} from 'react';
import {Button, ButtonBase, InputAdornment, MenuItem} from "@material-ui/core";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/styles";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useCandidateDetail from "./CandidateCreateHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import File from "../../../components/FileComponent/FileComponent.component";
import OfficialInfo from "./components/OfficialInfo/OfficialInfo.view";
import IncludeForm from "./components/includes/Includes.component";
import EmployementForm from "./components/Employement/Includes.component"
import CustomToggle from "../../../components/FormFields/CustomToggle";
import Constants from "../../../config/constants";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../libs/LogUtils";


const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));


const CandidateCreateView = ({location}) => {
    const { form, errorData, isSubmitting, isLoading, employees, handleSubmit, removeError, onBlurHandler, changeTextData, historyRef, qualificationRef,
        isEdit, handleDelete,handleReset, selectedJobId, jobDetails} = useCandidateDetail({location});
    const classes = useStyles();

        return (
           <div>

               <div className={styles.outerFlex}>
                  <div>
                      <ButtonBase onClick={() => (history.goBack())}>
                          <ArrowBackIosIcon fontSize={'small'}/> <span><b>Onboard Candidate</b></span>
                      </ButtonBase>
                      <div className={styles.newLine}/>
                  </div>
               </div>

               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Personal Information</div>
                       </h4>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.name}
                               errorText={errorData?.name}
                               label={'Full Name'}
                               value={form?.name}
                               onTextChange={text => {
                                   changeTextData(text, 'name');
                               }}
                               onBlur={() => {
                                   onBlurHandler('name');
                               }}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.contact}
                               errorText={errorData?.contact}
                               label={'Contact'}
                               value={form?.contact}
                               type={'number'}
                               onTextChange={text => {
                                   changeTextData(text, 'contact');
                               }}
                               onBlur={() => {
                                   onBlurHandler('contact');
                               }}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                               }}
                           />
                       </div>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.father_name}
                               errorText={errorData?.father_name}
                               label={'Father Name'}
                               value={form?.father_name}
                               onTextChange={text => {
                                   changeTextData(text, 'father_name');
                               }}
                               onBlur={() => {
                                   onBlurHandler('father_name');
                               }}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.email}
                               errorText={errorData?.email}
                               label={'Email Id'}
                               value={form?.email}
                               onTextChange={text => {
                                   changeTextData(text, 'email');
                               }}
                               onBlur={() => {
                                   onBlurHandler('email');
                               }}
                           />
                       </div>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.aadhar}
                               errorText={errorData?.aadhar}
                               label={'Aadhar Number'}
                               value={form?.aadhar}
                               onTextChange={text => {
                                   changeTextData(text, 'aadhar');
                               }}
                               onBlur={() => {
                                   onBlurHandler('aadhar');
                               }}
                           />
                       </div>
                   </div>


                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.city}
                               errorText={errorData?.city}
                               label={'Current City'}
                               value={form?.city}
                               onTextChange={text => {
                                   changeTextData(text, 'city');
                               }}
                               onBlur={() => {
                                   onBlurHandler('city');
                               }}
                           />
                       </div>
                       <div className="formGroup">
                           <CustomSelectField
                               isError={errorData?.state}
                               errorText={errorData?.state}
                               label={'Domicile State'}
                               value={form?.state}
                               handleChange={value => {
                                   changeTextData(value, 'state')
                               }}>
                               {Constants.STATES.map(state => {
                                   return (<MenuItem value={state} key={state}>{state}</MenuItem>)
                               })}
                           </CustomSelectField>
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomDatePicker
                               clearable
                               label={'Candidate Applied Date'}
                               maxDate={new Date()}
                               onChange={(date) => { changeTextData(date, 'applied_date'); }}
                               value={form?.applied_date}
                               isError={errorData?.applied_date}
                           />
                       </div>
                       <div className={'formGroup'}>
                           <CustomAutoComplete
                               autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                               dataset={employees}
                               datasetKey={'label'}
                               onTextChange={(text, value) => { changeTextData(text, 'referred_by') }}
                               variant={'outlined'}
                               label={'Referred By'}
                               name={'referred_by'}
                               isError={errorData?.referred_by}
                               value={form?.referred_by}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'}>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.permanent_address}
                               errorText={errorData?.permanent_address}
                               label={'Permanent Address'}
                               value={form?.permanent_address}
                               onTextChange={text => {
                                   changeTextData(text, 'permanent_address');
                               }}
                               onBlur={() => {
                                   onBlurHandler('permanent_address');
                               }}
                           />
                           <div className={styles.checkBox}><input type="checkbox" name={'isSame'} value={'isSame'} onClick={() => {
                               changeTextData(!form?.is_address_same, 'is_address_same');
                           }} id="vehicle1" checked={form?.is_address_same}/> <label
                               htmlFor="vehicle1"> Same Correspondence Address</label><br/></div>
                       </div>
                       <div className={'formGroup'}>
                           <CustomTextField
                               isError={errorData?.correspondence_address}
                               errorText={errorData?.correspondence_address}
                               label={'Correspondence Address'}
                               value={form?.correspondence_address}
                               onTextChange={text => {
                                   changeTextData(text, 'correspondence_address');
                               }}
                               onBlur={() => {
                                   onBlurHandler('correspondence_address');
                               }}
                           />
                       </div>
                   </div>

                   <div className={'formFlex'} style={{alignItems: 'center'}}>
                       <div className={'formGroup'}>
                       <File
                           max_size={4 * 1024 * 1024}
                           type={['pdf', 'jpeg', 'doc', 'docx', 'jpg', 'png']}
                           fullWidth={true}
                           name="image"
                           label=""
                           accept={'application/pdf,application/msword,image/*'}
                           default_image={form?.imageUrl ? form?.imageUrl : null}
                           // user_image={form?.image}
                           error={errorData?.resume}
                           // title={'image'}
                           value={form?.resume}
                           // handleChange={this._handleFileChange}
                           placeholder={'Resume'}
                           onChange={(file) => {
                               if (file) {
                                   changeTextData(file, 'resume');
                               }
                           }}
                       />
                       </div>
                       <div className={'formGroup'}>
                           <CustomTextField
                               type={'number'}
                               isError={errorData?.previous_ctc}
                               errorText={errorData?.previous_ctc}
                               label={'Previous Annual CTC'}
                               value={form?.previous_ctc}
                               onTextChange={text => {
                                   changeTextData(text, 'previous_ctc');
                               }}
                               onBlur={() => {
                                   onBlurHandler('previous_ctc');
                               }}
                           />
                       </div>
                   </div>
               </div>


               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Official Information</div>
                       </h4>
                   </div>
                   <OfficialInfo isStatic={selectedJobId} details={jobDetails} />
               </div>

               <div className={'plainPaper'}>
                   <div className={'headerFlex'}>
                       <h4 className={'infoTitle'}>
                           <div className={'heading'}>Qualification Information</div>
                       </h4>
                   </div>
                   <IncludeForm
                       ref={qualificationRef}
                   />
               </div>


                   <div className={'plainPaper'}>
                       <div className={'headerFlex'}>
                           <h4 className={'infoTitle'}>
                               <div className={'heading'}>Employement History</div>
                           </h4>
                           <div style={{width:'250px'}}>
                               <CustomToggle value={!form?.is_fresher}
                                             handleChange={() => {
                                                 changeTextData(!form?.is_fresher, 'is_fresher')
                                             }}
                                             leftLabel={'Fresher'} rightLabel={'Experienced'}/>
                           </div>
                       </div>
                       {!form.is_fresher ? <EmployementForm ref={historyRef}/> : ''}
                   </div>


               <div className={styles.btnCont}>
                   <ButtonBase  className={styles.saveBtn} style={{marginRight:'30px'}}>
                       Save & Align Interview
                   </ButtonBase>
                   <ButtonBase  disabled={isSubmitting} type={'button'} onClick={handleSubmit}
                               className={styles.createBtn}>
                       Save Profile
                   </ButtonBase>
               </div>
           </div>
        )
};



export default CandidateCreateView;
