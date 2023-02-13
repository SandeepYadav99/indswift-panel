import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';
import {ButtonBase} from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IncludeForm from "./components/department/Includes.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import QuickHeadDialog from "./components/Head/HeadDialog.view";
import useLocationDetail from "./LocationDetailHook";

const LocationDetail = () => {
    const { isSubmitting, data, isHeadDialog, isDetails, toggleHeadDialog, setIsDetails, isActive,
        handleSwitchChange, employees, id, handleHeadUpdate, departments, handleDepartmentUpdate, includeRef, handleUpdateClick, handleEditBtn } = useLocationDetail({});



    const _renderInfo = useCallback(() => {
        if(!data?.head_id){
            return (
                <div className={styles.key}>
                    <span className={styles.value}>Location Head Details:</span>
                    <ButtonBase className={styles.addBtn} onClick={toggleHeadDialog}>+ Add Head</ButtonBase>
                </div>
            )
        } else {
            return (
                <div className={styles.left}>
                    <div className={styles.key}>
                        <span className={styles.value}>Location Head Details:</span>
                        <ButtonBase className={styles.addBtn} onClick={toggleHeadDialog}> Change Head</ButtonBase>
                    </div>

                   <div className={styles.detailFlex}>
                       <div>
                           <img src={require('../../../assets/img/performance image@2x.png')} height={50}/>
                       </div>
                      <div className={styles.info}>
                          <div className={styles.key}><span className={styles.value}>Employee Name:</span> {data?.head?.name}</div>
                          <div className={styles.key}><span className={styles.value}>Employee Code:</span>{data?.head?.code}</div>
                          <div className={styles.key}><span className={styles.value}>Phone:</span>{data?.head?.contact}</div>
                          <div className={styles.key}><span className={styles.value}>Email:</span>{data?.head?.email}</div>
                      </div>
                   </div>
                </div>
            )
        }
    },[isDetails,setIsDetails, data])

    return (
        <div>

            <div className={styles.outerFlex}>
                <div>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'}/> <span className={'capitalize'}><b>{data?.name} Location</b></span>
                    </ButtonBase>
                    <div className={styles.newLine}/>
                </div>
            </div>

            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.editFlex}>
                        <div className={styles.heading}>Location Information</div>

                        <div className={styles.editBtn}>
                            <ButtonBase onClick={handleEditBtn} className={styles.edit}>EDIT</ButtonBase>
                        </div>
                    </div>


                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Location:</span>{data?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Location Code:</span>{data?.code}</div>
                            <div className={styles.key}><span className={styles.value}>Address:</span>{data?.address}</div>
                            <div className={styles.key}><span className={styles.value}>City:</span>{data?.city}</div>
                            <div className={styles.key}><span className={styles.value}>State:</span>{data?.state}</div>
                            <div className={styles.key}><span className={styles.value}>Pincode:</span>{data?.pincode}</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            {_renderInfo()}
                        </div>
                    </div>

                    <div className={styles.statusFlex}>
                        <div className={'formFlex'} style={{alignItems:'center'}}>
                            <div className={'formGroup'} >
                                Status:
                            </div>
                            <div className={'formGroup'}>
                                <CustomSwitch
                                    value={isActive}
                                    handleChange={handleSwitchChange}
                                    label={`Active`}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.plainPaper}>
                <IncludeForm
                    locationId={id}
                    employees={employees}
                    departments={departments}
                    ref={includeRef}
                    handleUpdate={handleDepartmentUpdate}
                />
            </div>

            <div className={styles.btnCont}>
                <ButtonBase onClick={handleUpdateClick}  type={'button'} className={styles.createBtn}>UPDATE INFORMATION</ButtonBase>
            </div>

            <QuickHeadDialog handleUpdate={handleHeadUpdate} locationId={id} employees={employees} isOpen={isHeadDialog} handleToggle={toggleHeadDialog} showDetails={setIsDetails}/>
        </div>
    )
}

export default LocationDetail
